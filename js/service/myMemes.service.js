let gMyMemes
const MY_MEMES = 'MyMemesDB'

_loadMemesFromStorage()

function addMeme(selectedMeme, lines) {
  const newMeme = {
    id: getRandomId(),
    selectedMeme,
    lines,
  }
  gMyMemes.push(newMeme)
  _saveMemesToStorage()
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