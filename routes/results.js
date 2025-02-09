const express = require('express');
const router = express.Router();
const {getAttemptDetails } = require('../db/database');


router.get('/', (req, res) => {
  res.render('results'); 


});
router.get('/:attemptId', (req, res) => {
  const attemptId = req.params.attemptId; 

  getAttemptDetails(attemptId)
    .then((attempt) => {
      if (!attempt) {
        return res.status(404).send('No attempts found');
      }

      res.render('results', {
        title: attempt.quiz_title,
        correctAnswersCount: attempt.score
      });
    })
    .catch((err) => {
      console.error('Error retrieving quiz attempt results:', err.message);
      res.status(500).send('Server error');
    });
});



module.exports = router;