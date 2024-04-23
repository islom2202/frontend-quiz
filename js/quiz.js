// theme switcher
import switchTheme from "./utils/switcher.js"
document.querySelector(".js-theme-toggler").onclick = () => switchTheme()

saveData().then(() => generateHeader()).then(() => generateBody())

// save data (in current quiz variable)
let currentQuiz;
async function saveData(){
    let res = await fetch("data.json")
    let data = await res.json()
    currentQuiz = data.quizzes.find((item) => item.title == localStorage.getItem("quiz"))
}

// generate html
let questionIndex = 0
let correctAnswers = 0
function generateHeader(){
  const quizIcon = document.querySelector(".js-quiz-icon")
  const quizName = document.querySelector(".js-quiz-name")
  quizIcon.src = currentQuiz.icon
  quizName.textContent = currentQuiz.title
}
function generateBody(){
  const quizHTML = document.querySelector(".quiz")
  quizHTML.innerHTML = `
   <div class="quiz__left">
      <div class="quiz__left__content">
        <p>
          Question <span class="js-current-question">${
            questionIndex + 1
          }</span> of <span class="js-all-questions">
          ${currentQuiz.questions.length}</span>
        </p>
        <h3>${currentQuiz.questions[questionIndex].question}</h3>
      </div>
      <div class="quiz__left__progress-bar">
        <span></span>
      </div>
    </div>
    <div class="quiz__options">
     ${generateOptions()}
      <button class="btn js-submit-btn">Submit Answer</button>
      <h4 class="submitPopup hidden">
        <img src="assets/icons/icon-incorrect.svg" alt="please-submit">
        Please select an answer
      </h4>
    </div>
  `
  function generateOptions(){
    return currentQuiz.questions[questionIndex].options.map((option, i) => 
      `<button class="quiz__options__option js-option box">
        <span class="variant">${['A', 'B', 'C', 'D'][i]}</span>
        <h4>${option}</h4>
      </button>`
    )
  }

  const options = document.querySelectorAll(".js-option")
  options.forEach((e) => (e.onclick = () => selectAnswer(options, e)))
  const submitBtn = document.querySelector(".js-submit-btn")
  submitBtn.onclick = (e) => submitBtn.innerText != "Next Question" ? submitAnswer(e) : nextQuestion(e)
}

// make generated html interactive
function selectAnswer(options, option) {
  options.forEach((e) => e.classList.remove("selected"))
  option.classList.add("selected")
}
function submitAnswer(e){
  const options = document.querySelectorAll(".js-option")
  let answerSelected = ifAnswerSelected();
  if(answerSelected){
     options.forEach((option) => {
       option.classList.remove("incorrect")
       option.classList.remove("correct")
       option.querySelector("img")?.remove()
       highlightSelected()
       hightlightAnswer()
       e.target.innerText = "Next Question"
       function highlightSelected() {
         if (option.classList.contains("selected")) {
           if (
             option.querySelector("h4").textContent !=
             currentQuiz.questions[questionIndex].answer
           ) {
             option.classList.add("incorrect")
             option.innerHTML += `<img src="assets/icons/icon-incorrect.svg" alt="incorrect">`
           }
           if (
             option.querySelector("h4").textContent ==
             currentQuiz.questions[questionIndex].answer
           ) {
             option.classList.add("correct")
             option.innerHTML += `<img src="assets/icons/icon-correct.svg" alt="correct">`
             correctAnswers++;
           }
         }
       }
       function hightlightAnswer() {
         if (
           option.querySelector("h4").textContent ==
           currentQuiz.questions[questionIndex].answer
         ) {
           option.classList.add("correct")
           option.innerHTML += `<img src="assets/icons/icon-correct.svg" alt="correct">`
         }
       }
     })
     const submitPopup = document.querySelector(".submitPopup")
     submitPopup.classList.add("hidden")
  }else{
    const submitPopup = document.querySelector(".submitPopup")
    submitPopup.classList.remove('hidden')
  }
  function ifAnswerSelected() {
    for (let i = 0; i < options.length; i++) {
      if (options[i].classList.contains("selected")) {
        return true
      }
    }
    return false
  }
}
function nextQuestion(e){
  if(questionIndex < currentQuiz.questions.length){
    questionIndex += 1
    generateBody()
    e.target.innerText = `Submit Answer`
  }else{
    let results = {
      correctAnswers,
      questionsQuantity: currentQuiz.questions.length
    }
    e.target.innerText = `See Results`
    localStorage.setItem('scores', JSON.stringify(results))
    window.location.href = "result.html"
  }
}


















// let num = -1
// let arr = [1,2,3]
// let currIndex = arr[num]
// const defineCurrentIndex = () => currIndex = arr[num]
// const increaseIndex = () => {
//   num += 1;
//   return defineCurrentIndex()
// } 
// console.log(increaseIndex());
// console.log(increaseIndex())
// console.log(increaseIndex())

