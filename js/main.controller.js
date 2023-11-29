window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

let gSelectedImg = null

function onInit() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
  
  renderGallery()

  window.addEventListener('resize', refreshCanvas)
}

function generalEventListeners() {
 
}

function refreshCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
}

function renderGallery(){
  const memeImages = getMemeImages()
  let memeImagesHTML = memeImages.map(memeImage=>{return `
  <img src="${memeImage.url}" alt="${memeImage.keywords.join(', ')}" class="gallery-meme" data-id="${memeImage.id}" ${memeImage.keywords.map(keyword => `data-keyword="${keyword}" onclick="selectGalleryMeme(this)"`)}>
  `}).join('')

  const elGallery = document.querySelector('.gallery-section')
  elGallery.innerHTML = memeImagesHTML
}

function selectGalleryMeme(elGalleryMeme) {
  console.log(elGalleryMeme);
  gSelectedImg = getMemeImageById(+elGalleryMeme.dataset.id)
}