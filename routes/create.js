const express = require('express');
const router = express.Router();
const { addQuestion } = require('../db/database')

<<<<<<< HEAD
router.get('/', (req, res) => { 
  console.log('/create triggered')

  res.render('create'); 
});

router.post('/', (req, res) =>{


    res.redirect('/create')
})

router.post('/create:id', (req, res) => {
=======
router.get('/', (req, res) => {
  const { quizId } = req.params;

  res.render('create', { quizId });
});

router.post('/', (req, res) => {
  // TEMP: Hardcode quizId for testing
  const quizId = 1; 

  const questionText = req.body.question;

  console.log('Received question:', questionText);  // Log the received question

  if (!questionText) {
    console.log('No question provided');
    return res.status(400).send({ error: 'Question is required' });
  }
>>>>>>> master

  addQuestion(quizId, questionText)
    .then(() => {
      console.log(`Question added to quiz ${quizId}:`, questionText);
      res.status(201).send({ message: 'Question added successfully' });
    })
    .catch((err) => {
      console.error('Error adding question:', err.message);
      res.status(500).send({ error: 'Internal Server Error', details: err.message });
    });
});

module.exports = router;