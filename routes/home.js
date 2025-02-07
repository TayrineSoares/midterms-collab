const express = require('express');
const router = express.Router();
const { addQuiz } = require('../db/database');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  const { title, privacy_setting } = req.body;

  const quiz = {
    title: title,
    privacy_setting: privacy_setting === 'private',  // Ensure privacy is set to true/false
  };

  addQuiz(quiz)
    .then((createdQuiz) => {
      console.log('Quiz created:', createdQuiz);
      
      // Redirect to the create-questions page for this quiz
      res.redirect(`/quiz/create/${createdQuiz.id}`);
    })
    .catch((err) => {
      console.error("Error creating quiz:", err);
      res.status(500).send("Error creating quiz.");
    });
});

module.exports = router;