let logo = document.getElementById("mainLogo");

logo.addEventListener("mouseover", ()=>{
    logo.innerHTML = "The Great Library of Diazandria"
})
logo.addEventListener("mouseout", ()=>{
    logo.innerHTML = "TGLD"
})

let projects = JSON.parse(localStorage.getItem('projectsData')) || [
    {title: "Boss Fighting", backIMG: "src/bossFighting.png", desc: "Et kult spill, litt lange 'transitions' og vanskelig å forstå hvordan man spiller hvis ikke man kan fra før. Men det funker ganske bra.", current: false, site: "/Game/Testing/testing.html"},
    {title: "SquarePlace", backIMG: "src/squareplace.png", desc: "En nettside hvor du kan designe en enkel nettside. Du trykker på pilen oppe i venstre hjørne så kommer det en UI som kan brukes til designing. Hva knappene gjør må du finne ut selv.", current: false, site: "/nettside/squareplace.html"},
    {title: "Nuke Simulator", backIMG: "src/nuke.png", desc: "Prøvde å lage et strategi spill, dette var tidlig i forhold til når jeg lærte JS så velidg mange if løkker og lite optimalisering.", current: false, site: "/Nuke/NukeSimulator/nuke.html"}];

let buttonsCont = document.querySelector(".menuButtons");


function angle(cx, cy, ex, ey){
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;
}

function liveUpdating(){
    rotateEyes(".eye");
    rotateEyes(".eye2");

    requestAnimationFrame(liveUpdating);
}

function rotateEyes(selector) {
    document.querySelectorAll(selector).forEach(eye => {
        const eyeRekt = eye.getBoundingClientRect();
        const angledegeye = angle(mouseX, mouseY, eyeRekt.x, eyeRekt.y);
        eye.style.transform = `rotate(${angledegeye - 90}deg)`;
    });
}
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

document.querySelectorAll(".slideLink").forEach(link =>{
    link.addEventListener("click", ()=>{
        projects.forEach(obj =>{
            obj.current = false;
        })
        projects[parseInt(link.id)].current = true;
        updateProjectsData();
        window.location.href = "projects/proj.html";
    })
})
function updateProjectsData() {
    localStorage.setItem('projectsData', JSON.stringify(projects));
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
document.querySelector("#coverGlass").addEventListener("click", ()=>{
    document.querySelector("#coverGlass").classList.toggle("movedGlass");
    document.querySelectorAll(".beaming").forEach(child =>{
        child.classList.toggle("flashingLights")
    })
    document.querySelectorAll(".lightBeamCont").forEach(child =>{
        child.classList.toggle("spinLights")
    })
})

liveUpdating();