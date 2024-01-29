let buttonsCont = document.querySelector(".menuButtons");
let logo = document.getElementById("mainLogo");

function setWebsiteMode() {
    const savedMode = localStorage.getItem('websiteMode');

    if (savedMode === 'light') {
        updateRootColors('light');}
    else {
        localStorage.setItem('websiteMode', 'dark');
        updateRootColors('dark');
    }
}

document.getElementById("dark").addEventListener("click", ()=>{
    if(localStorage.getItem('websiteMode') == "dark"){
        localStorage.setItem('websiteMode', 'light');
    }
    else{
        localStorage.setItem('websiteMode', 'dark');
    }
    setWebsiteMode();
})

function updateRootColors(mode) {
    if (mode === 'light') {
      document.documentElement.style.setProperty('--main', 'white');
      document.documentElement.style.setProperty('--ui', 'gray');
      document.documentElement.style.setProperty('--text', 'black');
    } else {
      document.documentElement.style.setProperty('--main', '#0b090a');
      document.documentElement.style.setProperty('--ui', '#161a1d');
      document.documentElement.style.setProperty('--text', '#b1a7a6');
    }
}
  
window.onload = setWebsiteMode;

logo.addEventListener("mouseover", ()=>{
    logo.innerHTML = "The Great Library of Diazandria"
})
logo.addEventListener("mouseout", ()=>{
    logo.innerHTML = "TGLD"
})

let projects = JSON.parse(localStorage.getItem('projectsData')) || [];

function showDesc(){
    projects.forEach(obj => {
        if(obj.current == true){
            document.querySelector("#descTitle").innerHTML=obj.title
            document.querySelector("#description").innerHTML=obj.desc
            document.querySelector("#siteBtn").href = obj.site
            document.querySelector("#projDesc").style.backgroundImage = `url(${obj.backIMG})`
        }
    });
}
if(window.innerHeight > window.innerWidth){
    document.querySelector(".menu").addEventListener("click", () =>{
        document.querySelector(".menuButtonsPortrait").style.display = (document.querySelector(".menuButtonsPortrait").style.display == "none") ? "flex": "none";
    })
}
else{
    document.querySelector(".menu").addEventListener("click", ()=>{
        buttonsCont.classList.toggle("closed");
        buttonsCont.classList.toggle("open");
        document.querySelector(".menu").classList.toggle("rotate")
    })
}


document.querySelectorAll(".project").forEach(btn =>{
    btn.addEventListener("click", ()=>{
        projects.forEach(obj =>{
            obj.current = false;
        })
        projects[parseInt(btn.id)].current = true;
        showDesc();
    })
})

showDesc()