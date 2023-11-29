'use strict'

/*
  //* --------------- Random operations ---------------
*/

//Returns color #ffffff - of random color
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

//Returns int - in range
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

//Returns int - in range
function getRandomIntegerInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Returns a length digit string of random letters and numbers
function getRandomId(length = 6) {
  var id = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    id += possible.charAt(getRandomInteger(0, possible.length))
  }
  return id
}

//Returns a string with wordCount words
function getLorem(wordCount = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    'All',
    'this happened',
    'more or less',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''

  while (wordCount-- > 0) {
    txt += words[getRandomInteger(0, words.length)] + ' '
  }
  return txt
}

/*
  //*  --------------- Matrix Operatioions ---------------
*/

//Returns empty matrix Mrxc
function getMat(rows, cols) {
  const mat = []
  for (var i = 0; i < rows; i++) {
    const row = []
    for (var j = 0; j < cols; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

//Returns int - of neighbor cells count that contain the value
function getNeighborsCount(
  idxI,
  idxJ,
  mat,
  iRange = 1,
  jRange = 1,
  value = ''
) {
  var count = 0
  for (let i = idxI - iRange; i <= idxI + iRange; i++) {
    if (i < 0 || i >= mat.length) continue
    for (let j = idxJ - jRange; j <= idxJ + jRange; j++) {
      if (j < 0 || j >= mat.length) continue
      if (idxI === i && idxJ === j) continue
      if (mat[i][j] === value) count++
    }
  }
  return count
}

//Returns object {i,j} of random location of value
function findRandomCellWithValue(mat, value = '') {
  var emptyCells = []
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === value) {
        emptyCells.push({
          i,
          j,
        })
      }
    }
  }
  if (emptyCells.length === 0) return null
  return emptyCells.splice(getRandomInteger(0, emptyCells.length), 1)[0]
}

/*
  //* --------------- Date Operations --------------- 
*/

//Returns string "Last Sync: DD/MM/YY @ HH:MM:SS" of current time
function getCurrentTimeStr() {
  var currentdate = new Date()
  var datetimeStr =
    'Last Sync: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    String(currentdate.getHours()).padStart(2, '0') +
    ':' +
    String(currentdate.getMinutes()).padStart(2, '0') +
    ':' +
    String(currentdate.getSeconds()).padStart(2, '0')

  return datetimeStr
}

//Returns int of current time stamp
function getCurrentTS() {
  return new Date().getTime()
}

//Returns string "Last Sync: DD/MM/YY @ HH:MM:SS" of current Time Stamp
function getTimeStrFromTS(ts) {
  var currentdate = new Date(ts)
  var datetimeStr =
    'Last Sync: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    String(currentdate.getHours()).padStart(2, '0') +
    ':' +
    String(currentdate.getMinutes()).padStart(2, '0') +
    ':' +
    String(currentdate.getSeconds()).padStart(2, '0')

  return datetimeStr
}
