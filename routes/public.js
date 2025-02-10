const express = require('express');
const router = express.Router();
const { getPublicQuizzes } = require('../db/database'); // Importing the function
const { getQuizById } = require('../db/database');
// GET route to fetch and display all public quizzes


router.get("/", (req, res) => {
  getPublicQuizzes()
    .then((quizzes) => {
      const templateVars = { quizzes }; // Pass quizzes data as a variable
      console.log(templateVars);
      res.render("public", templateVars); // Render the EJS template with the data

})});


router.get('/:id', (req, res) => {
  const quizId = req.params.id; 

  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send('Quiz not found'); 
      }
      res.render('public', { 
        quiz,
        questions,
        answers,
        title: quiz.title }); 
    })
    .catch((err) => {
      console.error("Error fetching public quizzes:", err.message);
      res.status(500).send("Internal Server Error");
    });
});

router.post('/public', (req, res) => {
  res.render('public'); 
});

module.exports = router;
