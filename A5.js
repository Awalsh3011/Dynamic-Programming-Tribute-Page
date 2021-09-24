// slideshow of Michelles quotes//

//using an index to go though each slide//
var slideIndex = 1;
showSlides(slideIndex);
//having functions to show pluseslides and current slide and then show slides
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


// having all the questions in the var stored//
var myQuestions = [
  {question: "What year did Michelle become First Lady of the United States?",
    answers: {
      a: '2009',
      b: '2008',
      c: '2010'},
    correctAnswer: 'a'},
  {question: "How many times was Michelle on the cover of Vogue Magazine?",
    answers: {
      a: '4',
      b: '3',
      c: '6'},
    correctAnswer: 'b' },
  { question: "Michelle graduated Harvard University with what degree?",
    answers: {
      a: 'sociology',
      b: 'pyschology',
      c: 'law' },
    correctAnswer: 'a'},
  { question: "How many people have beneifited from Michelles 'Lets Move' campaign?",
    answers: {
      a: 'over 51 million',
      b: 'over 101 million',
      c: 'over 81 Million'},
    correctAnswer: 'c'},
  { question: "What age is Michelle Obama?",
    answers: {
      a: '59',
      b: '57',
      c: '60'},
    correctAnswer: 'b' },
]
//three variables with the quiz, results and submit button//
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

//function to generate the quiz//
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
  function showQuestions(questions, quizContainer){
    // a place to store the output and the answer choices
    var output = [];
    var answers;
    // for each question...
    for(var i=0; i<questions.length; i++){
      // first reset the list of answers
      answers = [];
      // for each available answer...
      for(letter in questions[i].answers){
        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }
      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }
    // finally combine output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  function showResults(questions, quizContainer, resultsContainer){  
    // gather answer containers from quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    // for each question...
    for(var i=0; i<questions.length; i++){
      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      // if answer is correct and it equals the correc answer
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }
    // show number of correct answers out of total and the correct answers for each question
    resultsContainer.innerHTML = 'You got '+ numCorrect +' out of '+ questions.length +' correct!' +
     '    The correct answers were: 1. A)2009     2. B)3   3. A) Sociology   4. C) Over 81 million   5. B) 57';
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}