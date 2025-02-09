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
