let speed = 2;
let keysPressed = {};
let currentPositionX = 0;
let currentPositionY = 0;
let player = document.getElementById("player");
let mouseX = 0;
let mouseY = 0;

document.addEventListener("keydown", startMove);
document.addEventListener("keyup", stopMove);
function startMove(event) {
    keysPressed[event.code] = true;
}
function stopMove(event) {
    keysPressed[event.code] = false;
}

window.addEventListener("load", frameCalc)
function frameCalc(){
    let playerRekt = player.getBoundingClientRect();
    
    let shottyBulletRektList = [];
    document.querySelectorAll("#shotgunBullet").forEach(bullet =>{
        if(bullet.style.opacity == "1"){
            shottyBulletRektList.push(bullet.getBoundingClientRect());
        };
    });

    angledeg = angle(mouseX, mouseY, playerRekt.x + playerRekt.width/2, playerRekt.y + playerRekt.height/2);
    if(lastPhaseVar == 0){
        document.getElementById("pointerindicator").style.transform = `rotate(${90 + angledeg}deg)`;
    }
    else{
        document.getElementById("shotgunCont").style.transform = `rotate(${angledeg}deg)`;
    }

    currentPositionY = keysPressed["KeyW"] ? currentPositionY - speed : currentPositionY;
    currentPositionX = keysPressed["KeyA"] ? currentPositionX - speed : currentPositionX;
    currentPositionY = keysPressed["KeyS"] ? currentPositionY + speed : currentPositionY;
    currentPositionX = keysPressed["KeyD"] ? currentPositionX + speed : currentPositionX;

    player.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
    requestAnimationFrame(frameCalc)
}
let angledeg = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const rekt = player.getBoundingClientRect();
    const playerX = rekt.left + rekt.width / 2;
    const playerY = rekt.top + rekt.height / 2;
    angledeg = angle(mouseX, mouseY, playerX, playerY);
    if(lastPhaseVar == 0){
        document.getElementById("pointerindicator").style.transform = `rotate(${90 + angledeg}deg)`;
    }
    else{
        document.getElementById("shotgunCont").style.transform = `rotate(${angledeg}deg)`;
    }
})
let lastPhaseVar = 0;
let idIdentifier = 0;
let backgrounds = document.querySelectorAll(".backgroundScroller");
window.addEventListener("load", lastPhase);
function lastPhase(){
    document.body.style.backgroundColor="rgb(11, 5, 24)";

    for(let j = 0; j < 6; j++){
        for(let i = 0; i < 40; i++){
            let spawningRekt = backgrounds[j].getBoundingClientRect();

            let spawnX = Math.floor(Math.random() * spawningRekt.width);
            let spawnY = Math.floor(Math.random() * spawningRekt.height);
            let clone = document.getElementById("cloneThus").cloneNode(true);
            clone.style.display = "flex";

            if(j == 4 || j == 5){
                clone.style.backgroundColor = "blue";
                clone.classList.add("blue");
            }
            else if(j == 2 || j == 3){
                clone.style.backgroundColor = "rgb(143, 9, 9)";
                clone.classList.add("pink");
            }
            else{
                clone.style.backgroundColor = "yellow";
                clone.classList.add("green");
            }
            backgrounds[j].appendChild(clone);
            clone.style.left = spawnX + "px";
            clone.style.top = spawnY + "px";
            idIdentifier++;
        }
    }
    energyBlastinator7000();
    lastPhaseVar = 1;
    document.getElementById("pointerindicator").style.display="none";
}
window.addEventListener("click", attack);
let shotty = document.getElementById("shotgun");
function attack() {
    let shotgunRekt = shotty.getBoundingClientRect();
    let clone = document.getElementById("bulletRotatingCont").cloneNode();
    let clone2 = document.getElementById("shotgunBullet").cloneNode();
    clone.style.display = "flex";

    clone.style.left = shotgunRekt.x + shotgunRekt.width/2 + "px";
    clone.style.top = shotgunRekt.y + shotgunRekt.height/2 + "px";
    
    clone.style.transform = `rotate(${angledeg}deg)`;
    document.body.appendChild(clone);
    clone.appendChild(clone2);
    clone2.classList.add("shottyBulletMove");
}
let hour = document.getElementById("hourHand");
let minute = document.getElementById("minuteHand");

function energyBlastinator7000(){
    let bingBong = Math.floor(Math.random()*4);
    for(let i = 0; i < 4; i++){
        document.querySelectorAll(".buddhistPillar")[bingBong+i].classList.add("pillarMoving")
    }
    console.log(bingBong)
    setTimeout(energyBlastinator7000, 2500)
}



