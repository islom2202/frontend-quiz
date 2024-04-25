// utils
import navigateToMenu from "./utils/toMenu.js"
document.querySelector(".js-quiz-label").onclick = () => navigateToMenu()

// save data
const scores = sessionStorage.getItem('scores')
const currentQuiz =  JSON.parse(sessionStorage.getItem('currentQuiz'))

// generate html
const resultHeader = document.querySelector(".js-quiz-label")
const resultBody = document.querySelector(".js-result-body");
resultHeader.innerHTML = 
`<img src="${currentQuiz.icon}" alt="${currentQuiz.title}" draggable="false">
   <figcaption>
     <h1>${currentQuiz.title}</h1>
  </figcaption>`
resultBody.innerHTML = `
  <figure>
    <img src="${currentQuiz.icon}" alt="${currentQuiz.title}" draggable="false">
    <figcaption>
      <h1>${currentQuiz.title}</h1>
    </figcaption>
  </figure>
  <h2>${scores}</h2>
  <p>out of <span>${currentQuiz.questions.length}</span></p>
`
// make html interactive
const playAgainBtn = document.querySelector(".js-result-btn")
playAgainBtn.onclick = () => window.history.back();
resultHeader.onclick = () => navigateToMenu()
