const MY_KEYWORDS = 'MyKeywords'

let gkeywordVisits
_loadKeywordsFromStorage()

let gFilter = 'all'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['random', 'happy'] },
  { id: 2, url: 'img/2.jpg', keywords: ['politics', 'angry'] },
  { id: 3, url: 'img/3.jpg', keywords: ['animals', 'cute'] },
  { id: 4, url: 'img/4.jpg', keywords: ['animals', 'baby'] },
  { id: 5, url: 'img/5.jpg', keywords: ['random', 'baby'] },
  { id: 6, url: 'img/6.jpg', keywords: ['animals', 'funny'] },
  { id: 7, url: 'img/7.jpg', keywords: ['random', 'general'] },
  { id: 8, url: 'img/8.jpg', keywords: ['actors', 'happy'] },
  { id: 9, url: 'img/9.jpg', keywords: ['baby', 'happy'] },
  { id: 10, url: 'img/10.jpg', keywords: ['actors', 'funny'] },
  { id: 11, url: 'img/11.jpg', keywords: ['random', 'funny'] },
  { id: 12, url: 'img/12.jpg', keywords: ['actors', 'funny'] },
  { id: 13, url: 'img/13.jpg', keywords: ['baby', 'happy'] },
  { id: 14, url: 'img/14.jpg', keywords: ['politics', 'funny'] },
  { id: 15, url: 'img/15.jpg', keywords: ['random', 'baby'] },
  { id: 16, url: 'img/16.jpg', keywords: ['animals', 'funny'] },
  { id: 17, url: 'img/17.jpg', keywords: ['politics', 'happy'] },
  { id: 18, url: 'img/18.jpg', keywords: ['random', 'general'] },
  { id: 19, url: 'img/19.jpg', keywords: ['actors', 'general'] },
  { id: 20, url: 'img/20.jpg', keywords: ['actors', 'general'] },
  { id: 21, url: 'img/21.jpg', keywords: ['actors', 'general'] },
  { id: 22, url: 'img/22.jpg', keywords: ['random', 'funny'] },
  { id: 23, url: 'img/23.jpg', keywords: ['actors', 'happy'] },
  { id: 24, url: 'img/24.jpg', keywords: ['general', 'politics'] },
  { id: 25, url: 'img/25.jpg', keywords: ['random', 'funny'] },
]

function getMemeImages() {
  if (gFilter === 'all') return gImgs
  return gImgs.filter((img) => img.keywords.includes(gFilter))
}

function getMemeImageById(id) {
  return gImgs.find((img) => img.id === id)
}

function getSortedFilters() {
  return Object.keys(gkeywordVisits).sort(
    (a, b) => gkeywordVisits[b] - gkeywordVisits[a]
  )
}

function setFilterKeyword(filter) {
  gFilter = filter
}

function addKeywordVisits(filter) {
  gkeywordVisits[filter]++
  _saveKeywordsToStorage()
}

function getKeywordVisits(filter) {
  return gkeywordVisits[filter]
}

function _loadKeywordsFromStorage() {
  gkeywordVisits = loadFromStorage(MY_KEYWORDS)
  if (!gkeywordVisits) {
    gkeywordVisits = {
      all: 55,
      random: 5,
      happy: 1,
      politics: 15,
      animals: 25,
      cute: 35,
      angry: 25,
      baby: 5,
      funny: 2,
      general: 55,
      actors: 5,
    }
  }
}

function _saveKeywordsToStorage() {
  saveToStorage(MY_KEYWORDS, gkeywordVisits)
}
