const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { addQuiz } = require('../db/database');

router.get('/', (req, res) => {
  console.log('/create triggered')

  res.render('create');
});

router.post('/', (req, res) =>{
  //const {quizTitle, privacySetting, questions} = req.body;
  //const quiz = {
   // title: quizTitle,
    //privacy_setting: privacySetting,
   // url: generateUrl(),
   // timestamnp: Date.now(),
    //number_of_questions: questions.length,

  }

  // addQuiz(quiz)
  //   .then((createQuiz) => {

  //   })



    //res.redirect('/create')
)

router.post('/create:id', (req, res) => {

  console.log('id reoute connected');

  res.redirect('/create')
})
module.exports = router;
