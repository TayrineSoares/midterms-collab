const express = require('express');
const router  = express.Router();





//*** 5 GET routes total with homepage which isb in server.js***/
router.post('/start_quiz', (req, res) => {

  res.redirect('/quiz'); //when submot is hit, user goes to the quiz page
})

router.get('/quiz', (req, res) => {
  res.send('Single quiz here') //will be replaced with res.render(quiz)
});


router.get('/create', (req, res) => {
  res.send('create here'); //will be replaced with res.render(create)
});

router.get('/results', (req, res) => {
  res.send('results are here'); //will be replaced with res.render(results)
});

router.post('/results', (req, res) =>{ //If the user wants to go back to results, or homepage, res.redirect respectively
  // ******** something like**********
   //const goBack = req.body.goBack

   //if(goBack === 'backtoresults'){ ***plug in HTML value from ejs***
   // res.redirect('/results')
   //}else if(req.body.goBack === 'backhome'){ ***plug in HTML value from ejs***
    //res.redirect('/')
   //}


})

router.get('/public', (req, res) => {
  res.send ("all public quizzes here"); //will be replaced with res.render(public)
});

module.exports = router;

