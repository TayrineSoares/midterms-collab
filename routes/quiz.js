const express = require('express');
const router = express.Router();
const { getQuizById, getQuestionsForQuiz, getAnswersForQuiz } = require('../db/database');

// Route to display the quiz details page
router.get('/:id', (req, res) => {
  const quizId = req.params.id;

  // Fetch the quiz by ID
  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }

      // Fetch questions and answers for this quiz
      Promise.all([
        getQuestionsForQuiz(quizId),
        getAnswersForQuiz(quizId),
      ])
        .then(([questions, answers]) => {
          // Organize questions with their answers
          const questions_and_answers = questions.map((question) => {
            const related_answers = answers.filter(answer => answer.question_id === question.id);
            return {
              question: question.question, // Use the correct field name
              answers: related_answers
            };
          });

          // Render the quiz page with the quiz, questions, and answers
          res.render('quiz', {
            quiz,
            questions_and_answers,
            title: quiz.title,
            privacySetting: quiz.privacy_setting,
          });
        })
        .catch((err) => {
          console.error('Error fetching questions and answers:', err);
          res.status(500).send('Error fetching questions and answers');
        });
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err);
      res.status(500).send('Error fetching quiz');
    });
});

module.exports = router;