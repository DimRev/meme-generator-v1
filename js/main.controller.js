'use strict'

window.onload = onInit

let isDragging = false
let dragStartX, dragStartY
let gIntervalId
let gScaleFactor

const gCanvas = document.querySelector('.meme-editor-canvas')
const gCtx = gCanvas.getContext('2d')

//* WINDOW EVENT LISTENERS //

window.addEventListener('resize', refreshCanvas)

window.addEventListener('mouseup', function () {
  clearInterval(gIntervalId)
})
window.addEventListener('touchend', function () {
  clearInterval(gIntervalId)
})

//* GLOBAL CANVAS EVENT LISTENERS //

gCanvas.addEventListener('mousedown', onMouseDownCanvas)
gCanvas.addEventListener('mousemove', onMouseMoveCanvas)
gCanvas.addEventListener('mouseup', onMouseUpCanvas)

gCanvas.addEventListener('touchstart', onTouchStartCanvas)
gCanvas.addEventListener('touchmove', onTouchMoveCanvas)
gCanvas.addEventListener('touchend', onTouchEndCanvas)

function onInit() {
  renderGallery()
  renderMyMemes()
  renderMemeFiltersOpts(5)

  resizeFilterListItems()

  refreshCanvas()
  onSelectSection()

  generalEventListeners()
  lineControlsEventListeners()
  fontControlsEventListeners()
  stickerControlsEventListeners()
  storageControlsEventListeners()
}

//* EVENT LISTENER ACTIVATIONS //

function generalEventListeners() {
  const elSectionNavs = document.querySelectorAll('.section-nav')
  const elMoreFiltersBtn = document.querySelector('.more-filters-btn')
  const elHamburgerMenu = document.querySelector('.hamburger-menu')

  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.addEventListener('click', function () {
      onSelectSection(this)
    })
  })

  elMoreFiltersBtn.addEventListener('click', function () {
    const elMemeFilter = document.querySelector('.meme-filter')

    if (elMemeFilter.classList.contains('active')) renderMemeFiltersOpts(5)
    else renderMemeFiltersOpts()

    resizeFilterListItems()

    elMemeFilter.classList.toggle('active')
  })

  elHamburgerMenu.addEventListener('click', function () {
    const elMainNav = document.querySelector('.main-nav')

    elMainNav.classList.toggle('active')
  })
}

function lineControlsEventListeners() {
  const elLineTextInput = document.querySelector('.line-text')
  const elSwitchLineBtn = document.querySelector('.switch-line-btn')
  const elMoveUpBtn = document.querySelector('.move-up-btn')
  const elMoveDownBtn = document.querySelector('.move-down-btn')
  const elAddLineBtn = document.querySelector('.add-line-btn')
  const elDeleteLineBtn = document.querySelector('.delete-line-btn')

  elLineTextInput.addEventListener('input', function () {
    onLineText()
  })

  elSwitchLineBtn.addEventListener('click', function () {
    selectNextLine()
    renderMemeEditorControlVals()
    refreshCanvas()
  })

  elMoveUpBtn.addEventListener('mousedown', function () {
    gIntervalId = setInterval(function () {
      onLineMove('up')
      refreshCanvas()
    }, 10)
  })

  elMoveUpBtn.addEventListener('touchstart', function () {
    gIntervalId = setInterval(function () {
      onLineMove('up')
      refreshCanvas()
    }, 10)
  })

  elMoveDownBtn.addEventListener('mousedown', function () {
    gIntervalId = setInterval(function () {
      onLineMove('down')
      refreshCanvas()
    }, 10)
  })

  elMoveDownBtn.addEventListener('touchstart', function () {
    gIntervalId = setInterval(function () {
      onLineMove('down')
      refreshCanvas()
    }, 10)
  })

  elAddLineBtn.addEventListener('click', function () {
    addLine()
    renderMemeEditorControlVals()
    refreshCanvas()
  })

  elDeleteLineBtn.addEventListener('click', function () {
    removeLine()
    renderMemeEditorControlVals()
    refreshCanvas()
  })
}

function fontControlsEventListeners() {
  const elRiseFontSizeBtn = document.querySelector('.rise-font-size-btn')
  const elLowerFontSizeBtn = document.querySelector('.lower-font-size-btn')
  const elLinePosLeftBtn = document.querySelector('.line-pos-left-btn')
  const elLinePosCenterBtn = document.querySelector('.line-pos-center-btn')
  const elLinePosRightBtn = document.querySelector('.line-pos-right-btn')
  const elFontFamilySelector = document.querySelector('.font-family-selector')
  const elFontColor = document.querySelector('.font-color')
  const elStrokeColor = document.querySelector('.stroke-color')

  elRiseFontSizeBtn.addEventListener('mousedown', function () {
    gIntervalId = setInterval(function () {
      onFontSize('rise')
      refreshCanvas()
    }, 10)
  })

  elLowerFontSizeBtn.addEventListener('mousedown', function () {
    gIntervalId = setInterval(function () {
      onFontSize('lower')
      refreshCanvas()
    }, 10)
  })

  elRiseFontSizeBtn.addEventListener('touchstart', function () {
    gIntervalId = setInterval(function () {
      onFontSize('rise')
      refreshCanvas()
    }, 10)
  })

  elLowerFontSizeBtn.addEventListener('touchstart', function () {
    gIntervalId = setInterval(function () {
      onFontSize('lower')
      refreshCanvas()
    }, 10)
  })

  elLinePosLeftBtn.addEventListener('click', function () {
    onLinePos('left')
    refreshCanvas()
  })

  elLinePosCenterBtn.addEventListener('click', function () {
    onLinePos('center')
    refreshCanvas()
  })

  elLinePosRightBtn.addEventListener('click', function () {
    onLinePos('right')
    refreshCanvas()
  })

  elFontFamilySelector.addEventListener('input', function () {
    onFontFamily(elFontFamilySelector.value)
    refreshCanvas()
  })

  elFontColor.addEventListener('input', function () {
    onFontColor(elFontColor.value)
    refreshCanvas()
  })

  elStrokeColor.addEventListener('change', function () {
    onStrokeColor(elStrokeColor.value)
    refreshCanvas()
  })
}

function stickerControlsEventListeners() {
  const elStickerBtns = document.querySelectorAll('.sticker-btn')

  elStickerBtns.forEach((elStickerBtn) => {
    elStickerBtn.addEventListener('click', function () {
      onSelectSticker(this)
    })
  })
}

function storageControlsEventListeners() {
  const elSaveMemeBtn = document.querySelector('.save-meme-btn')
  const elShareMemeBtn = document.querySelector('.share-meme-btn')

  elSaveMemeBtn.addEventListener('click', function () {
    onSaveMeme()
  })

  elShareMemeBtn.addEventListener('click', function () {
    onShareMeme()
  })
}

//* RENDER HANDLERS //

function refreshCanvas() {
  const selectedMeme = getSelectedMeme()

  if (!selectedMeme) {
    const elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas.width = elCanvasContainer.offsetWidth
    gCanvas.height = elCanvasContainer.offsetHeight
    return
  }

  drawOnCanvas()
}

function renderGallery() {
  const memeImages = getMemeImages()

  let memeImagesHTML = memeImages
    .map((memeImage) => {
      return `
  <img src="${memeImage.url}" alt="${memeImage.keywords.join(
        ', '
      )}" class="gallery-section-meme" data-id="${
        memeImage.id
      }" ${memeImage.keywords.map((keyword) => `data-keyword="${keyword}"`)}
      onclick="onGallerySectiomMeme(this)">`
    })
    .join('')

  const elGallery = document.querySelector('.gallery-section')

  elGallery.innerHTML = memeImagesHTML
}

function renderMyMemes() {
  const myMemes = getAllMemes()

  let myMemesHTML = myMemes
    .map((myMeme) => {
      return `
  <div class="meme-section-meme-wrapper">
  <button class="meme-close-btn" onclick="onMemeRemoveBtn('${
    myMeme.id
  }')">X</button>
  <img src="${
    myMeme.selectedMeme.url
  }" alt="${myMeme.selectedMeme.keywords.join(
        ', '
      )}" class="meme-section-meme" data-id="${
        myMeme.id
      }" ${myMeme.selectedMeme.keywords.map(
        (keyword) => `data-keyword="${keyword}"`
      )}
      onclick="onMyMemeClick(this)">
      <p class="meme-text">${myMeme.lines[0].text}</p>
      </div>`
    })
    .join('')
  const elMyMemes = document.querySelector('.meme-section')
  elMyMemes.innerHTML = myMemesHTML
}

function renderMemeEditorControlVals() {
  const selectedMeme = getSelectedMeme()

  if (!selectedMeme) return

  const line = getLine()

  const elLineTextInput = document.querySelector('.line-text')
  const elFontColor = document.querySelector('.font-color')
  const elStrokeColor = document.querySelector('.stroke-color')

  if (!line) {
    elLineTextInput.value = 'place holder text'
    elFontColor.value = '#000000'
    elStrokeColor.value = '#ffffff'
  } else {
    elLineTextInput.value = line.text
    elFontColor.value = line.color
    elStrokeColor.value = line.strokeColor
  }
}

function renderMemeFiltersOpts(count) {
  const sortedFilters = getSortedFilters()
  if (!count) count = sortedFilters.length

  let filtersHTML = sortedFilters
    .map((sortedFilter, idx) => {
      if (idx < count)
        return `
  <li><a class="filter-nav" href="#" data-filter="${sortedFilter}" onclick="onFilterNav(this)">${sortedFilter}</a></li>
  `
    })
    .join('\n')

  const elFilterNavList = document.querySelector('.filter-nav-list')
  elFilterNavList.innerHTML = filtersHTML
}

//* EVENT HANDLERS //

function onSelectSection(elSectionNav) {
  let selectedSection
  if (elSectionNav) selectedSection = elSectionNav.dataset.section
  else selectedSection = 'gallery'

  // const elMainNav = document.querySelector('.main-nav')
  // elMainNav.classList.remove('active')

  const elSectionNavs = document.querySelectorAll('.section-nav')
  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.classList.remove('active')
  })

  if (elSectionNav) elSectionNav.classList.add('active')
  else
    document
      .querySelector('.section-nav[data-section="gallery"]')
      .classList.add('active')

  const elMemeFilter = document.querySelector('.meme-filter')
  elMemeFilter.classList.add('hidden')

  const elSections = document.querySelectorAll('section')
  elSections.forEach((elSection) => {
    elSection.classList.add('hidden')
  })

  switch (selectedSection) {
    case 'gallery':
      const elGallerySection = document.querySelector('.gallery-section')
      elGallerySection.classList.remove('hidden')
      elMemeFilter.classList.remove('hidden')
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

//? Gallery Section Event Handlers //

function onSelectFilterNav(elFilterNav) {
  let filter = elFilterNav.dataset.filter
  setFilterKeyword(filter)
  addKeywordVisits(filter)
  renderGallery()
}

function onFilterNav(elFilterNav) {
  onSelectFilterNav(elFilterNav)
  renderMemeFiltersOpts(5)
  resizeFilterListItems()

  const elMemeFilter = document.querySelector('.meme-filter')
  elMemeFilter.classList.remove('active')
}

function resizeFilterListItems() {
  const elFilterNavs = document.querySelectorAll('.filter-nav')
  elFilterNavs.forEach((elFilterNav) => {
    let filter = elFilterNav.dataset.filter
    let fontSize = 1 + getKeywordVisits(filter) / 50 + 'em'
    elFilterNav.style.fontSize = fontSize
  })
}

function onSelectGalleryMeme(elGalleryMeme) {
  let selectedMeme = getMemeImageById(+elGalleryMeme.dataset.id)
  setSelectedMeme(selectedMeme)

  const elGallerySection = document.querySelector('.gallery-section')
  elGallerySection.classList.add('hidden')

  const elMemeEditorSection = document.querySelector('.meme-editor-section')
  elMemeEditorSection.classList.remove('hidden')

  refreshCanvas()

  const elSectionNavs = document.querySelectorAll('.section-nav')
  elSectionNavs.forEach((elSectionNav) => {
    elSectionNav.classList.remove('active')
  })
}

function onGallerySectiomMeme(elImage) {
  onSelectGalleryMeme(elImage)
  renderMemeEditorControlVals()

  const elMemeFilter = document.querySelector('.meme-filter')
  elMemeFilter.classList.add('hidden')

  for (let i = 0; i < 1000; i++) {
    refreshCanvas()
  }
}

//? Meme Section Event Handlers //

function onMyMemeClick(elMyMeme) {
  console.log(elMyMeme.dataset.id)
  const myMeme = getMyMeme(elMyMeme.dataset.id)

  setSelectedMeme(myMeme.selectedMeme, myMeme.lines)

  const elGallerySection = document.querySelector('.meme-section')
  elGallerySection.classList.add('hidden')

  const elMemeEditorSection = document.querySelector('.meme-editor-section')
  elMemeEditorSection.classList.remove('hidden')

  refreshCanvas()
}

function onMemeRemoveBtn(memeId) {
  deleteMyMeme(memeId)
  renderMyMemes()
}

//? Meme Editor Section Event Handlers //

//? Line Position Event Handlers //
function onLineText() {
  const elLineTextInput = document.querySelector('.line-text')
  let lineText = elLineTextInput.value
  if (!lineText) lineText = ' '
  setLine(lineText)
  refreshCanvas()
}

function onLineMove(direction) {
  switch (direction) {
    case 'up':
      setLine(getLine().text, getLine().color, getLine().fontSize, {
        x: getLine().pos.x,
        y: getLine().pos.y - 10,
      })
      break
    case 'down':
      setLine(getLine().text, getLine().color, getLine().fontSize, {
        x: getLine().pos.x,
        y: getLine().pos.y + 10,
      })
      break
  }
}

function onFontSize(direction) {
  let fontSize = getLine().fontSize
  switch (direction) {
    case 'rise':
      fontSize += 1
      break
    case 'lower':
      fontSize -= 1
      break
  }
  setLine(getLine().text, getLine().color, fontSize)
}

function onLinePos(direction) {
  switch (direction) {
    case 'left':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'left'
      )
      break
    case 'center':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'center'
      )
      break
    case 'right':
      setLine(
        getLine().text,
        getLine().color,
        getLine().fontSize,
        getLine().pos,
        'right'
      )
      break
  }
}

//? Font Event Handlers //
function onFontColor() {
  const elFontColor = document.querySelector('.font-color')
  let fontColor = elFontColor.value
  if (!fontColor) fontColor = '#ffffff'

  setLine(getLine().text, fontColor)
  refreshCanvas()
}

function onStrokeColor() {
  const elStrokeColor = document.querySelector('.stroke-color')
  let strokeColor = elStrokeColor.value
  if (!strokeColor) strokeColor = '#000000'

  setLine(
    getLine().text,
    getLine().color,
    getLine().fontSize,
    getLine().pos,
    getLine().textAlign,
    getLine().fontFamily,
    strokeColor
  )
}

function onFontFamily() {
  const elFontFamily = document.querySelector('.font-family-selector')
  setLine(
    getLine().text,
    getLine().color,
    getLine().fontSize,
    getLine().pos,
    getLine().textAlign,
    elFontFamily.value
  )
}

//? Sticker Event Handlers //
function onSelectSticker(elStickerBtn) {
  const sticker = elStickerBtn.dataset.sticker
  addLine(sticker)
}

//? Storages Event Handlers//
function onSaveMeme() {
  const selectedMeme = getSelectedMeme()
  const lines = getAllLines()
  addMeme(selectedMeme, lines)

  const elMemeNav = document.querySelector('.section-nav[data-section="meme"]')
  onSelectSection(elMemeNav)
  renderMyMemes()
}

function onDownloadMeme() {
  drawOnCanvas(true)
  setTimeout(() => {
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg is the default format
    downloadFile(imgContent, 'myMeme.jpg')
    drawOnCanvas()
  }, 10)

  function downloadFile(url, filename) {
    var link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function onShareMeme() {
  drawOnCanvas(true)
  setTimeout(() => {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg')
    doUploadImg(imgDataUrl, onSuccess)

    function onSuccess(uploadedImgUrl) {
      // Handle some special characters
      const url = encodeURIComponent(uploadedImgUrl)
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`
      )
    }
    drawOnCanvas()
  }, 10)

  // Send the image to the server
}

//* CANVAS EVENT HANDLERS //

function drawOnCanvas(unSelectLine) {
  const elCanvasContainer = document.querySelector('.canvas-container')
  gCanvas.width = elCanvasContainer.offsetWidth
  gCanvas.height = elCanvasContainer.offsetHeight
  const selectedMeme = getSelectedMeme()
  if (!selectedMeme) return
  const img = new Image()
  let isImageLoaded = false
  img.onload = function () {
    isImageLoaded = true
  }
  img.src = selectedMeme.url
  function animate() {
    if (!isImageLoaded) {
      // If the image is not loaded yet, wait for the next animation frame
      requestAnimationFrame(animate)
      return
    }
    gScaleFactor = Math.min(
      gCanvas.width / img.width,
      gCanvas.height / img.height
    )
    // Center the image inside the canvas
    const imgWidth = img.width * gScaleFactor
    const imgHeight = img.height * gScaleFactor
    const imgX = (gCanvas.width - imgWidth) / 2
    const imgY = (gCanvas.height - imgHeight) / 2
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
    let lines = getAllLines()
    lines.forEach((line, index) => {
      let isSelected = index === getSelectedLineIdx()
      if (unSelectLine) isSelected = false
      const scaledFontSize = line.fontSize * gScaleFactor
      gCtx.font = `${scaledFontSize}px ${line.fontFamily}`
      gCtx.fillStyle = `${line.color}`
      gCtx.lineWidth = 2
      gCtx.strokeStyle = `${line.strokeColor}`
      gCtx.textAlign = `${line.textAlign}`
      let textX = gCanvas.width / 2 + line.pos.x * gScaleFactor
      let textY =
        gCanvas.height / 2 + line.pos.y * gScaleFactor + scaledFontSize / 2
      gCtx.fillText(line.text, textX, textY)
      gCtx.strokeText(line.text, textX, textY)
      if (isSelected) {
        const textWidth = gCtx.measureText(line.text).width
        const rectX = textX - textWidth / 2 - 10
        const rectY = textY - scaledFontSize - 5
        const rectWidth = textWidth + 20
        const rectHeight = scaledFontSize + 20
        gCtx.strokeStyle = 'White'
        gCtx.lineWidth = 4
        gCtx.setLineDash([5, 5])
        gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
        gCtx.setLineDash([])
      }
    })
    requestAnimationFrame(animate)
  }
  // Start the animation loop
  animate()
}

function onMouseDownCanvas(e) {
  const mouseX = e.clientX - gCanvas.getBoundingClientRect().left
  const mouseY = e.clientY - gCanvas.getBoundingClientRect().top

  // Check if the mouse is over any text line
  getAllLines().forEach((line, index) => {
    const scaledFontSize = line.fontSize * gScaleFactor

    const textX = gCanvas.width / 2 + line.pos.x * gScaleFactor
    const textY =
      gCanvas.height / 2 + line.pos.y * gScaleFactor + scaledFontSize / 2

    const textWidth = gCtx.measureText(line.text).width
    const rectX = textX - textWidth / 2 - 10
    const rectY = textY - scaledFontSize - 5
    const rectWidth = textWidth + 20
    const rectHeight = scaledFontSize + 20

    if (
      mouseX >= rectX &&
      mouseX <= rectX + rectWidth &&
      mouseY >= rectY &&
      mouseY <= rectY + rectHeight
    ) {
      // Set the dragging state and store the initial mouse coordinates
      isDragging = true
      dragStartX = mouseX - textX
      dragStartY = mouseY - textY

      // Set the selected line index
      setSelectedLineIdx(index)

      // Redraw the canvas
      refreshCanvas()
      renderMemeEditorControlVals()
    }
  })
}

function onMouseMoveCanvas(e) {
  if (isDragging) {
    const mouseX = e.clientX - gCanvas.getBoundingClientRect().left
    const mouseY = e.clientY - gCanvas.getBoundingClientRect().top

    // Update the position of the selected line based on mouse movement
    let newTextX = (mouseX - dragStartX - gCanvas.width / 2) / gScaleFactor
    let newTextY = (mouseY - dragStartY - gCanvas.height / 2) / gScaleFactor

    // Ensure the text stays within the borders of the image
    let selectedLineIdx = getSelectedLineIdx()
    let lineWidth =
      ((getAllLines()[selectedLineIdx].text.length *
        getAllLines()[selectedLineIdx].fontSize) /
        2) *
      gScaleFactor

    const halfCanvasWidth = (gCanvas.width - lineWidth) / (2 * gScaleFactor)
    const halfCanvasHeight =
      (gCanvas.height - getAllLines()[selectedLineIdx].fontSize) /
      (2 * gScaleFactor)

    newTextX = Math.max(-halfCanvasWidth, Math.min(newTextX, halfCanvasWidth))
    newTextY = Math.max(-halfCanvasHeight, Math.min(newTextY, halfCanvasHeight))

    // Update the position of the selected line in the lines array

    getAllLines()[selectedLineIdx].pos.x = newTextX
    getAllLines()[selectedLineIdx].pos.y = newTextY

    // Redraw the canvas
    refreshCanvas()
  }
}

function onMouseUpCanvas() {
  // Reset the dragging state
  isDragging = false
}

function onTouchStartCanvas(e) {
  e.preventDefault()
  const touch = e.touches[0]
  const touchX = touch.clientX - gCanvas.getBoundingClientRect().left
  const touchY = touch.clientY - gCanvas.getBoundingClientRect().top

  // Check if the touch is over any text line
  getAllLines().forEach((line, index) => {
    const scaledFontSize = line.fontSize * gScaleFactor

    const textX = gCanvas.width / 2 + line.pos.x * gScaleFactor
    const textY =
      gCanvas.height / 2 + line.pos.y * gScaleFactor + scaledFontSize / 2

    const textWidth = gCtx.measureText(line.text).width
    const rectX = textX - textWidth / 2 - 10
    const rectY = textY - scaledFontSize - 5
    const rectWidth = textWidth + 20
    const rectHeight = scaledFontSize + 20

    if (
      touchX >= rectX &&
      touchX <= rectX + rectWidth &&
      touchY >= rectY &&
      touchY <= rectY + rectHeight
    ) {
      // Set the dragging state and store the initial touch coordinates
      isDragging = true
      dragStartX = touchX - textX
      dragStartY = touchY - textY

      // Set the selected line index
      setSelectedLineIdx(index)

      // Redraw the canvas
      refreshCanvas()
      renderMemeEditorControlVals()
    }
  })
}

function onTouchMoveCanvas(e) {
  e.preventDefault()
  if (isDragging) {
    const touch = e.touches[0]
    const touchX = touch.clientX - gCanvas.getBoundingClientRect().left
    const touchY = touch.clientY - gCanvas.getBoundingClientRect().top

    // Update the position of the selected line based on touch movement
    let newTextX = (touchX - dragStartX - gCanvas.width / 2) / gScaleFactor
    let newTextY = (touchY - dragStartY - gCanvas.height / 2) / gScaleFactor

    // Update the position of the selected line in the lines array
    let selectedLineIdx = getSelectedLineIdx()
    let lineWidth =
      ((getAllLines()[selectedLineIdx].text.length *
        getAllLines()[selectedLineIdx].fontSize) /
        2) *
      gScaleFactor

    const halfCanvasWidth = (gCanvas.width - lineWidth) / (2 * gScaleFactor)
    const halfCanvasHeight =
      (gCanvas.height - getAllLines()[selectedLineIdx].fontSize) /
      (2 * gScaleFactor)

    newTextX = Math.max(-halfCanvasWidth, Math.min(newTextX, halfCanvasWidth))
    newTextY = Math.max(-halfCanvasHeight, Math.min(newTextY, halfCanvasHeight))

    // Update the position of the selected line in the lines array

    getAllLines()[selectedLineIdx].pos.x = newTextX
    getAllLines()[selectedLineIdx].pos.y = newTextY

    // Redraw the canvas
    refreshCanvas()
  }
}

function onTouchEndCanvas() {
  // Reset the dragging state
  isDragging = false
}
