const { TRUE } = require('sass');
const { addQuiz, addQuestion, addAnswers, getQuizById, getQuestionsForQuiz, getAnswersForQuestion, submitAttempt } = require('./database.js'); // Adjust the path

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

const testAddAnswers = async (question) => {
  const answerText = "4"; // Assuming "4" is a valid answer
  const is_correct = true;

  try {
    // Use question.id directly to pass the question ID to addAnswers
    const addedAnswer = await addAnswers(question.id, answerText, is_correct);
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
const testGetQuestionsForQuiz = async (quizId) => {
  try {
    const questions = await getQuestionsForQuiz(quizId);
    console.log("Retrieved Questions:", questions);
  } catch (error) {
    console.error("Error testing getQuestionsForQuiz:", error.message);
  }
};

// Test `getAnswersForQuestion`
const testGetAnswersForQuestion = async (questionId) => {
  try {
    const answers = await getAnswersForQuestion(questionId);
    console.log("Retrieved Answers:", answers);
  } catch (error) {
    console.error("Error testing getAnswersForQuestion:", error.message);
  }
};

const testSubmitAttempt = async () => {
  const mockAttempt = {
    quiz_id: 13, // Assuming quiz with ID 13 exists
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

// Other existing tests here...

// Run all tests
(async () => {
  const quiz = await testAddQuiz(); // Add a quiz to test
  if (quiz) {
    const question = await testAddQuestion(quiz.id); // Add a question to the quiz
    if (question) {
      await testAddAnswers(question); // Add an answer for the question
      await testGetQuizById(quiz.id); // Retrieve the quiz by its ID
      await testGetQuestionsForQuiz(quiz.id); // Retrieve questions for the quiz
      await testGetAnswersForQuestion(question.id); // Retrieve answers for the question
      await testSubmitAttempt(); // Test submitAttempt
    }
  }
})();