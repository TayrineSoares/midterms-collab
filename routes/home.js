const express = require('express');
const router = express.Router();
const { addQuiz } = require('../db/database');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
<<<<<<< HEAD
  const { quizTitle, privacySetting } = req.body;
=======
  const { title, privacy_setting } = req.body;
>>>>>>> 87d6a54e086b715cd50b3fa556879cacaae11742

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

<<<<<<< HEAD

router.get('/create/:id', (req, res) => {
  const quizId = req.params.id;  

  
  res.render('create', { quizId });
});

=======
>>>>>>> 87d6a54e086b715cd50b3fa556879cacaae11742
module.exports = router;