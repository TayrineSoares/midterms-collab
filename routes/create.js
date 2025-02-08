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
  if (answers && Array.isArray(answers) && answers.length === 20) { // 4 answers for each of 5 questions
    const formattedAnswers = answers.map((answer) => ({
      question_id: answer.question_id,
      answer_text: answer.answer_text,
      is_correct: answer.is_correct,  // Ensure we are including the is_correct field
    }));

    addAnswers(quizId, formattedAnswers)
      .then(() => {
        console.log(`Answers added to quiz ${quizId}:`, formattedAnswers);
        res.redirect(`/quiz/${quizId}`);
      })
      .catch((err) => {
        console.error('Error adding answers:', err.message);
        return res.status(500).send({ error: 'Error adding answers', details: err.message });
      });
  } else {
    return res.status(400).send({ error: 'Exactly 20 answers are required (4 answers for each of 5 questions)' });
  }
});

module.exports = router;