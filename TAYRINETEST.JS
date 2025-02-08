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




// How back end receives info from the questions form
// we could use array indexes to match questions and answers
// questions[0] = Question 1; answers[0] = Answers for Question 1

{
  questions: [
    "What is the capital of France?",  // Question 1
    "What is the largest planet?",    // Question 2
  ],

  answers: [
    {
      answer1: "Paris", // Answer 1 for Question 1
      answer2: "Berlin",
      answer3: "Madrid",
      answer4: "Rome",
      correct: "answer1"  // Correct answer for Question 1 (selected answer)
    },
    {
      answer1: "Jupiter", // Answer 1 for Question 2
      answer2: "Saturn",
      answer3: "Mars",
      answer4: "Earth",
      correct: "answer1"   // Correct answer for Question 2 (selected answer)
    },
  ]
}
