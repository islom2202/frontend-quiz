// theme switcher
import switchTheme from "./utils/switcher.js"
document.querySelector(".js-theme-toggler").onclick = () => switchTheme()
// check session storage for theme mode
if(sessionStorage.getItem("dark")){
  document.querySelector("body").classList.add("dark")
}else{
  document.querySelector("body").classList.remove("dark")
}
// switch to quiz page with chosen quiz topic
const btns = document.querySelectorAll('.box')
btns.forEach(btn => btn.onclick = () => openQuiz(btn.dataset.value))
function openQuiz(quiz){
  window.location.href = 'quiz.html'
  sessionStorage.setItem('quiz', quiz)
}