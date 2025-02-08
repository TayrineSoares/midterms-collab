const express = require('express');
const router = express.Router();
const { addQuestions, addAnswers, getQuestionForQuiz } = require('../db/database');

// Route to display the create questions and answers page for a given quiz

router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;
//ADD THE getQuizById function
// SEND TITLE AND PRIVACY TO

  // Retrieve existing questions from the database for the quiz
  getQuestionForQuiz(quizId)
    .then((questions) => {
      // Render the page with existing questions and answers input form
      res.render('create', { quizId, questions });
    })
    .catch((err) => {
      console.error('Error retrieving questions:', err.message);
      res.status(500).send({ error: 'Error retrieving questions', details: err.message });
    });
});

// Route to handle the submission of questions and answers for a given quiz
router.post('/:quizId', (req, res) => {
  const { quizId } = req.params;
  const { questions, answers } = req.body; // Get both questions and answers from the form

  // Check if questions are submitted, if not, add them
  if (questions && Array.isArray(questions) && questions.length === 5) {
    // Add questions to the database
    addQuestions(quizId, questions)
      .then(() => {
        console.log(`Questions added to quiz ${quizId}:`, questions);
      })
      .catch((err) => {
        console.error('Error adding questions:', err.message);
        return res.status(500).send({ error: 'Error adding questions', details: err.message });
      });
  } else {
    return res.status(400).send({ error: 'Exactly 5 questions are required' });
  }

  // Check if answers are submitted
  if (answers && Array.isArray(answers) && answers.length === 5) {
    // Add answers to the database
    addAnswers(quizId, answers)
      .then(() => {
        console.log(`Answers added to quiz ${quizId}:`, answers);
        res.send({ message: 'Questions and answers added successfully' });
      })
      .catch((err) => {
        console.error('Error adding answers:', err.message);
        return res.status(500).send({ error: 'Error adding answers', details: err.message });
      });
  } else {
    return res.status(400).send({ error: 'Exactly 5 answers are required' });
  }
});

module.exports = router;
