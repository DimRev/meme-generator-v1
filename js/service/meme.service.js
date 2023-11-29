let gMyMemes
const MY_MEMES = 'MyMemesDB'

_loadMemesFromStorage()


function _loadMemesFromStorage() {
  gMyMemes = loadFromStorage(MY_MEMES)
  if(!gMyMemes) gMyMemes = []
}

function _saveMemesToStorage() {
  saveToStorage(MY_MEMES, gMyMemes)
}

function addMeme(selectedMeme, lines){

  const newMeme = {
    selectedMeme,
    lines,
  }
  gMyMemes.push(newMeme)
  _saveMemesToStorage()
}

function deleteMeme(id) {

}

function getMeme(id) {

}

function getAllMemes() {

}