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
const createRoutes = require('./routes/create'); 
const resultsRoutes = require('./routes/results');
const homeRoutes = require('./routes/home');
const quizRoutes = require('./routes/quiz');
const publicRoutes = require('./routes/public');
// const viewQuizRoutes = require('./routes/viewQuiz')


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/quiz/create', createRoutes);
app.use('/results', resultsRoutes); 
app.use('/', homeRoutes);
app.use('/quiz', quizRoutes);
app.use('/public', publicRoutes);
// app.use('/viewQuiz', viewQuizRoutes);
// Note: mount other resources here, using the same pattern above

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
