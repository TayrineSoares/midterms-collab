// const express = require('express');
// const router = express.Router();
// const { getQuizByUrl } = require('../db/database');  // Import the new function

// // Route to display the quiz page by URL
// router.get('/:quizUrl', (req, res) => {
//   const { quizUrl } = req.params;

//   // Fetch the quiz, questions, and answers by URL
//   getQuizByUrl(quizUrl)
//     .then((data) => {
//       if (!data) {
//         return res.status(404).send('Quiz not found');
//       }

//       const { quiz, questions } = data;

//       // Render the quiz page
//       res.render('quiz', { quiz, questions });
//     })
//     .catch((err) => {
//       console.error('Error fetching quiz:', err.message);
//       res.status(500).send('Internal Server Error');
//     });
// });

// module.exports = router;