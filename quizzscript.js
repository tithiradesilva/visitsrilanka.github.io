const questions = [     //Adding questions in to an Array called questions with 2 main 
    {
        question: "what is the longest river in Sri Lanka?",
        answers: [
            { text: " Gin Ganga",correct: false},
            { text: " Mahaweli Ganga",correct: true},
            { text: " Malwathu Oya",correct: false},
            { text: " Kala Oya",correct: false},
        ]
    },
    {
        question: "what is the currency of Sri Lanka ?",
        answers: [
            { text: "US Dollar (USD)",correct: false},
            { text: "Sri Lankan Rupees (LKR)",correct: true},
            { text: "Euro (EUR)",correct: false},
            { text: "Pound Sterling (GBP)",correct: false},
        ]
    },
    {
        question: "what is the capital city of Sri Lanka ?",
        answers: [
            { text: "Anuradhapura",correct: false},
            { text: "Kandy",correct: false},
            { text: "Colombo",correct: true},
            { text: "Galle",correct: false},
        ]
    },{
        question: "In what province sigiriya is located ?",
        answers: [
            { text: "Southern Province",correct: true},
            { text: "North Provice",correct: false},
            { text: "Western Province",correct: false},
            { text: "Easten Province",correct: false},
        ]
    },
    {
        question: "what is the main International Airport in Sri Lanaka ?",
        answers: [
            { text: "Colombo International Airport",correct: false},
            { text: "Bandaranaike International Airport",correct: true},
            { text: "Mattala International airport",correct: false},
            { text: "Jaffna International Airport",correct: false},
        ]
    },
    {
        question: "what is the national flower in Sri Lanka ? ",
        answers: [
            { text: " Jasmine",correct: false},
            { text: " blue water Lily",correct: true},
            { text: " Rose",correct: false},
            { text: " lotus",correct: false},
        ]
    },
    {
        question: "What is the tallest tower in South Asia ?",
        answers: [
            { text: "Ramgarh TV Tower, India",correct: false},
            { text: "Lotus Tower, Sri Lanka",correct: true},
            { text: "Kokavil Transmission Tower, Sri Lanka",correct: false},
            { text: "Guoco Tower, Singapore",correct: false},
        ]
    },
    {
        question: "What is the current population of Sri Lanka ?",
        answers: [
            { text: "19.0 Million",correct: false},
            { text: "30.0 Million",correct: false},
            { text: "22.16 Million",correct: true},
            { text: "10.0 Million",correct: false},
        ]
    },{
        question: "Where is Sri Lanka Tourism Development Authority located ?",
        answers: [
            { text: "Galle Rd, Colombo",correct: true},
            { text: "Sri Wickrama Rajasinghe Rd, Kandy",correct: false},
            { text: "47th Lane A, Colombo",correct: false},
            { text: "Sir James Pieris Rd, Colombo",correct: false},
        ]
    },
    {
        question: "What is the highest mountain in Sri Lanka? ?",
        answers: [
            { text: "Hakgala Mountain",correct: false},
            { text: "Piduruthalagala Mountain",correct: true},
            { text: "Kirigalpotta Mountain",correct: false},
            { text: "Thotupola Mountain",correct: false},
        ]
    }
];

//Assigning variables
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".buttons .quit");
const continue_btn = rules_box.querySelector(".buttons .restart");
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answerbuttons")
const NextButton = document.getElementById("nextbutton")
const main = document.querySelector(".main");
const timerElement = document.createElement("div");
//Initializing variables to 0
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeElapsed = 0;


rules_box.classList.add("activeInfo");               // Displays the Rules
main.style.display = "none";                         // Hides the main

exit_btn.onclick = ()=>{
    rules_box.classList.remove("activeInfo");        
    window.location.reload(); 
}

continue_btn.onclick = ()=>{                         // If the continue button clicked
    rules_box.classList.remove("activeInfo");        // hides rules box
    main.style.display = "block";                    // Displays the main Quiz
    startQuiz();                                     // Running the function start Quiz
}

function startQuiz(){                                // Function to start the Quiz
    currentQuestionIndex =0;
    score =0;
    NextButton.innerHTML ="Next";
    timeElapsed = 0; 
    showQuestion();                                  // Calling showQuestion function to Show the Questions
    startTimer();                                    // Calling startTimer to start the timer
}

function showQuestion(){                             // Function to show the Question
    resetState();                                    // Calling the function to take care of the Next Button
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " / " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {      // Creating Answer Buttons
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Function to hide the Next button before enters an Answer.
function resetState(){
    NextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// Funtion to Get the Answer and Show the Colors of Answers
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    NextButton.style.display ="block";
}
// Function to calculate the Marks
function calculatePercentage(score, totalQuestions) {
    return (score / totalQuestions) * 100;
}
  
// Function to show the Score box
function showScore() {
    resetState();           
    stopTimer();           // Function to stop the Timer
    const percentage = calculatePercentage(score, questions.length);
    const numWrongQuestions = questions.length - score;
    questionElement.innerHTML = `CONGRADULATIONS !!!<br>You have scored ${score} out of ${questions.length}
    !<br>Your Percentage: ${percentage.toFixed(2)}%<br>Time taken: ${formatTime(timeElapsed)}
    <br>There are ${numWrongQuestions} wrong questions.`;
    NextButton.innerHTML = "Play Again";                // Display Play Again Button
    NextButton.style.display = "block";
    NextButton.addEventListener("click", () => {        // When the Next Button clicked
      window.location.reload(); 
    });
// Showing grades with colors according to percentages  
    let message;  
    let color;
  
    if (percentage >= 80) {
      message = "Good";
      color = "green";
    } else if (percentage >= 60) {
      message = "Average";
      color = "orange";
    } else if (percentage >= 40) {
      message = "Not Bad";
      color = "gold";
    } else {
      message = "Bad";
      color = "red";
    }
  
    questionElement.innerHTML += `<br><span style="color: ${color};">${message}</span>`;
}
  

// Function to do to move to the next Question
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
// Function to do to the Next Button
NextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
// When the continue button clicked,
continue_btn.addEventListener("click", () => {
    rules_box.style.display = "none";
});
// When the Exit Button clicked
const quitBtn = document.querySelector(".quit");
    quitBtn.addEventListener("click", () => {
      window.location.href = "Tourism.html";
});

// Function to stop the timer  
function stopTimer() {
    clearInterval(timerInterval);
}
// Function to format the time with seconds   
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
// Function to Start Timer until .60 Seconds  
function startTimer() {
    timerInterval = setInterval(() => {
      timeElapsed++;
      timerElement.innerText = formatTime(timeElapsed);
  
      if (timeElapsed >= 60) {
        clearInterval(timerInterval);
        handleQuizSubmit();
      }
    }, 1000);
}
// Function to Auto Submit teh Quiz
function handleQuizSubmit() {
    Array.from(answerButtons.children).forEach((button) => {
      button.disabled = true;
    });
  
    showScore();
}

// Adding timer to the main and to the Show Score Box
main.insertBefore(timerElement, main.firstChild);
main.appendChild(timerElement);

