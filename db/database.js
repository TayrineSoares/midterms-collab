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
  const url = `${Math.random().toString(36).substring(7)}`;

  return db
    .query(`INSERT INTO quizzes (title, privacy_setting, url)
            VALUES ($1, $2, $3) RETURNING *`,
      [quiz.title, quiz.privacy_setting, url])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

const addQuestions = function (quizId, questions) {
  const questionPromises = questions.map((question) => {
    return db.query(
      `INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING id`,
      [quizId, question.text]
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

const getQuizByUrl = (url) => {
  return db
    .query('SELECT * FROM quizzes WHERE url = $1', [url])
    .then((result) => {
      return result.rows[0];
    })  
    .catch((err) => {
      throw err;
    });
};

const getQuestionsForQuiz = (url) => {
  // First, retrieve the quiz_id by url
  return getQuizByUrl(url)
    .then((quiz) => {
      if (!quiz) {
        throw new Error('Quiz not found');
      }
      const quizId = quiz.id;
      return db.query('SELECT * FROM questions WHERE quiz_id = $1', [quizId])
        .then(result => result.rows);
    })
    .catch((err) => {
      throw err;
    });
};

const getAnswersForQuiz = (url) => {
  // First, retrieve the quiz_id by url
  return getQuizByUrl(url)
    .then((quiz) => {
      if (!quiz) {
        throw new Error('Quiz not found');
      }
      const quizId = quiz.id;
      return db.query('SELECT * FROM answers WHERE question_id IN (SELECT id FROM questions WHERE quiz_id = $1)', [quizId])
        .then(result => result.rows);
    })
    .catch((err) => {
      throw err;
    });
};

// Quiz Attempts

// Records attempt from taking quiz
const submitAttempt = function (attempt) {
  const url = `${Math.random().toString(36).substring(7)}`;

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

// Quiz Results

const getAttemptByUrl = function (url) {
  return db
    .query(
      `SELECT attempts.*, quizzes.title AS quiz_title
       FROM attempts
       JOIN quizzes ON attempts.quiz_id = quizzes.id
       WHERE attempts.url = $1`,
      [url]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      throw err;
    });
};

// Retrive Public Quizzes
const getPublicQuizzes = function () {
  return db
    .query(`
      SELECT title, url
      FROM quizzes
      WHERE privacy_setting = false; -- Public quizzes
    `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  db,
  addQuiz,
  addQuestions,
  addAnswers,
  getQuizByUrl,
  getQuestionsForQuiz,
  getAnswersForQuiz,
  submitAttempt,
  getPublicQuizzes,
  getAttemptByUrl
};