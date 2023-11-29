// Example: Load images with specified parameters
const imageCount = 25;
const imgFolder = 'img';
const keywordList = ['random', 'happy', 'animals', 'politics', 'actors', 'general'];

var gImgs = loadImages(imageCount, imgFolder, keywordList);


  // [{ id: 1, url: 'img/1.jpg', keywords: ['random', 'happy'] },
  // { id: 2, url: 'img/2.jpg', keywords: ['random', 'happy'] },
  // { id: 3, url: 'img/3.jpg', keywords: ['random', 'happy'] },
  // { id: 4, url: 'img/4.jpg', keywords: ['random', 'happy'] },
  // { id: 5, url: 'img/5.jpg', keywords: ['random', 'happy'] },
  // { id: 6, url: 'img/6.jpg', keywords: ['random', 'happy'] },
  // { id: 7, url: 'img/7.jpg', keywords: ['random', 'happy'] },
  // { id: 8, url: 'img/8.jpg', keywords: ['random', 'happy'] },
  // { id: 9, url: 'img/9.jpg', keywords: ['random', 'happy'] },
  // { id: 10, url: 'img/10.jpg', keywords: ['random', 'happy'] },]


function getMemeImages() {
  return gImgs
}

function getMemeImageById(id) {
  return gImgs.find(img => img.id === id)
}

function loadImages(imageCount, imgFolder, keywordList) {
  // Create an array to store image objects
  const imageArray = [];

  // Loop through each image and create an object
  for (let i = 1; i <= imageCount; i++) {
      const imageUrl = `${imgFolder}/${i}.jpg`; // Image URL

      // Randomly select two keywords from the provided list
      const selectedKeywords = getRandomKeywords(keywordList, 2);

      // Create image object and push it to the array
      const imageObject = {
          id: i,
          url: imageUrl,
          keywords: selectedKeywords,
      };

      imageArray.push(imageObject);
  }

  return imageArray;
}

// Function to randomly select n keywords from a given list
function getRandomKeywords(keywordList, n) {
  const shuffledKeywords = keywordList.sort(() => 0.5 - Math.random());
  return shuffledKeywords.slice(0, n);
}
