let logo = document.getElementById("mainLogo");

logo.addEventListener("mouseover", ()=>{
    logo.innerHTML = "The Great Library of Diazandria"
})
logo.addEventListener("mouseout", ()=>{
    logo.innerHTML = "TGLD"
})

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

liveUpdating();