let gMyMemes
let gCurrentImgURL
const MY_MEMES = 'MyMemesDB'

_loadMemesFromStorage()

function addMeme(selectedMeme, lines) {
  _getMemeImgURL()
  setTimeout(() => {
    const newMeme = {
      id: getRandomId(),
      selectedMeme,
      lines,
      imgURL: gCurrentImgURL,
    }
    gMyMemes.push(newMeme)
    _saveMemesToStorage()
  }, 300);
}

function deleteMyMeme(id) {
  const memeIdx = gMyMemes.findIndex((meme) => meme.id === id)
  gMyMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
}

function getMyMeme(id) {
  return gMyMemes.find((meme) => meme.id === id)
}

function getAllMemes() {
  return gMyMemes
}

function _loadMemesFromStorage() {
  gMyMemes = loadFromStorage(MY_MEMES)
  if (!gMyMemes) gMyMemes = []
}

function _saveMemesToStorage() {
  saveToStorage(MY_MEMES, gMyMemes)
}

function _getMemeImgURL() {
  drawOnCanvas(true)
  setTimeout(() => {
    gCurrentImgURL = gCanvas.toDataURL('image/jpeg') // image/jpeg is the default format
    drawOnCanvas()
  }, 30)
}
