const express = require('express');
const router = express.Router();
const { addQuestions, addAnswers, getQuizById } = require('../db/database');

// Route to display the create questions and answers page for a given quiz
router.get('/:id', (req, res) => {
  const quizId = req.params.id;

  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
      res.render('create', {
        quiz,
        quizId,
        title: quiz.title,
        privacySetting: quiz.privacy_setting
      });
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Route to handle the submission of questions and answers for a given quiz
router.post('/:quizId', (req, res) => {
  const { quizId } = req.params;
  const { questions, answers } = req.body;

  console.log('Request Body:', req.body);

  // Ensure questions and answers are valid
  if (!Array.isArray(questions) || !Array.isArray(answers) || questions.length !== answers.length) {
    return res.status(400).send({ error: 'Questions and answers must be arrays of the same length' });
  }

  // Format questions and answers for insertion
  const formattedQuestions = questions.map((question, index) => ({
    text: question,
    answers: [
      {
        answer_text: answers[index].answer1,
        is_correct: answers[index].correct === 'answer1'
      },
      {
        answer_text: answers[index].answer2,
        is_correct: answers[index].correct === 'answer2'
      },
      {
        answer_text: answers[index].answer3,
        is_correct: answers[index].correct === 'answer3'
      },
      {
        answer_text: answers[index].answer4,
        is_correct: answers[index].correct === 'answer4'
      }
    ]
  }));

  // Insert questions and answers into the database
  const questionPromises = formattedQuestions.map((question) => {
    return addQuestions(quizId, [question]) // Pass the question object
      .then((result) => {
        const questionId = result[0].rows[0].id; // Get the question ID
        return addAnswers(questionId, question.answers); // Insert the answers for this question
      });
  });

  // Wait for all questions and answers to be inserted
  Promise.all(questionPromises)
    .then(() => {
      console.log(`Questions and answers added to quiz ${quizId}`);
      res.redirect(`/quiz/${quizId}`); // Redirect to the quiz page
    })
    .catch((err) => {
      console.error('Error adding questions and answers:', err.message);
      res.status(500).send({ error: 'Error adding questions and answers', details: err.message });
    });
});

module.exports = router;
