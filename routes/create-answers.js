const express = require('express');
const router  = express.Router();
const { getQuestionForQuiz, addAnswers } = require('../db/database')

router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;

  getQuestionForQuiz(quizId)
    .then(() => {
      console.log(`Retrieved questions from Quiz ID:`, quizId)
      res.send({ message: "Successfuly retrived quiz." })
    })
    .catch((err) => {
      console.log(`Error retriving questions from Quiz ID ${quizId}`)
      res.send(err)
    })
});

router.post('/:quizId', (req, res) => {
  // Harcord quizId for testing
  const { quizId } = req.params;

  const answers = req.body.answers;

  addAnswers(quizId, answers)
    .then(() => {
      console.log(`Answers added to question ${quizId}`, answers)
      res.send({ message: 'Answers added successfully' });
    })
    .catch((err) => {
      console.log(`Error adding answers`, err.message)
      throw err;
    })
});


module.exports = router;