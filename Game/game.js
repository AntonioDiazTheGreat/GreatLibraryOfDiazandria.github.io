let player = document.getElementById("player");
let collisionbox = document.getElementById("collisionbox");
let obstacles = [
    document.getElementById("wall1").getBoundingClientRect(),
    document.getElementById("wall2").getBoundingClientRect(),
];
let grass = document.getElementById("grass");
let firstEnemyRekt = [];
let secondEnemyRekt = [];
let currentPositionX = 0;
let currentPositionY = 0;
let speed = 2;
let keysPressed = {};
let enemycont = document.getElementById("enemycont");
let enemycont2 = document.getElementById("enemycont2");
let dropletsoundeffect = document.getElementById("droplet");
let boz = 0;
let health = 5;
let barslots = [
    document.querySelector(`#superbar :nth-child(1)`),
    document.querySelector(`#superbar :nth-child(2)`),
    document.querySelector(`#superbar :nth-child(3)`),
    document.querySelector(`#superbar :nth-child(4)`)]
const deathsounds = [
    document.getElementById("yodadeath"),
    document.getElementById("fortnitedeath"),
    document.getElementById("geodeath")
]
document.addEventListener("keydown", startMove);
document.addEventListener("keyup", stopMove);
function startMove(event) {
    keysPressed[event.code] = true;
    if(keysPressed["Space"]){
        createGrass()
    }
}
function stopMove(event) {
    keysPressed[event.code] = false;}
window.addEventListener("load", movePlayer);
window.addEventListener("load", enemyHQ);
function movePlayer() {
    let oldPositionX = currentPositionX;
    let oldPositionY = currentPositionY;
    let playerRect = collisionbox.getBoundingClientRect();
    let rektList = [obstacles, firstEnemyRekt, secondEnemyRekt]

    currentPositionY = keysPressed["KeyW"] ? currentPositionY - speed : currentPositionY;
    currentPositionX = keysPressed["KeyA"] ? currentPositionX - speed : currentPositionX;
    currentPositionY = keysPressed["KeyS"] ? currentPositionY + speed : currentPositionY;
    currentPositionX = keysPressed["KeyD"] ? currentPositionX + speed : currentPositionX;

    player.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;

    rektList.forEach(list =>{
        for (let i = 0; i < list.length; i++) {
            if (calculateColission(playerRect, list[i])){
                currentPositionX = oldPositionX - Math.sign(currentPositionX - oldPositionX) * speed * 0.5;
                currentPositionY = oldPositionY - Math.sign(currentPositionY - oldPositionY) * speed * 0.5;
            }
        }
    })
    let bullets = document.querySelectorAll("#projectile, #projectile2");
    bullets.forEach(bullet =>{
        if (calculateColission(playerRect, bullet.getBoundingClientRect())){
            bullet.remove();
            health--;
            let hell = document.querySelectorAll(".health");
            for(let i = 0; i < hell.length; i++){
                hell[i].style.backgroundColor = (i+1 <= health) ? "green" : "transparent";
            }
        }
    })
    let angledeg = angle(mouseX, mouseY, playerRect.x, playerRect.y);
    document.getElementById("pointerindicator").style.transform = `rotate(${90 + angledeg}deg)`;

    rotateEyes(".eye", playerRect.x, playerRect.y);
    rotateEyes(".eye2", playerRect.x, playerRect.y);
    requestAnimationFrame(movePlayer);
}

function rotateEyes(selector, playerX, playerY) {
    document.querySelectorAll(selector).forEach(eye => {
        const eyeRekt = eye.getBoundingClientRect();
        const angledegeye = angle(playerX, playerY, eyeRekt.x, eyeRekt.y);
        eye.style.transform = `rotate(${angledegeye - 90}deg)`;
    });
}
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const rekt = player.getBoundingClientRect();
    const playerX = rekt.left + rekt.width / 2;
    const playerY = rekt.top + rekt.height / 2;
    const angledeg = angle(mouseX, mouseY, playerX, playerY);
    document.getElementById("pointerindicator").style.transform = `rotate(${90 + angledeg}deg)`
})
document.addEventListener("click", attack);
const sword = document.getElementById("samuraisword");
let attackcooldown = 0;
function attack(){
    if(attackcooldown == 0){
        const swordcont = document.getElementById("swordcont");
        const pointer = document.getElementById("pointer");

        pointer.style.display="none";
        swordcont.style.display="flex";

        swordcont.animate([
            { transform: 'rotate(65deg)' },
            { transform: 'rotate(-65deg)' },
        ], {
            duration: 300,
        });
        setTimeout(hold, 300);

        checkAtkCollision()
        attackcooldown = 1;
        setTimeout(cooldown, 2000);
    }
};
function hold(){
    document.getElementById("swordcont").style.display="none";
    document.getElementById("pointer").style.display="block";
}
let enemycount = 0;
let enemycount2 = 0;
function enemyHQ(){
    firstSpawnSystem();
    setTimeout(secondSpawnSystem, 5000);
}
function firstSpawnSystem(){
    enemycount++;
    let rngX = Math.floor(Math.random() * (window.screen.width-300));
    let rngY = Math.floor(Math.random() * (window.screen.height-300));

    enemycont.innerHTML+=`<div class="enemy" id="enemy${enemycount}"><div class="enemydetails"><div class="eye"><div class="eyeball"></div></div></div></div>`;
    document.getElementById(`enemy${enemycount}`).style.transform = `translate(${rngX}px, ${rngY}px)`;
    firstEnemyRekt.push(document.getElementById(`enemy${enemycount}`).getBoundingClientRect());

    firstEnemyHandler();
    setTimeout(firstSpawnSystem, 3000);
}
function secondSpawnSystem(){
    enemycount2++;
    let rngX = Math.floor(Math.random() * (window.screen.width-100));
    let rngY = Math.floor(Math.random() * (window.screen.height-200));

    enemycont2.innerHTML+=`<div class="second" id="enemy2${enemycount2}"><div class="enemydetails"><div class="eye2"><div class="eyeball2"></div></div></div></div>`;
    document.getElementById(`enemy2${enemycount2}`).style.transform = `translate(${rngX}px, ${rngY}px)`;
    secondEnemyRekt.push(document.getElementById(`enemy2${enemycount2}`).getBoundingClientRect());

    secondEnemyHandler();
    setTimeout(secondSpawnSystem, 6000);
}
function checkAtkCollision() {
    let swordRect = sword.getBoundingClientRect();
    let firstEnemies = document.querySelectorAll(".enemy");
    let secondEnemies = document.querySelectorAll(".second");

    for (let i = 0; i < firstEnemies.length; i++) {
        if (calculateColission(swordRect, firstEnemies[i].getBoundingClientRect())) {
            firstEnemies[i].remove();
            deathsounds[Math.floor(Math.random() * deathsounds.length)].play();
            firstEnemyRekt.splice(i, 1);
            superHandle();
        }
    }
    for (let i = 0; i < secondEnemies.length; i++) {
        if (calculateColission(swordRect, secondEnemies[i].getBoundingClientRect())) {
            secondEnemies[i].remove();
            deathsounds[Math.floor(Math.random() * deathsounds.length)].play();
            secondEnemyRekt.splice(i, 1);
            superHandle();
        }
    }
    requestAnimationFrame(checkAtkCollision);
}
function cooldown(){
    attackcooldown = 0;
}
function firstEnemyHandler() {
    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach((enemy) => {
        for (let i = 0; i < 4; i++) {
            const projectile = document.createElement("div");
            projectile.id = "projectile";
            enemy.appendChild(projectile);
        }
        const projectiles = enemy.querySelectorAll("#projectile");

        for(let i = 0; i < projectiles.length; i++){
            projectiles[i].classList.add(`Proj${i+1}`);
        }
    });
    setTimeout(function () {
        firstDeleteProjectiles();
    }, 1400);
}
let secondEnemyProj = [];
function secondEnemyHandler(){
    const enemies = document.querySelectorAll(".second");

    enemies.forEach((enemy) => {
        const projectile = document.createElement("div");
        projectile.id = "projectile2";
        enemy.appendChild(projectile);
        projectile.classList.add("projFlash")
        secondEnemyProj.push(projectile);
    });
    setTimeout(function () {
        secondDeleteProjectiles();
    }, 1400);
}
function firstDeleteProjectiles(){
    document.querySelectorAll(".enemy").forEach(enemy => {
        while(enemy.childElementCount > 1){
            enemy.removeChild(enemy.lastChild);
        }
    });
}
function secondDeleteProjectiles(){
    document.querySelectorAll(".second").forEach(enemy => {
        while(enemy.childElementCount > 1){
            enemy.removeChild(enemy.lastChild);
        }
    });
}
let superbar = document.getElementById("superbar");
function superHandle() {
    boz += 1;
    const slots = [3, 2, 1, 0];

    for (let i = 0; i < slots.length; i++) {
        if (boz === 12 - 3 * i) {
            barslots[slots[i]].classList.add("animated");
            dropletsoundeffect.play();
            break;
        }
    }
}
let grasses = [];
function createGrass() {
    if (boz >= 12) {
        let grassParent = grass.cloneNode(true);
        document.body.appendChild(grassParent);
        let grassChild = grassParent.querySelector('.grass');
        grassParent.classList.add("patchAdult");
        grassChild.classList.add("patchChild");

        let grassRekt = grass.getBoundingClientRect();
        grassParent.style.transform = `translate(${grassRekt.x}px, ${grassRekt.y - 150}px)`;

        grassChild.animate(
            [
                { width: "30px", height: "30px" },
                { width: "300px", height: "300px" },
            ],
            { duration: 1200 }
        );

        boz = 0;
        barslots.forEach(slot => {
            slot.classList.remove("animated");
        });
    } else {
        return;
    }
}


