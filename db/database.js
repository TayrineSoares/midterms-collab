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
  const url = `http://localhost:8080/quiz/${Math.random().toString(36).substring(7)}`;

  return db
    .query(`INSERT INTO quizzes (title, privacy_setting, url)
            VALUES ($1, $2, $3) RETURNING *`,
      [quiz.title, quiz.privacy_setting, url])
    .then((result) => {
      console.log('Quiz created:', result.rows[0]);  // Log the result
      return result.rows[0];
    })
    .catch((err) => {
      console.error('Error inserting quiz:', err.message);
      throw err;
    });
};

const addQuestions = function (quizId, questions) {
  const questionPromises = questions.map((question) => {
    return db.query(
      `INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING id`,
      [quizId, question.text] // Pass quizId and question text
    );
  });

  return Promise.all(questionPromises);
};

const addAnswers = function (questionId, answers) {
  const answerPromises = answers.map((answer) => {
    const { answer_text, is_correct } = answer;
    return db.query(
      `INSERT INTO answers (question_id, answer_text, is_correct) VALUES ($1, $2, $3)`,
      [questionId, answer_text, is_correct]
    );
  });

  return Promise.all(answerPromises);
};

// Quiz Access

const getQuizById = function (quizId) {
  return db
    .query(`SELECT * FROM quizzes WHERE id = $1`, [quizId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    })
};

const getQuestionsForQuiz = function (quizId) {
  return db
    .query(`SELECT * FROM questions WHERE quiz_id = $1`, [quizId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });

};

const getAnswersForQuiz = function (quizId) {
  return db
    .query(`SELECT * FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quiz_id = $1)`, [quizId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
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
      return result.rows[0];
    })
    .catch((err) => {
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
          return result.rows[0];
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
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
      return result.rows[0]; // Returns attempt details with the count of correct answers
    })
    .catch((err) => {
      throw err;
    });
};

// Retrieve Quiz score
const getAttemptDetails = function (attemptId) {
  return db
    .query(
      `SELECT attempts.*, quizzes.title AS quiz_title
       FROM attempts
       JOIN quizzes ON attempts.quiz_id = quizzes.id
       WHERE attempts.id = $1`,
      [attemptId]
    )
    .then((result) => {
      return result.rows[0]; // Returns attempt details with quiz title
    })
    .catch((err) => {
      throw err;
    });
};

const getAttemptByUrl = function (url) {
  return db
    .query(
      `SELECT attempts.*, quizzes.title AS quiz_title 
       FROM attempts
       JOIN quizzes ON attempts.quiz_id = quizzes.id
       WHERE attempts.url = $1`, // Wrapped in backticks and fixed closing
      [url] // Passed as second argument
    )
    .then((result) => {
      return result.rows[0]; // Returns first row
    })
    .catch((err) => {
      throw err; // Propagates error
    });
};


module.exports = {
  db,
  addQuiz,
  addQuestions,
  addAnswers,
  getQuizById,
  getQuestionsForQuiz,
  getAnswersForQuiz,
  submitAttempt,
  submitAnswer,
  getAttemptById,
  getAttemptDetails,
  getAttemptByUrl
};