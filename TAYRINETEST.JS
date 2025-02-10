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





// <!-- HARD CODING QUESTIONS FOR LAYOUT PURPOSES-->
// <section class="all-questions">

//   <!-- First Question -->
//   <div class="question">
//     <h3>Question 1: Bacon ipsum dolor amet spare ribs tenderloin doner ground round. </h3>

//     <!-- Answer 1 -->
//     <!-- ASSUMING THIS IS THE CORRECT ANSWER-->
//     <div class="answer-options correct-answer">
//       <input type="radio" class="answer-radio" name="question-1"  value="answer-1" id="answer-1-1" checked/>
//       <p>T-bone jowl reprehenderit ipsum picanha.</p>
//     </div>

//     <!-- Answer 2 -->
//     <div class="answer-options">
//       <input type="radio" class="answer-radio" name="question-1"  value="answer-2" id="answer-1-2" />
//       <p>T-bone jowl reprehenderit ipsum picanha.</p>
//     </div>

//     <!-- Answer 3 -->
//     <div class="answer-options">
//       <input type="radio" class="answer-radio" name="question-1"  value="answer-3" id="answer-1-3" />
//       <p>T-bone jowl reprehenderit ipsum picanha.</p>
//     </div>

//     <!-- Answer 4 -->
//     <div class="answer-options">
//       <input type="radio" class="answer-radio" name="question-1"  value="answer-4" id="answer-1-4" />
//       <p>T-bone jowl reprehenderit ipsum picanha.</p>
//     </div>
//   </div>
