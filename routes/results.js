// const express = require('express');
// const router = express.Router();
// const { getAttemptByUrl } = require('../db/database');

// Route to display the results page
// router.get('/:url', (req, res) => {
//   const attemptUrl = req.params.url;

//   getAttemptByUrl(attemptUrl)
//     .then((attempt) => {
//       if (!attempt) {
//         return res.status(404).send('Attempt not found');
//       }

//       // Render a results page using a template engine (e.g., EJS)
//       res.render('results', {
//         quizTitle: attempt.quiz_title,
//         score: attempt.score,
//         totalQuestions: attempt.total_questions,
//       });
//     })
//     .catch((err) => {
//       console.error('Error fetching attempt data:', err);
//       res.status(500).send('Error fetching attempt data');
//     });
// });

// module.exports = router;
