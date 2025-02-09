const express = require('express');
const router  = express.Router();
const { getQuizById, getQuestionsForQuiz, getAnswersForQuiz } = require('../db/database');

<<<<<<< Updated upstream
// Route to display the quiz details page
router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;
=======
router.post('/', (req, res) => {

  res.redirect('/quiz');
});


router.get('/', (req, res) => {

  res.render('quiz');
});

router.get('/:id', (req, res) => {
>>>>>>> Stashed changes

})


// Route to display the quiz details page
router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;
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
          res.render('quiz', {
            quiz,
            questions,
            answers,
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
