const questionText = document.querySelector('.questionText')
const questionOptions = document.querySelector('.questionOptions')
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")

let questionCounter = 0
let currentQuestion
let availableQuestion = []
let availableOptions = []
let corretas = 0
let tentativas = 0

function setAvailableQuestion(){
    const totalQuestion = quiz.length

    for(var i = 0; i<totalQuestion; i++){
        availableQuestion.push(quiz[i])
    }
}

function getNewQuestion(){
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
    currentQuestion = questionIndex
    questionText.innerHTML = currentQuestion.q

    const index1 = availableQuestion.indexOf(questionIndex)
    availableQuestion.splice(index1, 1)

    const optionLen = currentQuestion.options.length

    for(let i = 0; i<optionLen; i++){
        availableOptions.push(i)
    }

    questionOptions.innerHTML = ''

    for(let i = 0; i<optionLen; i++){
        const optionIndex2 = availableOptions[Math.floor(Math.random() * availableOptions.length)]
        const index2 = availableOptions.indexOf(optionIndex2)
        availableOptions.splice(index2, 1)

        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[optionIndex2]
        option.id = optionIndex2
        option.className= "option"
        questionOptions.appendChild(option)

        option.setAttribute("onclick", "getResult(this)")
    }

    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id)

    if(id === currentQuestion.resposta){
        element.classList.add("correto")
        corretas++
    }
    else{
        element.classList.add("errado")
    }

    tentativas++
    unclickableOptions()
}

function unclickableOptions(){
    const optionLen = questionOptions.children.length

    for(let i = 0; i< optionLen; i++){
        questionOptions.children[i].classList.add("respondida")
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("over")
        quizOver()
    }
    else{
        getNewQuestion()
    }
}

function quizOver(){
    quizBox.classList.add("hide")

    resultBox.classList.remove("hide")
    quizResult()
}

function quizResult(){
    resultBox.querySelector(".name-player").innerHTML = localStorage.getItem("nome")
    resultBox.querySelector(".total-question").innerHTML = corretas
}

window.onload = function(){
    setAvailableQuestion()
    getNewQuestion()
}