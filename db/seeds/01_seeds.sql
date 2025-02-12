-- Insert quizzes
INSERT INTO quizzes (title, privacy_setting, url)
VALUES
  ('Math Quiz', FALSE, '9wh5k1'),
  ('Science Quiz', FALSE, '101ur7'),
  ('History Quiz', FALSE, 'a7x3l9'),
  ('Geography Quiz', FALSE, 'b2k4p8'),
  ('Literature Quiz', TRUE, 'f8v2o7'),
  ('Art Quiz', FALSE, 'x3z9c6');

-- Insert questions for quizzes
INSERT INTO questions (quiz_id, question)
VALUES
  -- Math Quiz
  (1, 'What is 2 + 2?'),
  (1, 'What is 3 * 3?'),
  (1, 'What is 5 - 2?'),
  (1, 'What is 6 / 2?'),
  (1, 'What is 7 * 8?'),

  -- Science Quiz
  (2, 'What is the chemical symbol for water?'),
  (2, 'What planet is known as the Red Planet?'),
  (2, 'What is the chemical formula for salt?'),
  (2, 'What gas do plants absorb during photosynthesis?'),
  (2, 'What is the boiling point of water in Celsius?'),

  -- History Quiz
  (3, 'Who was the first president of the United States?'),
  (3, 'In what year did World War II end?'),
  (3, 'Who was the first emperor of China?'),
  (3, 'What empire was led by Julius Caesar?'),
  (3, 'Which country was known as the Soviet Union?'),

  -- Geography Quiz
  (4, 'What is the capital of France?'),
  (4, 'Which continent is Egypt located on?'),
  (4, 'What is the longest river in the world?'),
  (4, 'Which country has the most islands?'),
  (4, 'What is the tallest mountain in the world?'),

  -- Literature Quiz
  (5, 'Who wrote "Romeo and Juliet"?'),
  (5, 'What is the name of the wizard school in "Harry Potter"?'),
  (5, 'Who wrote "1984"?'),
  (5, 'What is the title of the first "Lord of the Rings" book?'),
  (5, 'Who wrote "Pride and Prejudice"?'),

  -- Art Quiz
  (6, 'Who painted the Mona Lisa?'),
  (6, 'What is the name of the famous statue created by Michelangelo?'),
  (6, 'In what city is the Louvre Museum located?'),
  (6, 'Which artist is known for the "Starry Night" painting?'),
  (6, 'What famous art movement did Pablo Picasso help pioneer?');

-- Insert answers for questions
INSERT INTO answers (question_id, answer_text, is_correct)
VALUES
  -- Math Quiz Answers
  (1, '4', TRUE),
  (1, '5', FALSE),
  (1, '6', FALSE),
  (1, '7', FALSE),

  (2, '9', TRUE),
  (2, '6', FALSE),
  (2, '12', FALSE),
  (2, '15', FALSE),

  (3, '3', TRUE),
  (3, '2', FALSE),
  (3, '1', FALSE),
  (3, '4', FALSE),

  (4, '3', TRUE),
  (4, '2', FALSE),
  (4, '1', FALSE),
  (4, '4', FALSE),

  (5, '56', TRUE),
  (5, '48', FALSE),
  (5, '72', FALSE),
  (5, '64', FALSE),

  -- Science Quiz Answers
  (6, 'H2O', TRUE),
  (6, 'CO2', FALSE),
  (6, 'NaCl', FALSE),
  (6, 'O2', FALSE),

  (7, 'Mars', TRUE),
  (7, 'Venus', FALSE),
  (7, 'Jupiter', FALSE),
  (7, 'Saturn', FALSE),

  (8, 'NaCl', TRUE),
  (8, 'H2O', FALSE),
  (8, 'O2', FALSE),
  (8, 'CO2', FALSE),

  (9, 'CO2', TRUE),
  (9, 'O2', FALSE),
  (9, 'N2', FALSE),
  (9, 'H2O', FALSE),

  (10, '100°C', TRUE),
  (10, '90°C', FALSE),
  (10, '110°C', FALSE),
  (10, '120°C', FALSE),

  -- History Quiz Answers
  (11, 'George Washington', TRUE),
  (11, 'Abraham Lincoln', FALSE),
  (11, 'Thomas Jefferson', FALSE),
  (11, 'John Adams', FALSE),

  (12, '1945', TRUE),
  (12, '1939', FALSE),
  (12, '1942', FALSE),
  (12, '1950', FALSE),

  (13, 'Qin Shi Huang', TRUE),
  (13, 'Genghis Khan', FALSE),
  (13, 'Napoleon Bonaparte', FALSE),
  (13, 'Alexander the Great', FALSE),

  (14, 'Roman Empire', TRUE),
  (14, 'Byzantine Empire', FALSE),
  (14, 'Ottoman Empire', FALSE),
  (14, 'Mongol Empire', FALSE),

  (15, 'Russia', TRUE),
  (15, 'China', FALSE),
  (15, 'United States', FALSE),
  (15, 'Germany', FALSE),

  -- Geography Quiz Answers
  (16, 'Paris', TRUE),
  (16, 'London', FALSE),
  (16, 'Rome', FALSE),
  (16, 'Berlin', FALSE),

  (17, 'Africa', TRUE),
  (17, 'Asia', FALSE),
  (17, 'Europe', FALSE),
  (17, 'North America', FALSE),

  (18, 'Nile River', TRUE),
  (18, 'Amazon River', FALSE),
  (18, 'Yangtze River', FALSE),
  (18, 'Mississippi River', FALSE),

  (19, 'Sweden', TRUE),
  (19, 'Australia', FALSE),
  (19, 'Canada', FALSE),
  (19, 'Finland', FALSE),

  (20, 'Mount Everest', TRUE),
  (20, 'K2', FALSE),
  (20, 'Kangchenjunga', FALSE),
  (20, 'Makalu', FALSE),

  -- Literature Quiz Answers
  (21, 'William Shakespeare', TRUE),
  (21, 'Charles Dickens', FALSE),
  (21, 'Jane Austen', FALSE),
  (21, 'Mark Twain', FALSE),

  (22, 'Hogwarts', TRUE),
  (22, 'Beauxbatons', FALSE),
  (22, 'Durmstrang', FALSE),
  (22, 'Ilvermorny', FALSE),

  (23, 'George Orwell', TRUE),
  (23, 'Aldous Huxley', FALSE),
  (23, 'Ray Bradbury', FALSE),
  (23, 'J.R.R. Tolkien', FALSE),

  (24, 'The Fellowship of the Ring', TRUE),
  (24, 'The Two Towers', FALSE),
  (24, 'Return of the King', FALSE),
  (24, 'The Hobbit', FALSE),

  (25, 'Jane Austen', TRUE),
  (25, 'Emily Brontë', FALSE),
  (25, 'Charlotte Brontë', FALSE),
  (25, 'Virginia Woolf', FALSE),

  -- Art Quiz Answers
  (26, 'Leonardo da Vinci', TRUE),
  (26, 'Vincent van Gogh', FALSE),
  (26, 'Pablo Picasso', FALSE),
  (26, 'Claude Monet', FALSE),

  (27, 'David', TRUE),
  (27, 'The Thinker', FALSE),
  (27, 'Venus de Milo', FALSE),
  (27, 'The Kiss', FALSE),

  (28, 'Paris', TRUE),
  (28, 'London', FALSE),
  (28, 'New York', FALSE),
  (28, 'Rome', FALSE),

  (29, 'Vincent van Gogh', TRUE),
  (29, 'Pablo Picasso', FALSE),
  (29, 'Claude Monet', FALSE),
  (29, 'Salvador Dalí', FALSE),

  (30, 'Cubism', TRUE),
  (30, 'Impressionism', FALSE),
  (30, 'Surrealism', FALSE),
  (30, 'Baroque', FALSE);

-- Insert attempts
INSERT INTO attempts (quiz_id, score, total_questions, url)
VALUES
  (1, 2, 5, '19de72'),
  (2, 1, 5, 'dd82je'),
  (3, 4, 5, 'k1l5m9'),
  (4, 3, 5, 's7d2h1'),
  (5, 5, 5, 'f8v2q7'),
  (6, 2, 5, 'x3z9p0');
