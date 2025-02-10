-- Insert quizzes
INSERT INTO quizzes (title, privacy_setting, url)
VALUES
  ('Math Quiz', TRUE, 'lw7df8'),
  ('Science Quiz', FALSE, '8wj87t');

-- Insert questions for quizzes
INSERT INTO questions (quiz_id, question)
VALUES
  (1, 'What is 2 + 2?'), -- Quiz 1, Question 1
  (1, 'What is 3 * 3?'), -- Quiz 1, Question 2
  (2, 'What is the chemical symbol for water?'), -- Quiz 2, Question 1
  (2, 'What planet is known as the Red Planet?'); -- Quiz 2, Question 2

-- Insert answers for questions
INSERT INTO answers (question_id, answer_text, is_correct)
VALUES
  -- Answers for Quiz 1, Question 1
  (1, '4', TRUE), -- Correct answer
  (1, '5', FALSE),
  (1, '6', FALSE),
  (1, '7', FALSE),
  -- Answers for Quiz 1, Question 2
  (2, '9', TRUE), -- Correct answer
  (2, '6', FALSE),
  (2, '12', FALSE),
  (2, '15', FALSE),
  -- Answers for Quiz 2, Question 1
  (3, 'H2O', TRUE), -- Correct answer
  (3, 'CO2', FALSE),
  (3, 'NaCl', FALSE),
  (3, 'O2', FALSE),
  -- Answers for Quiz 2, Question 2
  (4, 'Mars', TRUE), -- Correct answer
  (4, 'Venus', FALSE),
  (4, 'Jupiter', FALSE),
  (4, 'Saturn', FALSE);

-- Insert attempts
INSERT INTO attempts (quiz_id, score, total_questions, url)
VALUES
  (1, 2, 2, 'r5t66y'), -- Attempt on Quiz 1 (2 correct out of 2)
  (2, 1, 2, '3f5gtt'); -- Attempt on Quiz 2 (1 correct out of 2)