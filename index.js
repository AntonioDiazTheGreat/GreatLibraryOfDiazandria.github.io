let logo = document.getElementById("mainLogo");
let nuking = false;


/* Henter, lagrer og bruker informasjon om website tema, white eller dark mode og endrer root variabler */
function setWebsiteMode() {
    const savedMode = localStorage.getItem('websiteMode');

    if (savedMode === 'light') {
        updateRootColors('light');}
    else {
        localStorage.setItem('websiteMode', 'dark');
        updateRootColors('dark');
    }
}


function updateRootColors(mode) {
    if (mode === 'light') {
        document.getElementById("nukeButtonCont").style.display="none";
        document.getElementById("cityFootCont").style.display="none";
        document.getElementById("rotator").style.display="none";
        sun.style.display="flex";
        document.documentElement.style.setProperty('--main', '#87CEEB');
        document.documentElement.style.setProperty('--ui', '#D3D3D3');
        document.documentElement.style.setProperty('--text', '#333333');}
        else {
            sun.style.display="none";
        document.documentElement.style.setProperty('--main', '#0b090a');
        document.documentElement.style.setProperty('--ui', '#161a1d');
        document.documentElement.style.setProperty('--text', '#b1a7a6');
    }
}
  
window.onload = setWebsiteMode;

/* logo endrer seg med hover */
logo.addEventListener("mouseover", ()=>{
    logo.innerHTML = "The Great Library of Diazandria"
})
logo.addEventListener("mouseout", ()=>{
    logo.innerHTML = "TGLD"
})

/* brukes for å vite hva som skal vises når man går inn på proj.html, utifra hvilket prosjekt som ble trykket på. Har også all "content" til deskripsjonen */
let projects = JSON.parse(localStorage.getItem('projectsData')) || [
    {title: "Boss Fighting", backIMG: "src/bossFighting.png", desc: "Et kult spill, litt lange 'transitions' og vanskelig å forstå hvordan man spiller hvis ikke man kan fra før. Men det funker ganske bra.", current: false, site: "/Game/Testing/testing.html"},
    {title: "SquarePlace", backIMG: "src/squareplace.png", desc: "En nettside hvor du kan designe en enkel nettside. Du trykker på pilen oppe i venstre hjørne så kommer det en UI som kan brukes til designing. Hva knappene gjør må du finne ut selv.", current: false, site: "/nettside/squareplace.html"},
    {title: "Nuke Simulator", backIMG: "src/nuke.png", desc: "Prøvde å lage et strategi spill, dette var tidlig i forhold til når jeg lærte JS så velidg mange if løkker og lite optimalisering.", current: false, site: "/Nuke/NukeSimulator/nuke.html"}];

let buttonsCont = document.querySelector(".menuButtons");

/* kalkulerer angle mellom mus og divs og oppdaterer rotasjon til divs hver frame, til hodeskallen på første projects slide */
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

/* oppdaterer project description contents når det trengs */
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
/* setter ulike menu dropdowns utifra landscape eller portrait mode */
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

/* avdekker glasset over rød knapp når det trykkes på og setter i gang no animasjon */
document.querySelector("#coverGlass").addEventListener("click", ()=>{
    if(nuking != true){
        document.querySelector("#coverGlass").classList.toggle("movedGlass");
        document.querySelectorAll(".beaming").forEach(child =>{
            child.classList.toggle("flashingLights")
        })
        document.querySelectorAll(".lightBeamCont").forEach(child =>{
            child.classList.toggle("spinLights")
        })
    }
})


let bombBlast = document.getElementById("bombBlast");
let shockWave = document.getElementById("shockWave");
let deathBeam = document.getElementById("deathBeam");
let effectCont = document.getElementById("effectCont");
let slice = document.getElementById("slice");
let startupSound = document.getElementById("firstExplo");
startupSound.volume = 0.2;
let endSound = document.getElementById("lastExplo");
endSound.volume = 0.2;
endSound.currentTime = 1;


/* veldig rotete og vanskelig å forstå uten css, masse settimeouts og klassegivning som lager bombe animasjonen :) */
document.querySelector("#bigButton").addEventListener("click", ()=>{
    if(nuking == true){
        return
    }
    nuking = true;
    document.getElementById('deployChute').classList.add('active');
    setTimeout(() => {
        document.querySelector("#theBomba").classList.add("dropBomb");
        document.querySelector("#bombaRotationCont").classList.add("rotateBomb");
        setTimeout(() => {
            startupSound.play();
        }, 4500);
        setTimeout(() => {
            document.body.classList.toggle("nukeShake");
            bombBlast.style.display="block"
            bombBlast.classList.toggle("boom")
            setTimeout(() => {
                shockWave.style.display="block";
                shockWave.classList.toggle("expandShock");
                effectCont.classList.toggle("flash");
                setTimeout(() => {
                    startupSound.pause();
                    effectCont.style.backgroundColor="black";
                    slice.classList.toggle("slicing");
                    setTimeout(() => {
                        endSound.play();
                        slice.style.display="none"
                        effectCont.classList.add("beamFlash");
                        shockWave.style.display="none";
                        document.getElementById("bombBlast").style.display="none";
                        deathBeam.style.display="block";
                        deathBeam.classList.toggle("fadeToLight")
                        document.body.classList.remove("nukeShake");
                        void document.body.offsetWidth;
                        document.body.classList.add("nukeShake");
                        setTimeout(() => {
                            endSound.pause();
                            deathBeam.style.display="none";
                            document.getElementById("nukeButtonCont").style.display="none";
                            document.getElementById("cityFootCont").style.display="none";
                            document.getElementById("rotator").style.display="none";

                            localStorage.setItem('websiteMode', 'light');
                            setWebsiteMode();
                        }, 5000);
                    }, 900);
                }, 1000);
            }, 5000);
        }, 4000);
    }, 2000);
})

/* Animasjon for light to dark mode transition, denne ble litt mer shit */

let degrees = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]
function createFractal(i) {
    if (i < 17) {
        let fract = document.createElement("div");
        let rand = Math.floor(Math.random() * degrees.length);
        fract.classList.add("fractal");
        fract.style.rotate = `${degrees[rand]}deg`;
        fract.style.borderTop = `solid hsl(${Math.random() * 360}, 100%, 50%) 980px`;
        degrees.splice(rand, 1);
        sun.appendChild(fract);

        setTimeout(() => {
            createFractal(i + 1);
        }, 200);
    }
}
let sun = document.getElementById("sunCont");
let sunSpikes = document.getElementById("sunSpikeCont");

sun.addEventListener("click", toDark)


let changing = false;
function toDark(){
    if(changing == true){
        return
    }
    changing = true;
    sun.classList.toggle("sunTransition");
    sunSpikes.classList.toggle("spikesTransition");
    setTimeout(() => {
        createFractal(0)
    }, 5000);
    setTimeout(() => {
        localStorage.setItem('websiteMode', 'dark');
        setWebsiteMode();
    }, 15000);
}






liveUpdating();