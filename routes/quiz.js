const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
 
  res.redirect('/create'); 
});


router.get('/', (req, res) => {
  res.render('/create'); 
});

module.exports = router;
