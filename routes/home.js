
const express = require('express');
const router = express.Router();
const { addQuiz } = require('../db/database')




app.post('/', (req, res) => {
  const { quizTitle, privacySetting } = req.body;

  const quiz = {
    title: quizTitle,
    privacy_setting: privacySetting,
  };

  
  addQuiz(quiz)
    .then((createdQuiz) => {
      console.log('Quiz created:', createdQuiz);
      
      
      res.redirect(`/create/${createdQuiz.id}`);
    })
    .catch((err) => {
      console.error("Error creating quiz:", err);
      res.status(500).send("Error creating quiz.");
    });
});


app.get('/create/:id', (req, res) => {
  const quizId = req.params.id;  

  
  res.render('create', { quizId });
});

module.exports = router;