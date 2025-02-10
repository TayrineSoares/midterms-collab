DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS attempts CASCADE;
DROP TABLE IF EXISTS attempt_answers;

-- Create quizzes table
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  privacy_setting BOOLEAN NOT NULL,
  url TEXT NOT NULL UNIQUE
);

-- Create questions table, referencing quizzes
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL
);

-- Create answers table, referencing questions
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL
);

-- Create attempts table, referencing quizzes
CREATE TABLE attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL, -- Number of correct answers
  total_questions INTEGER NOT NULL, -- Total number of questions in the quiz
  url TEXT NOT NULL UNIQUE -- Unique URL for the attempt results
);