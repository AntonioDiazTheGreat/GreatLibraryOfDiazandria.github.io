let buttonsCont = document.querySelector(".menuButtons");
let logo = document.getElementById("mainLogo");

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