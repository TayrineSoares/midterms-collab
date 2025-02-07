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
  url TEXT NOT NULL UNIQUE,
  number_of_questions INTEGER NOT NULL
);

-- Create questions table first, referencing quizzes
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
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  url TEXT NOT NULL
);

-- Create attempt_answers table, referencing attempts and questions
CREATE TABLE attempt_answers (
  id SERIAL PRIMARY KEY,
  attempt_id INTEGER REFERENCES attempts(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL
);