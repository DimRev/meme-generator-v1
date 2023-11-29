'use strict'

const glines = [
  {
    text: 'Place holder Text 1',
    color: 'White',
    fontSize: 60,
    fontFamily: 'Impact',
    pos: { x: 0, y: -200 },
  },
  {
    text: 'Place holder Text 2',
    color: 'White',
    fontSize: 60,
    fontFamily: 'Impact',
    pos: { x: 0, y: 200 },
  },
]
let gSelectedMeme = null
let gSeletedLineIdx = 0

function getSelectedMeme() {
  return gSelectedMeme
}

function setSelectedMeme(selectedMeme) {
  gSelectedMeme = selectedMeme
}

function selectNextLine() {
  gSeletedLineIdx++
  if (gSeletedLineIdx >= glines.length) {
    gSeletedLineIdx = 0
  }
}

function getLine() {
  return glines[gSeletedLineIdx]
}

function getAllLines() {
  return glines
}

function setLine(text, color, fontSize, pos) {
  glines[gSeletedLineIdx].text = text || glines[gSeletedLineIdx].text
  glines[gSeletedLineIdx].color = color || glines[gSeletedLineIdx].color
  glines[gSeletedLineIdx].fontSize = fontSize || glines[gSeletedLineIdx].fontSize
  glines[gSeletedLineIdx].pos = pos || glines[gSeletedLineIdx].pos
}
