'use strict'

const gLines = [
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
  if (gSeletedLineIdx >= gLines.length) {
    gSeletedLineIdx = 0
  }
}

function getLine() {
  return gLines[gSeletedLineIdx]
}

function getAllLines() {
  return gLines
}

function setLine(text, color, fontSize, pos) {
  gLines[gSeletedLineIdx].text = text || gLines[gSeletedLineIdx].text
  gLines[gSeletedLineIdx].color = color || gLines[gSeletedLineIdx].color
  gLines[gSeletedLineIdx].fontSize = fontSize || gLines[gSeletedLineIdx].fontSize
  gLines[gSeletedLineIdx].pos = pos || gLines[gSeletedLineIdx].pos
}

function addLine() {
  gLines.push({
    text: 'Place holder Text',
    color: 'White',
    fontSize: 60,
    fontFamily: 'Impact',
    pos: { x: 0, y: 0 },
  })
  gSeletedLineIdx = gLines.length - 1
}

function removeLine() {
  gLines.splice(gSeletedLineIdx, 1)
  gSeletedLineIdx++
  if (gSeletedLineIdx >= gLines.length) {
    gSeletedLineIdx = 0
  } 
}