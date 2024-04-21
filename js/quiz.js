// theme switcher
import switchTheme from "./utils/switcher.js"
document.querySelector(".js-theme-toggler").onclick = () => switchTheme()

saveData().then(() => generateHeader())

// save data (in current quiz variable)
let currentQuiz;
async function saveData(){
    let res = await fetch("data.json")
    let data = await res.json()
    currentQuiz = data.quizzes.find((item) => item.title == localStorage.getItem("quiz"))
    localStorage.removeItem("quiz")
}

// generate html
let questionIndex = 0
function generateHeader(){
  const quizIcon = document.querySelector(".js-quiz-icon")
  const quizName = document.querySelector(".js-quiz-name")
  quizIcon.src = currentQuiz.icon
  quizName.innerText = currentQuiz.title
  console.log(currentQuiz);
}
function generateBody(){
  const quizHTML = document.querySelector(".quiz")
  quizHTML.innerHTML = `
   <div class="quiz__left">
      <div class="quiz__left__content">
        <p>
          Question <span class="js-current-question">1</span> of <span class="js-all-questions">10</span>
        </p>
        <h3>What does HTML stand for?</h3>
      </div>
      <div class="quiz__left__progress-bar">
        <span></span>
      </div>
    </div>
    <div class="quiz__options submit-popup">
      <button class="quiz__options__option box">
        <span class="variant">A</span>
        <h4>Hyper Text Markup Language</h4>
      </button>
      <button class="quiz__options__option box correct">
        <span class="variant">B</span>
        <h4>Hyper Text Markup Language</h4>
        <img src="assets/icons/icon-correct.svg" alt="correct">
      </button>
      <button class="quiz__options__option box incorrect">
        <span class="variant">C</span>
        <h4>Hyper Text Markup Language</h4>
        <img src="assets/icons/icon-incorrect.svg" alt="">
      </button>
      <button class="quiz__options__option box">
        <span class="variant">D</span>
        <h4>Hyper Text Markup Language</h4>
      </button>
      <button class="btn">Submit Answer</button>
      <h4 class="submitPopup">
        <img src="assets/icons/icon-incorrect.svg" alt="please-submit">
        Please select an answer
      </h4>
    </div>
  `
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

