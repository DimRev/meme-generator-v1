'use strict'

window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

function onInit() {
  renderGallery()
  onSelectSection(null)
  generalEventListeners()
  lineControlsEventListeners()
  fontControlsEventListeners()
  storageControlsEventListeners()

  window.addEventListener('resize', refreshCanvas)
}

function generalEventListeners() {
  const elGalleryMemes = document.querySelectorAll('.gallery-meme')
  const elSectionNavs = document.querySelectorAll('.section-nav')

  elGalleryMemes.forEach((elGalleryMeme) => {
    elGalleryMeme.addEventListener('click', function () {
      onSelectGalleryMeme(this)
      renderLineText()
      refreshCanvas()
    })
  })

  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.addEventListener('click', function () {
      onSelectSection(this)
    })
  })
}

function lineControlsEventListeners() {
  console.log('test')
  const elLineTextInput = document.querySelector('.line-text')
  const elSwitchLineBtn = document.querySelector('.switch-line-btn')
  const elMoveUpBtn = document.querySelector('.move-up-btn')
  const elMoveDownBtn = document.querySelector('.move-down-btn')
  const elAddLineBtn = document.querySelector('.add-line-btn')
  const elDeleteLineBtn = document.querySelector('.delete-line-btn')

  elLineTextInput.addEventListener('input', function () {
    onLineText()
  })

  elSwitchLineBtn.addEventListener('click', function () {
    selectNextLine()
    renderLineText()
    refreshCanvas()
  })

  elMoveUpBtn.addEventListener('click', function () {
    onLineMove('up')
    refreshCanvas()
  })

  elMoveDownBtn.addEventListener('click', function () {
    onLineMove('down')
    refreshCanvas()
  })

  elAddLineBtn.addEventListener('click', function () {
    addLine()
    renderLineText()
    refreshCanvas()
  })

  elDeleteLineBtn.addEventListener('click', function () {
    removeLine()
    renderLineText()
    refreshCanvas()
  })
}

function fontControlsEventListeners() {
  const elRiseFontSizeBtn = document.querySelector('.rise-font-size-btn')
  const elLowerFontSizeBtn = document.querySelector('.lower-font-size-btn')
  const elLinePosLeftBtn = document.querySelector('.line-pos-left-btn')
  const elLinePosCenterBtn = document.querySelector('.line-pos-center-btn')
  const elLinePosRightBtn = document.querySelector('.line-pos-right-btn')
  const elFontFamilySelector = document.querySelector('.font-family-selector')
  const elFontColor = document.querySelector('.font-color')
  const elStrokeColor = document.querySelector('.stroke-color')

  elRiseFontSizeBtn.addEventListener('click', function () {
    onFontSize('rise')
    refreshCanvas()
  })

  elLowerFontSizeBtn.addEventListener('click', function () {
    onFontSize('lower')
    refreshCanvas()
  })

  elLinePosLeftBtn.addEventListener('click', function () {
    onLinePos('left')
    refreshCanvas()
  })

  elLinePosCenterBtn.addEventListener('click', function () {
    onLinePos('center')
    refreshCanvas()
  })

  elLinePosRightBtn.addEventListener('click', function () {
    onLinePos('right')
    refreshCanvas()
  })

  elFontFamilySelector.addEventListener('change', function () {
    onFontFamily(elFontFamilySelector.value)
    refreshCanvas()
  })

  elFontColor.addEventListener('change', function () {
    onFontColor(elFontColor.value)
    refreshCanvas()
  })
  elStrokeColor.addEventListener('change', function () {
    onStrokeColor(elStrokeColor.value)
    refreshCanvas()
  })
}

function storageControlsEventListeners() {
  const elSaveMemeBtn = document.querySelector('.save-meme-btn')
  const elDownloadMemeBtn = document.querySelector('.download-meme-btn')
  const elShareMemeBtn = document.querySelector('.share-meme-btn')

  elSaveMemeBtn.addEventListener('click', function () {
    onSaveMeme()
  })

  elDownloadMemeBtn.addEventListener('click', function () {
    onDownloadMeme()
  })

  elShareMemeBtn.addEventListener('click', function () {
    onShareMeme()
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

function renderMyMemes(){

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

function onSelectGalleryMeme(elGalleryMeme) {
  let selectedMeme = getMemeImageById(+elGalleryMeme.dataset.id)
  setSelectedMeme(selectedMeme)

  const elGallerySection = document.querySelector('.gallery-section')
  elGallerySection.classList.add('hidden')

  const elMemeEditorSection = document.querySelector('.meme-editor-section')
  elMemeEditorSection.classList.remove('hidden')

  refreshCanvas()
}

function onSelectSection(elSectionNav) {
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

    // Center the image inside the canvas
    const imgWidth = img.width * scaleFactor
    const imgHeight = img.height * scaleFactor
    const imgX = (gCanvas.width - imgWidth) / 2
    const imgY = (gCanvas.height - imgHeight) / 2

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight)

    let lines = getAllLines()
    lines.forEach((line) => {
      // Scale the font size in relation to the image size
      const scaledFontSize = line.fontSize * scaleFactor

      gCtx.font = `${scaledFontSize}px ${line.fontFamily}`
      gCtx.fillStyle = `${line.color}`
      gCtx.lineWidth = 2
      gCtx.strokeStyle = `${line.strokeColor}`
      gCtx.textAlign = `${line.textAlign}`

      // Adjust text position in relation to the centered image
      const textX = gCanvas.width / 2 + line.pos.x
      const textY = gCanvas.height / 2 + line.pos.y + scaledFontSize / 2

      gCtx.fillText(line.text, textX, textY)
      gCtx.strokeText(line.text, textX, textY)
    })
  }
}

function onLineText() {
  const elLineTextInput = document.querySelector('.line-text')
  let lineText = elLineTextInput.value
  console.log(lineText)
  if (!lineText) lineText = ' '
  setLine(lineText)
  refreshCanvas()
}

function onLineMove(direction) {
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

function onFontSize(direction) {
  let fontSize = getLine().fontSize
  switch (direction) {
    case 'rise':
      fontSize += 1
      break
    case 'lower':
      fontSize -= 1
      break
  }
  setLine(getLine().text, getLine().color, fontSize)
}

function onLinePos(direction) {
  switch (direction) {
    case 'left':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'left'
      )
      break
    case 'center':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'center'
      )
      break
    case 'right':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'right'
      )
      break
  }
}

function onFontColor() {
  const elFontColor = document.querySelector('.font-color')
  setLine(getLine().text, elFontColor.value)
}

function onStrokeColor() {
  const elStrokeColor = document.querySelector('.stroke-color')
  setLine(
    getLine().text,
    getLine().color,
    getLine().fontSize,
    getLine().pos,
    getLine().textAlign,
    getLine().fontFamily,
    elStrokeColor.value
  )
}

function onFontFamily() {
  const elFontFamily = document.querySelector('.font-family-selector')
  setLine(
    getLine().text,
    getLine().color,
    getLine().fontSize,
    getLine().pos,
    getLine().textAlign,
    elFontFamily.value
  )
}

function onSaveMeme() {
  const selectedMeme = getSelectedMeme()
  const lines = getAllLines()
  addMeme(selectedMeme, lines)
}