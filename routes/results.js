const express = require('express');
const router = express.Router();
const { getAttemptByUrl } = require('../db/database');

router.get('/:url', (req, res) => {
  const attemptUrL = req.params.url; 

  getAttemptByUrl(attemptUrL)
    .then((attempt) => {
      if (!attempt) {
        return res.status(404).send('No attempts found');
      }

      res.render('results', {
        quizTitle: attempt.quiz_title,
        score: attempt.score,
        totalQuestions: attempt.total_questions,
      });
    })
    .catch((err) => {
      console.error('Error retrieving quiz attempt results:', err.message);
      res.status(500).send('Server error');
    });
});



module.exports = router;
