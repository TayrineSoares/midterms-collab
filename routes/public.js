const express = require('express');
const router = express.Router();
const { getPublicQuizzes } = require('../db/database'); // Importing the function

// GET route to fetch and display all public quizzes
router.get("/", (req, res) => {
  getPublicQuizzes()
    .then((quizzes) => {
      const templateVars = { quizzes }; // Pass quizzes data as a variable
      res.render("public", templateVars); // Render the EJS template with the data
    })
    .catch((err) => {
      console.error("Error fetching public quizzes:", err.message);
      res.status(500).send("Internal Server Error");
    });
});


module.exports = router;
