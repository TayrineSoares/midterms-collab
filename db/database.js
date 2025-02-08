require('dotenv').config({ path: '../.env' });

// PG database client/database setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.query('SELECT NOW()')
  .then(res => {
    console.log('Database connection test successful:', res.rows);
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
  });

// Quiz Creation

// Adds new quiz to database
const addQuiz = function (quiz) {
  // Generate a unique URL for the quiz
  const url = `http://localhost:8080/quiz/${Math.random().toString(36).substring(7)}`;

  return db
    .query(`INSERT INTO quizzes (title, privacy_setting, url)
            VALUES ($1, $2, $3) RETURNING *`,
           [quiz.title, quiz.privacy_setting, url])  // Always 5 questions
    .then((result) => {
      console.log(`Quiz added: `, result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Error adding quiz: ', err.message);
      throw err;
    });
}

const addQuestions = function (quizId, questions) {
  // Map each question text to a database query promise for insertion
  const questionPromises = questions.map((questionText) => {
    return db
      .query(`INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING *`, [quizId, questionText]);
  });

  // Execute all question insertion queries concurrently and handle results or errors
  return Promise.all(questionPromises)
    .then((results) => {
      console.log(`Questions added for quizID ${quizId}: `, results);
      return results;
    })
    .catch((err) => {
      console.log('Error adding questions: ', err.message);
      throw err;
    });
};

const addAnswers = function (quizId, answers) {
  const answerPromises = answers.map((answer) => {
    const { questionId, answer_text, is_correct } = answer;
    return db.query(
      `INSERT INTO answers (question_id, answer_text, is_correct)
       VALUES ($1, $2, $3) RETURNING *`,
      [questionId, answer_text, is_correct]
    );
  });

  return Promise.all(answerPromises)
    .then((results) => {
      console.log(`Answers added for quiz ID ${quizId}:`, results);
      return results;
    })
    .catch((err) => {
      console.log('Error adding answers:', err.message);
      throw err;
    });
};

// Quiz Access

const getQuizById = function (quizId) {
  return db
    .query(`SELECT * FROM quizzes WHERE id = $1`, [quizId])
    .then((result) => {
      console.log('Quiz accessed: ', result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Error accessing quiz: ', err.message);
      throw err;
    })
};

const getQuestionForQuiz = function (quizId) {
  return db
    .query(`SELECT * FROM questions WHERE quiz_id = $1`, [quizId])
    .then((result) => {
      console.log(`Questions from quizID ${quizId}: `, result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('Error retrieving questions: ', err.message);
      throw err;
    });

};

const getAnswerForQuestion = function (questionId) {
  return db
    .query(`SELECT * FROM answers WHERE question_id = $1`, [questionId])
    .then((result) => {
      console.log(`Answers from questionID ${questionId}`, result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('Error retrieving answers: ', err.message);
      throw err;
    });
};

// Quiz Attempts

// Records attempt from taking quiz
const submitAttempt = function (attempt) {
  const url = `http://localhost:8080/results/${Math.random().toString(36).substring(7)}`;

  return db
    .query(
      `INSERT INTO attempts (quiz_id, score, total_questions, url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [attempt.quiz_id, attempt.score, attempt.totalQuestions, url]
    )
    .then((result) => {
      console.log(`Submitted Attempt: `, result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Error submitting attempt: ', err.message);
      throw err;
    });
};

// Records the answers selected by quiz taker
const submitAnswer = function (attemptId, questionId, selectedAnswerId) {

  return db
    .query(`SELECT is_correct FROM answers WHERE id = $1`, [selectedAnswerId])
    .then((result) => {
      const isCorrect = result.rows[0] ? result.rows[0].is_correct : false;

      return db
        .query(
          `INSERT INTO attempt_answers (attempt_id, question_id, selected_answer_id, is_correct) VALUES ($1, $2, $3, $4) RETURNING *`,
          [attemptId, questionId, selectedAnswerId, isCorrect]
        )
        .then((result) => {
          console.log(`Submitted Answer: `, result.rows[0]);
          return result.rows[0];
        })
        .catch((err) => {
          console.error(`Error submitting answer: `, err.message);
          throw err;
        });
    })
    .catch((err) => {
      console.error(`Error fetching answer correctness: `, err.message);
      throw err;
    });
};

// Quiz Results

// Retrieves quiz attempt by ID
const getAttemptById = function (attemptId) {
  return db
    .query(
      `SELECT attempts.*, COUNT(attempt_answers.id) AS correct_answers
       FROM attempts
       LEFT JOIN attempt_answers ON attempts.id = attempt_answers.attempt_id AND attempt_answers.is_correct = true
       WHERE attempts.id = $1
       GROUP BY attempts.id`,
      [attemptId]
    )
    .then((result) => {
      console.log(`Attempt accessed: `, result.rows[0]);
      return result.rows[0]; // Returns attempt details with the count of correct answers
    })
    .catch((err) => {
      console.log(`Error accessing attempt: `, err.message);
      throw err;
    });
};

// Retrieves all answers to a quiz attempt
const getAttemptAnswers = function (attemptId) {
  return db
    .query(
      `SELECT COUNT(*) AS correct_answers
       FROM attempt_answers
       WHERE attempt_id = $1 AND is_correct = true`,
      [attemptId]
    )
    .then((result) => {
      console.log(`Correct answers retrieved: `, result.rows[0]);
      return result.rows[0].correct_answers; // Return the count of correct answers
    })
    .catch((err) => {
      console.log(`Error retrieving attempt answers: `, err.message);
      throw err;
    });
};

module.exports = {
  db,
  addQuiz,
  addQuestions,
  addAnswers,
  getQuizById,
  getQuestionForQuiz,
  getAnswerForQuestion,
  submitAttempt,
  submitAnswer,
  getAttemptById,
  getAttemptAnswers
};
