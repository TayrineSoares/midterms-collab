INSERT INTO quizzes (title, privacy_setting, date_created, url, number_of_questions)
VALUES
 1 ('Math Quiz', TRUE, '2023-10-01', 'https://example.com/quiz/1', 5),
 2 ('Science Quiz', FALSE, '2023-10-02', 'https://example.com/quiz/2', 7);

INSERT INTO questions (quiz_id, question, correct_answer_id)
VALUES
 1 (1, 'What is 2 + 2?', 1), -- Quiz 1, Question 1
 2 (1, 'What is 3 * 3?', 5), -- Quiz 1, Question 2
 3 (2, 'What is the chemical symbol for water?', 9), -- Quiz 2, Question 1
 4 (2, 'What planet is known as the Red Planet?', 13); -- Quiz 2, Question 2

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

INSERT INTO attempts (quiz_id, score, total_questions, url)
VALUES
  (1, 4, 5, 'https://example.com/attempt/1'), -- Attempt on Quiz 1
  (2, 6, 7, 'https://example.com/attempt/2'); -- Attempt on Quiz 2

INSERT INTO attempt_answers (attempt_id, question_id, selected_answer_id, is_correct)
VALUES
  -- Attempt 1 (Quiz 1)
  (1, 1, 1, TRUE), -- Selected correct answer for Question 1
  (1, 2, 6, FALSE), -- Selected incorrect answer for Question 2

  -- Attempt 2 (Quiz 2)
  (2, 3, 9, TRUE), -- Selected correct answer for Question 3
  (2, 4, 13, TRUE); -- Selected correct answer for Question 4