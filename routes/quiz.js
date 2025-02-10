const express = require('express');
const router = express.Router();
const { getQuizByUrl, getQuestionsForQuiz, getAnswersForQuiz, submitAttempt } = require('../db/database');


// Route to display the quiz details page
router.get('/:url', (req, res) => {
  const quizUrl = req.params.url;

  // Fetch the quiz by ID
  getQuizByUrl(quizUrl)
  .then((quiz) => {
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    // Fetch questions and answers for this quiz
    Promise.all([
      getQuestionsForQuiz(quizUrl),
      getAnswersForQuiz(quizUrl),
    ])
    .then(([questions, answers]) => {
      const questions_and_answers = questions.map((question) => {
        const related_answers = answers.filter(answer => answer.question_id === question.id);
        return {
          question: question.question,
          answers: related_answers
        };
      });

      res.render('quiz', {
        quiz,
        quizUrl,
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



//POST REQUEST TO HANDLE THE FORM SUBMISSION
router.post('/:url', (req, res) => {
  const quizUrl = req.params.url;
  const submittedAnswers = req.body;

  getQuizByUrl(quizUrl)
  .then((quiz) => {
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const quizId = quiz.id;

    // Fetch questions and answers for this quiz
    Promise.all([getQuestionsForQuiz(quizUrl), getAnswersForQuiz(quizUrl)])
    .then(([questions, answers]) => {
      let score = 0;

      questions.forEach((question, index) => {
        const correctAnswer = answers.find(answer => answer.question_id === question.id && answer.is_correct);
        const submittedAnswer = submittedAnswers[`question_${index}`];

        if (submittedAnswer === correctAnswer.answer_text) {
          score++;
        }
      });

      console.log('Score:', score);

      const totalQuestions = questions.length;

      const attempt = {
        quiz_id: quizId,
        score: score,
        totalQuestions: totalQuestions
      };

      submitAttempt(attempt)
        .then((newAttempt) => {
          res.redirect(`/results/${newAttempt.url}`);
        })
        .catch((err) => {
          console.error('Error saving attempt:', err);
          res.status(500).send('Error saving attempt');
        });
    })
    .catch((err) => {
      console.error('Error fetching quiz data:', err);
      res.status(500).send('Error calculating score');
    });
  })
  .catch((err) => {
  console.error('Error fetching quiz:', err);
  res.status(500).send('Error fetching quiz');
  });
});


module.exports = router;
