// utils
import switchTheme from "./utils/switcher.js"
import navigateToMenu from "./utils/toMenu.js"
document.querySelector(".js-theme-toggler").onclick = () => switchTheme()
document.querySelector(".js-quiz-label").onclick = () => navigateToMenu()

// check session storage for theme mode
if(sessionStorage.getItem("dark")){
  document.querySelector("body").classList.add("dark")
  document.querySelector(".js-theme-toggler").checked = true
}else{
  document.querySelector("body").classList.remove("dark")
  document.querySelector(".js-theme-toggler").checked = false
}

saveData()
  .then(() => generateHeader())
  .then(() => generateBody())

// save data (in current quiz variable)
let currentQuiz
async function saveData() {
  let res = await fetch("data.json")
  let data = await res.json()
  currentQuiz = data.quizzes.find(
    (item) => item.title == sessionStorage.getItem("quiz")
  )
}

// generate html
let questionIndex = 0
let correctAnswers = 0
function generateHeader() {
  const quizIcon = document.querySelector(".js-quiz-icon")
  const quizName = document.querySelector(".js-quiz-name")
  quizIcon.src = currentQuiz.icon
  quizName.textContent = currentQuiz.title
}
function generateBody() {
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
        <span class="js-progress-bar"></span>
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
  function generateOptions() {
    // randomize options
    currentQuiz.questions[questionIndex].options.sort(
      (_) => Math.random() - 0.5
    )
    return currentQuiz.questions[questionIndex].options.map(
      (option, i) =>
        `<button class="quiz__options__option js-option box">
        <span class="variant">${["A", "B", "C", "D"][i]}</span>
        <h4>${option}</h4>
      </button>`
    )
  }

  const options = document.querySelectorAll(".js-option")
  options.forEach((e) => (e.onclick = () => selectAnswer(options, e)))
  const submitBtn = document.querySelector(".js-submit-btn")
  submitBtn.onclick = (e) => {
    submitBtn.textContent != "Next Question" &&
    submitBtn.textContent != "See Results"
      ? submitAnswer(e)
      : nextQuestion()
  }
  const progressBar = document.querySelector(".js-progress-bar")
  progressBar.style.width = `${
    questionIndex / (currentQuiz.questions.length * 0.01)
  }%`
}

// make html interactive
function selectAnswer(options, option) {
  options.forEach((e) => e.classList.remove("selected"))
  option.classList.add("selected")
}
function submitAnswer(e) {
  const options = document.querySelectorAll(".js-option")
  let answerSelected = ifAnswerSelected()
  if (answerSelected) {
    options.forEach((option) => {
      option.classList.remove("incorrect")
      option.classList.remove("correct")
      option.querySelector("img")?.remove()
      highlightSelected()
      hightlightAnswer()
      e.target.textContent =
        questionIndex < currentQuiz.questions.length - 1
          ? "Next Question"
          : "See Results"

      function highlightSelected() {
        if (option.classList.contains("selected")) {
          if (
            option.querySelector("h4").innerHTML !=
            currentQuiz.questions[questionIndex].answer
          ) {
            option.classList.add("incorrect")
            option.innerHTML += `<img src="assets/icons/icon-incorrect.svg" alt="incorrect">`
          }
          if (
            option.querySelector("h4").innerHTML ==
            currentQuiz.questions[questionIndex].answer
          ) {
            option.classList.add("correct")
            option.innerHTML += `<img src="assets/icons/icon-correct.svg" alt="correct">`
            correctAnswers++
          }
        }
      }
      
      function hightlightAnswer() {
        if (
          option.querySelector("h4").innerHTML ==
          currentQuiz.questions[questionIndex].answer
        ) {
          option.classList.add("correct")
          option.innerHTML += `<img src="assets/icons/icon-correct.svg" alt="correct">`
        }
      }
    })
    document.querySelector(".submitPopup").classList.add("hidden")
  } else {
    document.querySelector(".submitPopup").classList.remove("hidden")
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
function nextQuestion() {
  if (questionIndex < currentQuiz.questions.length - 1) {
    questionIndex += 1
    generateBody()
  } else seeResults()
}
function seeResults() {
  sessionStorage.setItem("scores", correctAnswers)
  sessionStorage.setItem("currentQuiz", JSON.stringify(currentQuiz))
  window.location.href = "result.html"
}
