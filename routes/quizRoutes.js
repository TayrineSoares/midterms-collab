const express = require('express');
const router = express.Router();
const { getQuizById } = require('../db/database'); // Adjust path as necessary

router.get('/create/:id', (req, res) => {
  const quizId = req.params.id;

  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
      res.render('create', { quiz });
    })
    .catch((err) => {
      console.error('Error fetching quiz:', err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;