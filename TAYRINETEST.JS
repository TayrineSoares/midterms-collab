// I AM GOING TO DELETE THIS FILE AT THE END OF THE PROJECT



// FIXING THE CREATE ROUTE TO FETCH QUIZ TITLE AND PRIVACY AND SEND INFO TO EJS
router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;
  // First, get the quiz details (title)
  getQuizById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).send("Quiz not found.");
      }

      // Then, get the questions and privacy for the quiz
      return getQuestionForQuiz(quizId)
        .then((questions) => {
          // Render the page with quiz title, privacy and questions
          res.render('create', { quizId, title: quiz.title, privacy: quiz.privacy_setting, questions });
        });
    })
    .catch((err) => {
      console.error('Error retrieving quiz or questions:', err.message);
      res.status(500).send({ error: 'Error retrieving data', details: err.message });
    });
});

// OLD ROUTE
// Route to display the create questions and answers page for a given quiz
router.get('/:quizId', (req, res) => {
  const { quizId } = req.params;

  // Retrieve existing questions from the database for the quiz
  getQuestionForQuiz(quizId)
    .then((questions) => {
      // Render the page with existing questions and answers input form
      res.render('create', { quizId, questions });
    })
    .catch((err) => {
      console.error('Error retrieving questions:', err.message);
      res.status(500).send({ error: 'Error retrieving questions', details: err.message });
    });
});
