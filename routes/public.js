const express = require('express');
const router = express.Router();
const { getQuizById } = require('../db/database'); 


router.get('/', (req, res) => {
  res.render('public'); 
});


router.get('/:id', (req, res) => {
  const quizId = req.params.id; 

  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found'); 
      }
      res.render('public', { quiz }); 
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err.message);
      res.status(500).send('Server error'); 
    });
});


router.post('/public', (req, res) => {
  res.render('public'); 
});

module.exports = router;
