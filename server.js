// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');



const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
<<<<<<< HEAD
const quizroutes = require('./routes/quiz');
const createRoutes_questions = require('./routes/create-questions');
const createRoutes_answers = require('./routes/create-answers');
=======
const createRoutes = require('./routes/create'); 
>>>>>>> 87d6a54e086b715cd50b3fa556879cacaae11742
const resultsRoutes = require('./routes/results');
const publicRoutes = require('./routes/public');
const homeRoutes = require('./routes/home');
const quizRoutes = require('./routes/quizRoutes');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
<<<<<<< HEAD
app.use('/quiz', quizroutes)
app.use('/results', resultsRoutes);  // Results related routes
app.use('/public', publicRoutes);  // Public quizzes routes
app.use('/home', homeRoutes);
app.use('/create-questions',createRoutes_questions);
app.use('/create-answers', createRoutes_answers);
=======
app.use('/create-quiz', createRoutes);
app.use('/results', resultsRoutes); 
app.use('/public', publicRoutes); 
app.use('/', homeRoutes);
app.use('/quiz', quizRoutes);
>>>>>>> 87d6a54e086b715cd50b3fa556879cacaae11742
// Note: mount other resources here, using the same pattern above

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
