
const switcher = document.querySelector(".js-theme-toggler")
const body = document.querySelector("body")
const sun = document.querySelector(".js-sun")
const moon = document.querySelector(".js-moon")

// when page reloads it looks for session storage to switch themes
sessionStorage.getItem("dark") ? toDark() : toLight();

// when we click on switcher it switches themes 
switcher.onclick = () => switchTheme()
function switchTheme(){
  if(switcher.checked){
    sessionStorage.setItem("dark", true);
    toDark()
  }else{
    sessionStorage.removeItem("dark");
    toLight()
  }
}

function toDark(){
  body.classList.add("dark")
  switcher.checked = true
  sun.setAttribute("src", "assets/icons/icon-sun-light.svg")
  moon.setAttribute("src", "assets/icons/icon-moon-light.svg")
}
function toLight() {
  body.classList.remove("dark")
  switcher.checked = false
  sun.setAttribute("src", "assets/icons/icon-sun-dark.svg")
  moon.setAttribute("src", "assets/icons/icon-moon-dark.svg")
}


