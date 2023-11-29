window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

function onInit() {
  renderGallery()
  generalEventListeners()

  window.addEventListener('resize', refreshCanvas)
}

function generalEventListeners() {
  const elGalleryMemes = document.querySelectorAll('.gallery-meme')
  elGalleryMemes.forEach((elGalleryMeme) => {
    elGalleryMeme.addEventListener('click', function () {
      selectGalleryMeme(this)
    })
  })

  const elSectionNavs = document.querySelectorAll('.section-nav')
  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.addEventListener('click', function () {
      selectSection(this)
    })
  })
}

function refreshCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight

  selectedMeme = getSelectedMeme()
  if (!selectedMeme) return
  renderImg()
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

function selectGalleryMeme(elGalleryMeme) {
  let selectedMeme = getMemeImageById(+elGalleryMeme.dataset.id)
  setSelectedMeme(selectedMeme)

  const elGallerySection = document.querySelector('.gallery-section')
  elGallerySection.classList.add('hidden')

  const elMemeEditorSection = document.querySelector('.meme-editor-section')
  elMemeEditorSection.classList.remove('hidden')

  refreshCanvas()
}

function renderImg() {
  selectedMeme = getSelectedMeme()
  if (!selectedMeme) return

  const img = new Image()

  // Set the image source to the selectedMeme.url
  img.src = selectedMeme.url

  // Wait for the image to load before rendering it on the canvas
  img.onload = function () {
    // Calculate the scaling factor to fit the image into the canvas
    const scaleFactor = Math.min(
      gCanvas.width / img.width,
      gCanvas.height / img.height
    )

    // Calculate the centered position
    const centerX = (gCanvas.width - img.width * scaleFactor) / 2
    const centerY = (gCanvas.height - img.height * scaleFactor) / 2

    // Clear the canvas
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

    // Draw the resized and centered image onto the canvas
    gCtx.drawImage(
      img,
      centerX,
      centerY,
      img.width * scaleFactor,
      img.height * scaleFactor
    )
  }
}

function selectSection(elSectionNav) {
  const selectedSection = elSectionNav.dataset.section || 'gallery'
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
