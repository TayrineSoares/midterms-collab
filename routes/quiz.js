const express = require('express');
const router  = express.Router();


router.post('/', (req, res) => {

  res.redirect('/quiz');
});


router.get('/', (req, res) => {

  res.render('quiz');
});

router.get('/:id', (req, res) => {

})
module.exports = router;
