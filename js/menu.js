// theme switcher
import switchTheme from "./utils/switcher.js"
document.querySelector(".js-theme-toggler").onclick = () => switchTheme()

// switch to quiz page with chosen quiz topic
const btns = document.querySelectorAll('.box')
btns.forEach(btn => btn.onclick = () => openQuiz(btn.dataset.value))
function openQuiz(quiz){
  window.location.href = 'quiz.html'
  localStorage.setItem('quiz', quiz)
}
