const express = require('express');
const router = express.Router();
const { addQuestions, addAnswers, getQuizByUrl } = require('../db/database');

// Route to display the create questions and answers page for a given quiz
router.get('/:url', (req, res) => {
  const quizUrl = req.params.url;
  
  getQuizByUrl(quizUrl)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
      res.render('create', {
        quiz,
        title: quiz.title,
        url: quiz.url,
        privacySetting: quiz.privacy_setting
      });
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Route to handle the submission of questions and answers for a given quiz
router.post('/:url', (req, res) => {
  const quizUrl = req.params.url;
  const { questions, answers } = req.body;

  console.log('Request Body:', req.body);

  // Ensure questions and answers are valid
  if (!Array.isArray(questions) || !Array.isArray(answers) || questions.length !== answers.length) {
    return res.status(400).send({ error: 'Questions and answers must be arrays of the same length' });
  }

  // First, fetch the quiz details by URL to get the quizId
  getQuizByUrl(quizUrl)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found');
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

      // Insert questions and answers into the database using quizId
      const questionPromises = formattedQuestions.map((question) => {
        return addQuestions(quiz.id, [question]) // Pass quiz.id, not quiz.url
          .then((result) => {
            const questionId = result[0].rows[0].id; // Get the question ID
            return addAnswers(questionId, question.answers); // Insert the answers for this question
          });
      });

      // Wait for all questions and answers to be inserted
      return Promise.all(questionPromises);
    })
    .then(() => {
      console.log(`Questions and answers added to quiz with URL ${quizUrl}`);
      res.redirect(`/quiz/${quizUrl}`); // Redirect to the quiz page using URL
    })
    .catch((err) => {
      console.error('Error adding questions and answers:', err.message);
      res.status(500).send({ error: 'Error adding questions and answers', details: err.message });
    });
});

module.exports = router;
