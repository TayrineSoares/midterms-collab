// Client facing scripts here


// $(document).ready(function() {
//   console.log("jQuery is working!");

//   // Test if jQuery is defined
//   if (typeof jQuery !== 'undefined') {
//     console.log("jQuery is loaded!");
//   } else {
//     console.log("jQuery is not loaded!");
//   }
// });




$(document).ready(function() {

  // Button click events - Redirect
  $('#all-public-quizzes-btn'). on('click', () => {
    window.location.href = '/public'; // Redirect to /public
  });

  $('#homepage-btn'). on('click', () => {
    window.location.href = '/'; // Redirect to /

  });

  $('#public-homepage-btn'). on('click', () => {
    window.location.href = '/'; // Redirect to /

  });





  //Button click event - Copy current URL
  $("#copy-url-btn"). on('click', () => {
    navigator.clipboard.writeText(window.location.href)
    .then(() =>{
      //Popup message
      $("#copyMessage").fadeIn().delay(2000).fadeOut(); // Show message for 2sec
    })
    .catch(err => console.error("Failed to copy:", err));
  });


});

