export const switchTheme = () => {
  const switcherState = document.querySelector(".js-theme-toggler")
  const sun = document.querySelector(".js-sun")
  const moon = document.querySelector(".js-moon")
  const body  = document.querySelector('body')
  if(switcherState.checked){
    body.classList.add('dark');
    sun.setAttribute("src", "assets/icons/icon-sun-light.svg")
    moon.setAttribute("src", "assets/icons/icon-moon-light.svg")
  }else{
    body.classList.remove("dark")
    sun.setAttribute("src", "assets/icons/icon-sun-dark.svg")
    moon.setAttribute("src", "assets/icons/icon-moon-dark.svg")
  } 
}