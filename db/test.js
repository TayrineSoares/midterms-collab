const { TRUE } = require('sass');
const { addQuiz, addQuestion, addAnswer, getQuizById, getQuestionForQuiz, getAnswerForQuestion, submitAttempt, submitAnswer, getAttemptById, getAttemptAnswers } = require('./database.js'); // Adjust the path

// Test `addQuiz`
const testAddQuiz = async () => {
  const newQuiz = {
    title: "Test Quiz",
    privacy_setting: false,
    timestamp: new Date(),
    number_of_questions: 5,
  };

  try {
    const addedQuiz = await addQuiz(newQuiz);
    console.log("Added Quiz:", addedQuiz);
    return addedQuiz; // Return the added quiz to use in next tests
  } catch (error) {
    console.error("Error testing addQuiz:", error.message);
  }
};

const testAddQuestion = async (quizId) => {
  const questionText = "What is 2 + 2?";

  try {
    const addedQuestion = await addQuestion(quizId, questionText);
    console.log("Added Question:", addedQuestion);
    return addedQuestion[0]; // Return the whole question object to access its properties later
  } catch (error) {
    console.error("Error testing addQuestion:", error.message);
  }
};

const testAddAnswer = async (question) => {
  const answerText = "4"; // Assuming "4" is a valid answer
  const is_correct = true;

  try {
    // Use question.id directly to pass the question ID to addAnswers
    const addedAnswer = await addAnswer(question.id, answerText, is_correct);
    console.log("Added Answer:", addedAnswer);
    return addedAnswer; // Return the added answer to use in next tests
  } catch (error) {
    console.error("Error testing addAnswers:", error.message);
  }
};

// Test `getQuizById`
const testGetQuizById = async (quizId) => {
  try {
    const quiz = await getQuizById(quizId);
    console.log("Retrieved Quiz:", quiz);
  } catch (error) {
    console.error("Error testing getQuizById:", error.message);
  }
};

// Test `getQuestionsForQuiz`
const testGetQuestionForQuiz = async (quizId) => {
  try {
    const questions = await getQuestionForQuiz(quizId);
    console.log("Retrieved Questions:", questions);
  } catch (error) {
    console.error("Error testing getQuestionsForQuiz:", error.message);
  }
};

// Test `getAnswersForQuestion`
const testGetAnswerForQuestion = async (questionId) => {
  try {
    const answers = await getAnswerForQuestion(questionId);
    console.log("Retrieved Answers:", answers);
  } catch (error) {
    console.error("Error testing getAnswersForQuestion:", error.message);
  }
};

// Test `submitAttempt`
const testSubmitAttempt = async () => {
  const mockAttempt = {
    quiz_id: 1, // Use quiz ID 1 from your seeds (Math Quiz)
    score: 4, // Example score
    totalQuestions: 5, // Example total questions
  };

  try {
    const submittedAttempt = await submitAttempt(mockAttempt);
    console.log("Submitted Attempt:", submittedAttempt);

    // Additional checks for the returned data
    if (submittedAttempt && submittedAttempt.quiz_id === mockAttempt.quiz_id) {
      console.log("Attempt submission test passed.");
    } else {
      console.log("Attempt submission test failed.");
    }
  } catch (error) {
    console.error("Error testing submitAttempt:", error.message);
  }
};

// Test `submitAnswer`
const testSubmitAnswer = async () => {
  const mockAttempt = {
    quiz_id: 1, // Use quiz ID 1 from your seeds (Math Quiz)
    score: 0, // Example starting score
    totalQuestions: 1, // Example total questions
  };

  const mockQuestion = {
    id: 1, // Use question ID 1 from your seeds (What is 2 + 2?)
  };

  const correctAnswerId = 1; // Correct answer ID for "What is 2 + 2?" is 1 (answer "4")
  const wrongAnswerId = 2; // Wrong answer ID for "What is 2 + 2?" is 2 (answer "5")

  try {
    // Submit the attempt
    const submittedAttempt = await submitAttempt(mockAttempt);
    console.log("Submitted Attempt:", submittedAttempt);

    // Submit the correct answer
    const submittedCorrectAnswer = await submitAnswer(
      submittedAttempt.id,
      mockQuestion.id,
      correctAnswerId
    );
    console.log("Submitted Correct Answer:", submittedCorrectAnswer);

    // Submit the wrong answer
    const submittedWrongAnswer = await submitAnswer(
      submittedAttempt.id,
      mockQuestion.id,
      wrongAnswerId
    );
    console.log("Submitted Wrong Answer:", submittedWrongAnswer);

    // Check outcomes
    if (submittedCorrectAnswer.is_correct) {
      console.log("Correct answer submission test passed.");
    } else {
      console.log("Correct answer submission test failed.");
    }

    if (!submittedWrongAnswer.is_correct) {
      console.log("Wrong answer submission test passed.");
    } else {
      console.log("Wrong answer submission test failed.");
    }
  } catch (error) {
    console.error("Error testing submitAnswer:", error.message);
  }
};

// Test `getAttemptById`
const testGetAttemptById = async (attemptId) => {
  try {
    const attempt = await getAttemptById(attemptId);
    console.log("Retrieved Attempt:", attempt);
  } catch (error) {
    console.error("Error testing getAttemptById:", error.message);
  }
};

// Test `getAttemptAnswers`
const testGetAttemptAnswers = async (attemptId) => {
  try {
    const attemptAnswers = await getAttemptAnswers(attemptId);
    console.log("Retrieved Attempt Answers:", attemptAnswers);
  } catch (error) {
    console.error("Error testing getAttemptAnswers:", error.message);
  }
};

// Run all tests
(async () => {
  const quiz = await testAddQuiz(); // Add a quiz to test
  if (quiz) {
    const question = await testAddQuestion(quiz.id); // Add a question to the quiz
    if (question) {
      await testAddAnswer(question); // Add an answer for the question
      await testGetQuizById(quiz.id); // Retrieve the quiz by its ID
      await testGetQuestionForQuiz(quiz.id); // Retrieve questions for the quiz
      await testGetAnswerForQuestion(question.id); // Retrieve answers for the question
      await testSubmitAttempt(); // Test submitAttempt
      await testSubmitAnswer(); // Test submitAnswer

      // Assuming you have a valid attemptId to test
      const attemptId = 1; // Use a valid attempt ID from your tests
      await testGetAttemptById(attemptId); // Test getAttemptById
      await testGetAttemptAnswers(attemptId); // Test getAttemptAnswers
    }
  }
})();