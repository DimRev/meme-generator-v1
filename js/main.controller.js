window.onload = onInit

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

function onInit() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
  
  window.addEventListener('resize', refreshCanvas)
}

function refreshCanvas() {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
}


