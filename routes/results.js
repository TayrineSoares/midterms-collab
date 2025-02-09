const express = require('express');
const router = express.Router();
const { getQuizById } = require('../db/database');


router.get('/', (req, res) => {
  res.render('results'); 


});
router.get('/:id', (req, res) => {
  const quizId = req.params.id; 

  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found'); 
      }
      res.render('results', { 
        quiz,
        questions,
        answers,
        title: quiz.title }); 
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err.message);
      res.status(500).send('Server error'); 
    });
});

router.post('/results', (req, res) => {
  res.render('results'); 
});

module.exports = router;