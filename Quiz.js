const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
//make an arry of objects it's story question and answer
const quiz = [
    {
        question: "Q. Which is a capital of INDIA?",
        choices: ["Delhi","Pune","Nagpur","mumbai"],
        answer: "Delhi"
    },
    {
        question: "Q. Which is Local Language of INDIA?",
        choices: ["Telgu","Hindi","English","Marathi"],
        answer: "Hindi"
    },
    {
        question: "Q. Which city Known as Pink City of INDIA?",
        choices: ["Alahbad","Udaypur","Jaypur","Ajmer"],
        answer: "Jaypur"
    },
    {
        question: "Q. Which is Film city of INDIA?",
        choices: ["Delhi","Pune","Nagpur","mumbai"],
        answer: "mumbai"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizover = false;
const showQuestion = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if(choiceDiv.classList.contains('selected'))
            {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        })
    }
}

//check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("correct answer");
        displayAlert("Correct answer");
        alert.style.backgroundColor = "#5d9b63";
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong answer! ${quiz[currentQuestionIndex].answer} is a Correct answer.`);
        alert.style.backgroundColor = "#f85032";
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestion();
    }
    else {
        showScore();
        quizover = true;
    }
}

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Score ${score} out of ${quiz.length}!`;
    displayAlert("you have complete this quiz!");
    nextBtn.textContent = "Play Again";
}

const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    },2000);
}

showQuestion();
nextBtn.addEventListener('click',() => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        alert.style.backgroundColor = "#fedb68";
        alert.style.color = "black";
        displayAlert("Select your Answer !");
        return;
    }
    if(quizover){
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        showQuestion();
        quizover = false;
        score = 0;
    }
    else{
    checkAnswer();
    }
    
});