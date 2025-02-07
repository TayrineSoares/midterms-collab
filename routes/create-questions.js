const express = require('express');
const router = express.Router();
const { addQuestions } = require('../db/database')

// GET route to render the 'create' page and pass quizId
router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;
  res.render('create', { quizId });
});

router.post('/', (req, res) => {
  // Hardcode quizId for testing
  const quizId = 1; 

  const questions = req.body.questions; // Changed to 'questions'

  console.log('Received questions:', questions);  // Log the received questions

  if (!Array.isArray(questions) || questions.length !== 5) {
    console.log('Invalid number of questions');
    return res.status(400).send({ error: 'Exactly 5 questions are required' });
  }

  addQuestions(quizId, questions)
    .then(() => {
      console.log(`Questions added to quiz ${quizId}:`, questions);
      res.send({ message: 'Questions added successfully' });
    })
    .catch((err) => {
      console.log('Error adding questions:', err.message);
      throw err;
    });
});

module.exports = router; 