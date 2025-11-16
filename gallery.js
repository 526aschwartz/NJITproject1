let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially
  setInterval(showNextPhoto, mWaitTime)

  $('#moreIndicator').on('click', function () {
    $(this).toggleClass('rot90 rot270')
     $('.details').slideToggle()
  })

  $('#nextPhoto').on('click', () => {
    showNextPhoto()
  })

  $('#prevPhoto').on('click', () => {
    showPrevPhoto()
  })
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images 
      console.log('JSON data loaded:', mImages);
      mCurrentIndex = 0;
      swapPhoto();
    },
    error: function (xhr, status, error) {
      console.log('Error loading JSON:', error);
    }
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
 if (mImages.length === 0) return;

  const currentImage = mImages[mCurrentIndex];

  $('#photo').attr('src', currentImage.imgPath);
  $('.location').text(`Location: ${currentImage.imgLocation}`);
  $('.description').text(`Description: ${currentImage.description}`);
  $('.date').text(`Date: ${currentImage.date}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  startTimer();
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  startTimer();
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto();
}
let mTimer;
// Starter code for the timer function
function startTimer () {
   if (mTimer) {
    clearInterval(mTimer);
  }
  mTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime)
}
