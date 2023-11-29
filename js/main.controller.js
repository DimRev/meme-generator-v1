'use strict'

window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

function onInit() {
  renderGallery()
  selectSection(null)
  generalEventListeners()
  lineControlsEventListeners()

  window.addEventListener('resize', refreshCanvas)
}

function generalEventListeners() {
  const elGalleryMemes = document.querySelectorAll('.gallery-meme')
  elGalleryMemes.forEach((elGalleryMeme) => {
    elGalleryMeme.addEventListener('click', function () {
      selectGalleryMeme(this)
      renderLineText()
      refreshCanvas()
    })
  })

  const elSectionNavs = document.querySelectorAll('.section-nav')
  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.addEventListener('click', function () {
      selectSection(this)
    })
  })
}

function lineControlsEventListeners() {
  console.log('test')
  const elLineTextInput = document.querySelector('.line-text')
  elLineTextInput.addEventListener('input', function () {
    handleLineText()
  })

  const elSwitchLineBtn = document.querySelector('.switch-line-btn')
  elSwitchLineBtn.addEventListener('click', function () {
    selectNextLine()
    renderLineText()
    refreshCanvas()
  })

  const elMoveUpBtn = document.querySelector('.move-up-btn')
  elMoveUpBtn.addEventListener('click', function () {
    handleLineMove('up')
    refreshCanvas()
  })

  const elMoveDownBtn = document.querySelector('.move-down-btn')
  elMoveDownBtn.addEventListener('click', function () {
    handleLineMove('down')
    refreshCanvas()
  })

  const elAddLineBtn = document.querySelector('.add-line-btn')
  elAddLineBtn.addEventListener('click', function () {
    addLine()
    renderLineText()
    refreshCanvas()
  })

  const elDeleteLineBtn = document.querySelector('.delete-line-btn')
  elDeleteLineBtn.addEventListener('click', function () {
    removeLine()
    renderLineText()
    refreshCanvas()
  })
}

function refreshCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight

  const selectedMeme = getSelectedMeme()
  if (!selectedMeme) return

  drawOnCanvas()
}

function renderGallery() {
  const memeImages = getMemeImages()
  let memeImagesHTML = memeImages
    .map((memeImage) => {
      return `
  <img src="${memeImage.url}" alt="${memeImage.keywords.join(
        ', '
      )}" class="gallery-meme" data-id="${
        memeImage.id
      }" ${memeImage.keywords.map((keyword) => `data-keyword="${keyword}"`)}
      >`
    })
    .join('')

  const elGallery = document.querySelector('.gallery-section')
  elGallery.innerHTML = memeImagesHTML
}

function renderLineText() {
  const selectedMeme = getSelectedMeme()
  if (!selectedMeme) return
  const line = getLine()

  const elLineTextInput = document.querySelector('.line-text')
  if (!line) {
    elLineTextInput.value = 'place holder text'
  } else {
    elLineTextInput.value = line.text
  }
}

function selectGalleryMeme(elGalleryMeme) {
  let selectedMeme = getMemeImageById(+elGalleryMeme.dataset.id)
  setSelectedMeme(selectedMeme)

  const elGallerySection = document.querySelector('.gallery-section')
  elGallerySection.classList.add('hidden')

  const elMemeEditorSection = document.querySelector('.meme-editor-section')
  elMemeEditorSection.classList.remove('hidden')

  refreshCanvas()
}

function selectSection(elSectionNav) {
  let selectedSection
  if (elSectionNav) selectedSection = elSectionNav.dataset.section
  else selectedSection = 'gallery'

  const elSections = document.querySelectorAll('section')
  elSections.forEach((elSection) => {
    elSection.classList.add('hidden')
  })

  switch (selectedSection) {
    case 'gallery':
      const elGallerySection = document.querySelector('.gallery-section')
      elGallerySection.classList.remove('hidden')
      break
    case 'meme':
      const elMemeSection = document.querySelector('.meme-section')
      elMemeSection.classList.remove('hidden')
      break
    case 'about':
      const elAboutSection = document.querySelector('.about-section')
      elAboutSection.classList.remove('hidden')
      break
  }
}

function drawOnCanvas() {
  const selectedMeme = getSelectedMeme()
  if (!selectedMeme) return

  const img = new Image()

  img.src = selectedMeme.url

  img.onload = function () {
    const scaleFactor = Math.min(
      gCanvas.width / img.width,
      gCanvas.height / img.height
    )
    img.width *= scaleFactor
    img.height *= scaleFactor

    gCanvas.width = img.width
    gCanvas.height = img.height

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    let lines = getAllLines()
    lines.forEach((line) => {
      gCtx.font = `${line.fontSize}px ${line.fontFamily}` // Set the font size and type
      gCtx.fillStyle = `${line.color}` // Set the text color
      gCtx.lineWidth = 2 // Set the stroke width
      gCtx.strokeStyle = `Black` // Set the stroke color
      gCtx.textAlign = `center` // Align text to the center

      const textX = gCanvas.width / 2 + line.pos.x
      const textY = gCanvas.height / 2 + line.pos.y + line.fontSize / 2

      gCtx.fillText(line.text, textX, textY)
      gCtx.strokeText(line.text, textX, textY)
    })
  }
}

function handleLineText() {
  const elLineTextInput = document.querySelector('.line-text')
  let lineText = elLineTextInput.value
  console.log(lineText)
  if (!lineText) lineText = ' '
  setLine(lineText)
  refreshCanvas()
}

function handleLineMove(direction) {
  switch (direction) {
    case 'up':
      setLine(getLine().text, getLine().color, getLine().fontSize, {
        x: 0,
        y: getLine().pos.y - 10,
      })
      break
    case 'down':
      setLine(getLine().text, getLine().color, getLine().fontSize, {
        x: 0,
        y: getLine().pos.y + 10,
      })
      break
  }
}
