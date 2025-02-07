const express = require('express');
const router = express.Router();

// GET route to show the results page
router.get('/', (req, res) => {
  res.render('results'); // Render the results page (replace with your actual results page)
});

// POST route for submitting the results
router.post('/', (req, res) => {
 // const goBack = req.body.goBack;

 // if (goBack === 'backtoresults') {
  //  res.redirect('/results'); // Redirect to results page
  //} else if (goBack === 'backhome') {
   // res.redirect('/'); // Redirect to homepage
  //}
});

module.exports = router;
