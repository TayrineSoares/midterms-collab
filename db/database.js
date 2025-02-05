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
    .query(`INSERT INTO quizzes (title, privacy_setting, url, timestamp, number_of_questions) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [quiz.title, quiz.privacy_setting, url, quiz.timestamp, quiz.number_of_questions])
    .then((result) => {
      console.log(`Quiz added: `, result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Error adding quiz: ',err.message);
      throw err;
    });
}

const addQuestion = function (quizId, questionText) {
  return db
    .query(`INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING *`, [quizId, questionText])
    .then((result) => {
      console.log(`Questions added for quizID ${quizId}: `, result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('Error adding questions: ', err.message);
      throw err;
    });
}

const addAnswer = function (questionId, answerText, is_correct) {
  return db
    .query(`INSERT INTO answers (question_id, answer_text, is_correct) VALUES ($1, $2, $3) RETURNING *`, [questionId, answerText, is_correct])
    .then((result) => {
      console.log(`Answers added for questionID ${questionId}: `, result.rows)
      return result.rows;
    })
    .catch((err) => {
      console.log('Error adding answer: ', err.message)
      throw err;
    });
}

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
    .query(`INSERT INTO attempts (quiz_id, score, total_questions, url) VALUES ($1, $2, $3, $4) RETURNING *`, [attempt.quiz_id, attempt.score, attempt.totalQuestions, url])
    .then((result) => {
      console.log(`Submited Attempt: `, result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('Error submitting attempt: ', err.message);
      throw err;
    })
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
    .query(`SELECT * FROM attempts WHERE id = $1`, [attemptId])
    .then((result) => {
      console.log(`Attemp accessed: `, result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(`Error accessing attempt: `, err.message);
      throw err;
    })
};

// Retrieves all answers to a quiz attempt
const getAttemptAnswers = function (attemptId) {
  return db
    .query(`SELECT attempt_answers.id AS attempt_answer_id, questions.question AS question_text, answers.answer_text AS selected_answer, attempt_answers.is_correct AS answer_correctness
    FROM attempt_answers
    JOIN questions ON attempt_answers.question_id = questions.id
    JOIN answers ON attempt_answers.selected_answer_id = answers.id
    WHERE attempt_answers.attempt_id = $1`, [attemptId])
    .then((result) => {
      console.log(`Attempt answers retrieved: `, result.rows);
      return result.rowCount;
    })
    .catch((err) => {
      console.log(`Error retrieving attempt answers: `, err.message)
      throw err;
    })
};

module.exports = { 
  db,
  addQuiz,
  addQuestion,
  addAnswer,
  getQuizById,
  getQuestionForQuiz,
  getAnswerForQuestion,
  submitAttempt,
  submitAnswer,
  getAttemptById,
  getAttemptAnswers
};
