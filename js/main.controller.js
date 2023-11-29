window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

function onInit() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
  
  renderGallery()

  window.addEventListener('resize', refreshCanvas)
}

function refreshCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
}

function renderGallery(){
  const memeImages = getMemeImages()
  console.log(memeImages);
  let memeImagesHTML = memeImages.map(memeImage=>{return `
  <img src="${memeImage.url}" alt="${memeImage.keywords.join(', ')}" data-id="${memeImage.id}" ${memeImage.keywords.map(keyword => `data-keyword="${keyword}"`)}>
  `}).join('')
  console.log(memeImagesHTML);
  
  const elGallery = document.querySelector('.gallery-section')
  elGallery.innerHTML = memeImagesHTML
}
