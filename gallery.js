let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://your-json-url.com' // Replace with actual JSON URL
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
function fetchJSON () {
 $.ajax({
  url: mUrl,
  dataType: 'json',
  success: function(data) {
    mImages = data
    console.log('JSON data loaded:', mImages)
    showImage(0)
  },
  error: function(xhr, status, error) {
    console.log('Error loading JSON:',error)
  }
 })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  if (mImages === 0) return

  const currentImage = mImages[mCurrentIndex]

  $('#photo').attr('src', currentImage.imgPath)

  $('.location').text(`Location ${currentImage.imgLocation}`)
  $('.description').text(`Location ${currentImage.description}`)
  $('.date').text(`Location ${currentImage.date}`)
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
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer () {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
