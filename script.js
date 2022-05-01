var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timeCounter = document.getElementById("timecounter");
var titleItem = document.getElementById("title-item");
var nextQuestions 
var questionAnswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentIndex = 0;
var score = 0;
var count = 75;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var timeinterval=document.getElementById("timeinterval")

var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
var questions = [
    {
        title: "Commonly used data type Do Not include ___",
        choices: ["strings","booleance","alerts", "numbers"],
        answer : "alerts"    
    },
    {
        title: "The condition in an if/else statement is enclosed within ___",
        choices: ["quotes","Curly brackets","parentheses", "square brackets"],
        answer : "parentheses"    
    },
    {
        title: "Arrays in JavaScript can be used to store ___",
        choices: ["numbers and strings","others Arrays","booleances", "all of the above"],
        answer : "all of the above"    
    },
    {
        title: "String values must be enclosed within ___ when being assigned to variables ",
        choices: ["commas","curly brackets","quotes","parentheses"],
        answer : "quotes"    
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is___",
        choices: ["JavaScript","terminal/bash","alerts", "console.log"],
        answer : "console.log"    
    },
]
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timeCounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentIndex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gameTime()
    document.getElementById('btn-start').style.display ="none"
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});


function gameTime(){
var timeinterval = setInterval(function(){
    timer.innerText = count
    count--;
    if (count <= 0) {
        endGame()
        document.getElementById('timecounter').style.display ="none"
        clearInterval(timeinterval)
    }

     
    
},1000);

 
}

function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question){
    titleItem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    questionAnswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentIndex++
    if(currentIndex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionAnswers.innerHTML=""
        if(currentIndex < questions.length){    
            nextQuestions= questions[currentIndex]
            displayQuestion(nextQuestions)  
        }else {
            currentIndex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endGame()
        

    }
    
     
}
function correction(response){
    
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
function endGame (){
    myScore.innerText = count
    addscore.classList.remove("d-none")
    timeCounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")
    document.getElementById("addscore").style.display="block"
    clearInterval(timeinterval)
}

