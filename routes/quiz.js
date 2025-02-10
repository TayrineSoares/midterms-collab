const express = require('express');
const router  = express.Router();
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
            quizId,   // ADDED QUIZ ID
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
router.post('/:id', (req, res) => {
  const quizId = req.params.id
  const submittedAnswers = req.body; // answers submitted by the user
  // console.log(req.body)

    // Fetch correct answers for the quiz
    Promise.all([getQuestionsForQuiz(quizId), getAnswersForQuiz(quizId)])
    .then(([questions, answers]) => {
      let score = 0;

      // Loop through each question and compare the answers
      questions.forEach((question, index) => {
        const correctAnswer = answers.find(answer => answer.question_id === question.id && answer.is_correct);

        // Get the user's selected answer (assuming submitted answers are keyed by question number)
        const submittedAnswer = submittedAnswers[`question_${index}`];

        // Check if the submitted answer matches the correct answer
        if (submittedAnswer === correctAnswer.answer_text) {
          score++;
        }
      });

      //MAKE SURE IS CALCULATING THE SCORE
      console.log('Score:', score);

      const totalQuestions = questions.length;

      const attempt = {
        quiz_id: quizId,
        score: score,
        totalQuestions: totalQuestions
      };

      submitAttempt(attempt)
        .then((newAttempt) => {
          res.redirect(`/results/${newAttempt.id}`); 
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
});






module.exports = router;
