// I AM GOING TO DELETE THIS FILE AT THE END OF THE PROJECT


// How back end receives info from the questions form
// we could use array indexes to match questions and answers
// questions[0] = Question 1; answers[0] = Answers for Question 1


{
  questions: [
    "What is the capital of France?",  // Question 1
    "What is the largest planet?",    //  Question 2
  ],


  answers: [
    {
      answer1: "Paris", // Answer 1 for Question 1
      answer2: "Berlin",
      answer3: "Madrid",
      answer4: "Rome",
      correct: "answer1"  // Correct answer for Question 1 (selected answer)
    },

    {
      answer1: "Jupiter", // Answer 1 for Question 2
      answer2: "Saturn",
      answer3: "Mars",
      answer4: "Earth",
      correct: "answer1"   // Correct answer for Question 2 (selected answer)
    },
  ]
}




// object from quiz attemp form
{
  question_0: 'Q1A',
  question_1: 'Q3C',
  question_2: 'Q2B',
  question_3: 'Q5C',
  question_4: 'Q4C'
}




// <!-- Display Questions and Answers -->
// <div class="all-questions"></div>
//   <% questions_and_answers.forEach((qa, index) => { %>
//     <div class="question">
//       <h2>Question <%= index + 1 %>: <%= qa.question %></h2>
//       <ul>
//         <% qa.answers.forEach((answer) => { %>
//           <li>
//             <%= answer.answer_text %>
//             <% if (answer.is_correct) { %>
//               <span class="correct-answer">(Correct)</span>
//             <% } %>
//           </li>
//         <% }) %>
//       </ul>
//     </div>
//   <% }) %>
// </div>




// <!-- Quiz 1 -->
// <div class="quiz-card">
//   <h2>Quiz 1</h2>
//   <!-- CHANGE THIS TO FETCH QUIZ UNIQUE URL-->
//   <a href="/quiz/1" class="quiz-btn">Take Quiz</a>
// </div>


// <!-- Quiz 2 -->
// <div class="quiz-card">
//   <h2>Quiz 2</h2>
//   <!-- CHANGE THIS TO FETCH QUIZ UNIQUE URL-->
//   <a href="/quiz/2" class="quiz-btn">Take Quiz</a>
// </div>

//  <!-- Quiz 3 -->
//  <div class="quiz-card">
//   <h2>Quiz 3</h2>
//   <!-- CHANGE THIS TO FETCH QUIZ UNIQUE URL-->
//   <a href="/quiz/2" class="quiz-btn">Take Quiz</a>
// </div>
