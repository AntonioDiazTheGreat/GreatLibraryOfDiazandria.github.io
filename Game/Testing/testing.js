let boardArray = JSON.parse(localStorage.getItem('boardArray')) || [];
let eye = document.getElementById("eyeDetails");
let blinny = 0;
let eyeCont = document.getElementById("eyeCont");
let effectCont = document.getElementById("effectCont")
let currentPositionX = 200;
let currentPositionY = 450;
let player = document.getElementById("player");
let shields = 0;
let beamRektList = [];
let bubbleRektList = [];
let eyeLinkCircList = []
let eyeRektCircMainList = [];

let stall = 0;
let mouseX = 0;
let mouseY = 0;
let eyeHealth = 100;
let win = 0;
let suckingCurrently = 0;

let angledeg = 0;
let blackHoleRektList = [];

window.addEventListener("load", () => {
    if (boardArray != []) {
        boardArray.sort((a, b) => a[1] - b[1]);
        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML += `<div class='boardElement'><div id="filler"></div><div class='playerName' id="playerSorter">Player</div><div class='playerTime' id="timeSorter">Time</div><div class='playerDate' id="dateSorter">Date</div></div>`;
        
        boardArray.forEach((dataSet, index) => {
            const boardElement = document.createElement("div");
            const countId = `boardElement_${index}`;
            boardElement.id = countId;
            boardElement.className = "boardElement";
            boardElement.innerHTML = `<div class="deleteBtn binger"></div><div class='playerName'>${dataSet[0]}</div><div class='playerTime'>${dataSet[1]}</div><div class='playerDate'>${dataSet[2]}</div>`;
            leaderboard.appendChild(boardElement);
        });
    }
    frameCalc();
});

function frameCalc(){
    let balls = document.querySelectorAll(".rotatingBalls");
    eyeLinkCircList = [];
    let shieldRektCont = [];
    if(balls.length !== 0){
        balls.forEach(ball =>{
            eyeLinkCircList.push(ball.getBoundingClientRect());
        })
    }
    document.querySelectorAll(".bababooey").forEach(shield=>{
        shieldRektCont.push(shield.getBoundingClientRect());
    })
    let playerRekt = player.getBoundingClientRect();
    let eyeRekt = document.getElementById("clock2").getBoundingClientRect();
    eyeRektCircMainList = [];
    document.querySelectorAll(".starLink").forEach(link =>{
        eyeRektCircMainList.push(link.getBoundingClientRect());
    })
    if(suckingCurrently == 1){
        document.querySelectorAll(".blackHoleProjectile").forEach(proj =>{
            if (calculateColission(playerRekt, proj.getBoundingClientRect())){
                proj.remove();
                loseHealth();
            }
        })
    }
    let pillarRektList = [];
    document.querySelectorAll(".pillarHitBox").forEach(pillar =>{
        pillarRektList.push(pillar.getBoundingClientRect());
    })
    let rektList = [beamRektList, shieldRektCont, pillarRektList]
    let circList = [bubbleRektList ,eyeLinkCircList, eyeRektCircMainList]
    let swordRekt = document.getElementById("swordHitBox").getBoundingClientRect();

    if(eye.classList.contains("eyeAnimate") !== true){
        if (calculateColission(playerRekt, eyeRekt)){
            loseHealth();
        }
    }
    document.querySelectorAll(".shottyBulletMove").forEach(bullet =>{
        if(calculateColission(bullet.getBoundingClientRect(), eyeRekt)){
            bullet.remove();
            eyeHealth--;
            if(eyeHealth > 0){
                eyeHealthBar.innerHTML=`${eyeHealth}/100`;
            }
            else{
                eyeHealthBar.innerHTML="0/100";
                winHandler();
            }
        }
    })
    rektList.forEach(list => {
        for (let i = 0; i < list.length; i++) {
            if (calculateColission(playerRekt, list[i])) {
                if (list === shieldRektCont) {
                    document.querySelectorAll("#shield").forEach(shield => {
                        if (compareRectangles(shield.getBoundingClientRect(), list[i])) {
                            shield.remove();
                            getShield();
                        }
                    });
                } else {
                    loseHealth();
                }
            }
        }
    });
    circList.forEach(list =>{
        for (let i = 0; i < list.length; i++) {
            let playerCirc = {x: playerRekt.x + playerRekt.width/2, y: playerRekt.y + playerRekt.height/2, radius: playerRekt.width/2};
            let listCirc = {x: list[i].x + list[i].width/2, y: list[i].y + list[i].height/2, radius: list[i].width/2};
            if (calculateCircularCollision(playerCirc, listCirc)){
                loseHealth();
            }
        }
    })
    let eyeLinkRektList = document.querySelectorAll(".starLink");
    if(sword.classList.contains("swordAttacking")){
        eyeLinkRektList.forEach(eye =>{
            let eyeRekt = eye.getBoundingClientRect();
            let swordCirc = {x: swordRekt.x + swordRekt.width/2, y: swordRekt.y + swordRekt.height/2, radius: swordRekt.width/2};
            let listCirc = {x: eyeRekt.x + eyeRekt.width/2, y: eyeRekt.y + eyeRekt.height/2, radius: eyeRekt.width/2};
            if (calculateCircularCollision(swordCirc, listCirc)){
                eyeHit(eye);
            }
        })
    }
    let jawProjectilesRektList = document.querySelectorAll(".reactorProjectile");
    jawProjectilesRektList.forEach(bullet =>{
        if (calculateColission(playerRekt, bullet.getBoundingClientRect())){
            bullet.remove();
            loseHealth();
        }
    })
    angledeg = angle(mouseX, mouseY, playerRekt.x + playerRekt.width/2, playerRekt.y + playerRekt.height/2);
    if(lastPhaseVar == 0){
        document.getElementById("pointerindicator").style.transform = `rotate(${90 + angledeg}deg)`;
    }
    else{
        document.getElementById("shotgunCont").style.transform = `rotate(${angledeg}deg)`;
    }

    player.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
    requestAnimationFrame(frameCalc)
}
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

function blink(){
    if(death == 1){
        return
    }
    let checker = 0;
    let pertruders = document.querySelectorAll(".pertruders");
    document.querySelectorAll(".star").forEach(star =>{
        if(star.style.display == "none"){
            checker++;
        }
    })
    if(checker == 4){
        lastPhaseVar = 1;
        document.getElementById("pointerindicator").style.display="none";
        document.getElementById("shotgunCont").style.display="flex";
        eye.classList.remove("eyeAnimate");
        effectCont.classList.remove("wakeEffect");
        eyeCont.classList.remove("eyeMover")
        pertruders.forEach(item =>{
            item.style.width="15px";
        })
        lastPhase();
        return
    }
    if(eye.classList.contains("eyeAnimate")){
        eye.classList.remove("eyeAnimate");
        effectCont.classList.add("wakeEffect");
        hold2 = 0;
        setTimeout(lazerWarn, 4000)
        pertruders.forEach(item =>{
            item.style.width="15px";
        })
        eyeCont.classList.add("eyeMover")
        if(stall > 0){
            spawnEyeLink();
        }
        else{
            stall++;
        }
    }
    else{
        eye.classList.add("eyeAnimate");
        effectCont.classList.remove("wakeEffect");
        pertruders.forEach(item =>{
            item.style.width="70px";
        })
        eyeCont.classList.remove("eyeMover")
        warnings.forEach(warning =>{
            warning.classList.remove("activelyWarning");
        })
        setTimeout(beamEliminationProcess6000, 2000);
    }
    setTimeout(blink, 10000);
}

let beamCont = document.getElementById("beamCont");
let beams = document.querySelectorAll(".lazerBeam");
let beamRekt = [
    beams[0].getBoundingClientRect(),
    beams[1].getBoundingClientRect(),
    beams[2].getBoundingClientRect()
]
let warnings = document.querySelectorAll(".lazerBeamWarning");

let exclude = 0;

function lazerWarn() {
    beamCont.style.display = "flex";
    exclude = Math.floor(Math.random() * 3);

    warnings.forEach(warning => {
        if (warning !== warnings[exclude]) {
            warning.classList.add("activelyWarning");
        }
    });

    setTimeout(lazerStrike, 2000);
}
let kingCrimson = document.getElementById("kingCrimson");
kingCrimson.volume=0.5;
let aramid = document.getElementById("aramid");
aramid.volume = 0.5;
let theHand = document.getElementById("theHand");
theHand.volume= 0.5;

function lazerStrike(){
    beams.forEach(beam =>{
        if(beam !== beams[exclude]){
            beam.style.backgroundColor="rgb(201, 201, 95)";     
            beamRektList.push(beam.getBoundingClientRect())
        }
    })
    kingCrimson.currentTime = 0.8;
    kingCrimson.play();
    lazerGlow();
    setTimeout(()=>{
        hold2 = 1;
        beams.forEach(beam =>{
            beam.style.backgroundColor="transparent";
            beamRektList = [];
        })
    }, 2000)

}
let health = 5;
let death = 0;
let hold = 0;
let hold2 = 0;
let spawned = 0;
let hell = document.querySelectorAll(".health");
function loseHealth(){
    if(hold == 0 && win == 0){
        if(shields == 0){
            health--;
            for(let i = 0; i < hell.length; i++){
                hell[i].style.backgroundColor = (i+1 <= health) ? "green" : "transparent";
            }
            hold = 1;
            setTimeout(holder, 1000)
        }
        else{
            shields -= 1;
            updateShieldDisplay();
        }
    }
    if(health < 1){
        death = 1;
        document.getElementById("deathScreen").style.display="flex";
        throw new Error("Death Error");
    }
}
function holder(){
    hold = 0;
}
function lazerGlow() {
    beams.forEach((beam, index) => {
        if (index !== exclude) {
            let beamRekt = beam.getBoundingClientRect();
            let spawnX = beamRekt.left + Math.floor(Math.random() * beamRekt.width);
            let spawnY = beamRekt.top + Math.floor(Math.random() * beamRekt.height);
            let clone = document.getElementById("sparkle").cloneNode(true);
            clone.style.display = "flex";
            document.body.appendChild(clone);
            clone.style.left = spawnX + "px";
            clone.style.top = spawnY + "px";
        }
    });
    if(hold2 == 0){
        setTimeout(lazerGlow, 80)
    }
    else{
        document.querySelectorAll("#sparkle").forEach(sparkle =>{
            if (sparkle.style.display !== "none") {
                sparkle.remove();
            }
        })
    }
}
let bubble = document.getElementById("deathBubble");
let bubbleRekt = bubble.getBoundingClientRect();

function beamEliminationProcess6000(){
    bubble.style.display="block";
    bubble.classList.remove("bubbleImpactFrames");
    document.body.classList.remove("bubbleImpactFramesBody");
    bubbleRekt = bubble.getBoundingClientRect();
    let playerRekt = player.getBoundingClientRect();
    let goX = currentPositionX + playerRekt.width/2 - bubbleRekt.width/2; 
    let goY = currentPositionY + playerRekt.height/2 - bubbleRekt.height/2; 
    bubble.style.transform = `translate(${goX}px, ${goY}px)`;
    bubbleRekt = bubble.getBoundingClientRect();
    setTimeout(() => {
        bubbleRektList.push(bubbleRekt);
        bubble.classList.add("bubbleImpactFrames");
        document.body.classList.add("bubbleImpactFramesBody");
        theHand.play();

        sparkle(bubbleRekt);
        setTimeout(() => {
            bubble.style.backgroundColor="transparent";
            bubble.style.display="none";
            bubbleRektList = [];
            document.querySelectorAll(".smallEyeShoot").forEach(eye =>{
                eye.remove();
            })
        }, 3000);
    }, 1000);
}
function sparkle(rekt) {
    const centerX = rekt.left + rekt.width / 2;
    const centerY = rekt.top + rekt.height / 2;
    const radius = Math.min(rekt.width, rekt.height) / 2;

    const spawnAngle = Math.random() * 2 * Math.PI;
    const spawnDistance = Math.random() * radius;

    const spawnX = centerX + spawnDistance * Math.cos(spawnAngle);
    const spawnY = centerY + spawnDistance * Math.sin(spawnAngle);

    const distanceToCenter = Math.sqrt(Math.pow(spawnX - centerX, 2) + Math.pow(spawnY - centerY, 2));
    
    if (distanceToCenter <= radius) {
        let clone = document.getElementById("sparkle").cloneNode(true);
        clone.style.display = "flex";
        document.body.appendChild(clone);
        clone.style.left = spawnX + "px";
        clone.style.top = spawnY + "px";
    }

    if (bubbleRektList.length !== 0) {
        setTimeout(() => sparkle(rekt), 80);
    } else {
        document.querySelectorAll("#sparkle").forEach((sparkle) => {
            if (sparkle.style.display !== "none") {
                sparkle.remove();
            }
        });
    }
}

function spawnEyeLink(){
    if(spawned < 4){
        let rngX = Math.floor(Math.random() * (window.screen.width-100));
        let rngY = Math.floor(Math.random() * (window.screen.height-200));
        let clone = document.getElementById("starLink").cloneNode(true);
        document.body.appendChild(clone);
        clone.id = `starLink${document.querySelectorAll(".starLink").length}`
        clone.setAttribute("lives", 3);
        clone.setAttribute("index", spawned);
        clone.style.display="flex";
        clone.style.left = rngX + "px";
        clone.style.top = rngY + "px";
        spawned++;
    }
}
window.addEventListener("click", attack)
let sword = document.getElementById("sword");
function attack(){
    if(attackcooldown == 0){
        if(lastPhaseVar == 1){
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

            attackcooldown = 1;
            setTimeout(cooldown, 200);
        }
        else{
            attackcooldown = 1;
            sword.classList.toggle("swordAttacking");
            setTimeout(cooldown, 1500);
        }
    }
};
function cooldown(){
    attackcooldown = 0;
    sword.classList.toggle("swordAttacking");
}
let attackcooldown = 0;

let held = 0;
function eyeHit(starLink) {
    if(held == 0){
        const lives = parseInt(starLink.getAttribute("lives"));
        console.log(lives)
        if (lives > 0) {
            let shield = document.querySelector(`#${starLink.id} #rotatingShield`);
            starLink.setAttribute("lives", (lives - 1));
            shield.style.borderColor = (lives == 2) ? "transparent" : shield.style.border;
            shield.style.borderStyle = (lives == 3) ? "solid" : "double";
            shield.style.borderWidth = (lives == 3) ? "3px" : "6px";

            if(lives === 1){
                starLink.remove();
                document.querySelectorAll(".star")[parseInt(starLink.getAttribute("index"))].style.display="none";
            }
        }
    }
    held = 1;
    setTimeout(holderer, 1000)
}
function holderer(){
    held = 0;
}


let beast = document.getElementById("beastCont");
let topJaw = document.getElementById("topJaw");
let bottomJaw = document.getElementById("bottomJaw");
let reactor = document.getElementById("reactor");

let phase = 2;
let phaseCounter = 0;
let healthBar = document.getElementById("healthBar");

function bossHandle(){
    if(death == 1){
        return
    }
    if(phase == 2){
        phase = 1;
        beast.classList.add("phase1AnimCont");
        topJaw.classList.add("phase1AnimTop");
        bottomJaw.classList.add("phase1AnimBottom")

        beast.classList.remove("enterMouthCont")
        topJaw.classList.remove("enterMouthTop");
        bottomJaw.classList.remove("enterMouthBottom");
        reactor.style.backgroundColor="red";
        healthBar.style.display="flex";
        reactor.style.opacity="1";
        document.getElementById("shieldBar").style.display="flex";
        setTimeout(jawProjectiles, 900)
        setTimeout(shieldSpawn, 1000)
    }
    else if(phase == 1){
        phase = 2;
        beast.classList.remove("phase1AnimCont");
        topJaw.classList.remove("phase1AnimTop");
        bottomJaw.classList.remove("phase1AnimBottom")
        
        phaseCounter++;
        if(phaseCounter == 2){
            bossChange();
            return
        }

        beast.classList.add("enterMouthCont")
        topJaw.classList.add("enterMouthTop");
        bottomJaw.classList.add("enterMouthBottom");
        reactor.style.backgroundColor="turquoise";
        healthBar.style.display="none";
        reactor.style.opacity="0.8";
        document.getElementById("shieldBar").style.display="none";
        jawCounter = 0;
        setTimeout(() => {
            document.querySelectorAll(".bababooey").forEach(shield=>{
                shield.remove();
            })
            jawShatter();
        }, 4200);
    }
    setTimeout(bossHandle, 14000);
}
let cycle = 0;
let spawnerCycle = 0;


function jawProjectiles() {
    if(phase == 1){
        for (let i = 0; i < 20; i++) {
            document.querySelectorAll(".projCont")[spawnerCycle].innerHTML += `<div class='reactorProjectile batch${cycle}' id='identifier${cycle}is${i}'></div>`;
    
            document.getElementById(`identifier${cycle}is${i}`).style.rotate = `${Math.floor(Math.random() * 360)}deg`;
        }
       if (spawnerCycle == 3) {
            spawnerCycle = 0;
       } else {
            spawnerCycle++;
       }
       document.querySelectorAll(".reactorProjectile").forEach(proj => {
            proj.classList.add("projecting");
       })
    
       let cycleSave = cycle;
       
        setTimeout(jawProjectiles, 2000);
        setTimeout(() => {
            deleteCoreProj(cycleSave);
        }, 1990);
    }
}

function deleteCoreProj(cyc) {
    document.querySelectorAll(`.batch${cyc}`).forEach(proj => {
        proj.remove();
    });
}
let shield = document.getElementById("shield");
let buttons = document.querySelectorAll(".button");
function shieldSpawn(){
    if(phase == 1){
        let rngX = Math.floor(Math.random() * (window.screen.width-100));
        let rngY = Math.floor(Math.random() * (window.screen.height-200));
        let clone = document.getElementById("shield").cloneNode(true);
        clone.classList.add("bababooey")
        document.body.appendChild(clone);
        clone.style.display="flex";
        clone.style.left = rngX + "px";
        clone.style.top = rngY + "px";
        setTimeout(shieldSpawn, 4000);
    }  
}
function getShield(){
    shields += 1;
    console.log(shields)
    updateShieldDisplay();
}

let jawCounter = 0;
function jawShatter(){
    loseHealth();
    jawCounter++;
    if(jawCounter < 3){
        setTimeout(jawShatter, 3000)
    }
}
function bossChange(){
    if(death == 1){
        return
    }
    reactor.classList.add("enterCoreReactor")
    topJaw.classList.add("enterCoreTop");
    bottomJaw.classList.add("enterCoreBottom");
    setTimeout(() => {
        document.getElementById("beastArenaCont").style.display="none";
    }, 12000);
    setTimeout(() => {
        beast.style.display="none"
        document.getElementById("eyeCenteringCont").style.display="flex";
        document.querySelectorAll(".bababooey").forEach(shield=>{
            shield.remove();
        })
        document.getElementById("shieldBar").style.display="none";
        shields = 0;
        aramid.play();
        blink();
    }, 19000);
}
function updateShieldDisplay(){
    let shieldys = document.querySelectorAll(".shield")
    for(let i = 0; i < shieldys.length; i++){
        shieldys[i].style.backgroundColor = (i+1 <= shields) ? "blue" : "transparent";
    }
}
document.getElementById("restartButton").addEventListener("click", ()=>{
    location.reload();
})
let idIdentifier = 0;
let backgrounds = document.querySelectorAll(".backgroundScroller");
let eyeHealthBar = document.getElementById("eyeHealthBar");
function lastPhase(){

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
    document.body.classList.remove("bubbleImpactFramesBody");
    document.body.style.backgroundColor="rgb(11, 5, 24)";
    lastPhaseVar = 1;
    document.getElementById("pointerindicator").style.display="none";
    document.getElementById("eyeDetails").classList.add("finalPhaseDetails");
    effectCont.classList.add("wakeEffect");
    eyeCont.classList.add("lastPhaseEye");
    eyeHealthBar.style.display="block";


    setTimeout(() => {
        finalAttackHandler();
        setTimeout(() => {
            accelerateTime();
        }, 12000);
    }, 4000);
}

function finalAttackHandler(){
    if(win == 0){
        blastCycle = 0;
        if(Math.random() > 0.5){
            blackHoling();
        }
        else{
            energyBlastinator7000();
        }
        setTimeout(finalAttackHandler, 12000)
    }
}

let shotty = document.getElementById("shotgun");
let stance = 0;
let blackHole = document.getElementById("blackHole");
function blackHoling(){
    blackHole.style.display="flex";
    document.getElementById("blackHoleDecoration").classList.remove("collapseHole");
    holeRekt = blackHole.getBoundingClientRect();
    let playerRekt = player.getBoundingClientRect();
    let goX = currentPositionX + playerRekt.width/2 - holeRekt.width/2; 
    let goY = currentPositionY + playerRekt.height/2 - holeRekt.height/2; 
    blackHole.style.transform = `translate(${goX}px, ${goY}px)`;

    for (let i = 0; i < 18; i++) {
        blackHole.innerHTML += `<div class='blackHoleProjectile' id='holer${i}'></div>`;

        document.getElementById(`holer${i}`).style.rotate = `${Math.floor(Math.random() * 360)}deg`;
    }
    stance = 0;
    setTimeout(() => {
        suckingCurrently = 1;
        stance = 1;
        document.getElementById("blackHoleDecoration").classList.add("collapseHole");
        setTimeout(() => {
            document.querySelectorAll(".blackHoleProjectile").forEach(proj =>{
                proj.remove();
            })
            suckingCurrently = 0;
        }, 1000);
    }, 3000);
}
let hourHand = document.getElementById("hourHand");
let minuteHand = document.getElementById("minuteHand");
function accelerateTime(){
    document.getElementById("realClock").classList.add("showClock");
    hourHand.classList.add("hourSpin");
    minuteHand.classList.add("minuteSpin");
    effectCont.classList.remove("speedEffect");
    effectCont.classList.add("speedEffect");
        setTimeout(() => {
            document.querySelectorAll(".yellowCont").forEach(cont =>{
                cont.style.animationDuration = "8s";
            })
            document.querySelectorAll(".redCont").forEach(cont =>{
                cont.style.animationDuration = "10s";
            }) 
            document.querySelectorAll(".blueCont").forEach(cont =>{
                cont.style.animationDuration = "12s";
            })
        }, 1000);
}

let bingBing = 0;
let bingBong = 0;

let blastCycle = 0;
function energyBlastinator7000() {
    let topPillars = document.querySelectorAll("#topPillarCont .buddhistPillar");
    let bottomPillars = document.querySelectorAll("#bottomPillarCont .buddhistPillar");

    bingBing = Math.floor(Math.random() * topPillars.length);

    bingBong = (bingBing == 0) ? 3 : (bingBing == 1) ? 2 : (bingBing == 2) ? 1 : 0;

    topPillars[bingBing].classList.add("pillarMoving");
    bottomPillars[bingBong].classList.add("pillarMoving");

    blastCycle++;

    topPillars[bingBing].addEventListener("animationend", function () {
        topPillars[bingBing].classList.remove("pillarMoving");
        bottomPillars[bingBong].classList.remove("pillarMoving");

        if (blastCycle <= 3) {
            setTimeout(energyBlastinator7000, 100);
        }
    }, { once: true });
}

document.getElementById("startButton").addEventListener("click", startUp)
function startUp(){
    stance = 1;
    player.style.display="flex";
    document.getElementById("UI").style.display="flex";
    document.getElementById("beastCenteringCont").style.display="flex";
    
    document.getElementById("startScreenCont").style.display="none";
    setTimeout(() => {
        topJaw.classList.remove("topStartAnimation");
        bottomJaw.classList.remove("bottomStartAnimation");
        reactor.classList.remove("reactorStartAnimation");
        timer.start();
        bossHandle();
    }, 15000);
}
function createTimer() {
    let startTime;
  
    return {
      start: function () {
        startTime = new Date();
      },
      stop: function () {
        if (startTime) {
          const endTime = new Date();
          const elapsedTime = endTime - startTime;
          startTime = null;
          return elapsedTime;
        } else {
          console.error("Timer was not started.");
          return null;
        }
      },
    };
}
  
const timer = createTimer();
  
let elapsedTime = 0;
let playerName = "";
const root = document.documentElement;
function winHandler(){
    document.getElementById("eyeCenteringCont").style.display="none";
    document.getElementById("UI").style.display="none";
    document.getElementById("winScreenCont").style.display="flex";
    elapsedTime = timer.stop();

    document.getElementById("finalScore").innerHTML="Final Time: " + (elapsedTime / (1000 * 60)).toFixed(2) + " minutes";
    win = 1;
}
document.getElementById("nameSave").addEventListener("click", ()=>{
    playerName = document.getElementById("nameInput").value;
    if(document.getElementById("nameInput").value != ""){
        if(playerName.length < 17){
            document.getElementById("nameSave").innerHTML="Saved";
            return
        }
        else{
            document.getElementById("nameSave").innerHTML="Too Long";
            playerName = "";
        }
    }
    else{
        document.getElementById("nameSave").innerHTML="No Name";
        playerName = "";
    }
})
let dateBox = document.getElementById("dateInput")
document.getElementById("toStart").addEventListener("click", ()=>{
    if(document.getElementById("nameInput").value != "" && dateBox.value != undefined){
        

        boardArray.push([playerName, (elapsedTime / (1000 * 60)).toFixed(2), dateBox.value]) 
        localStorage.setItem('boardArray', JSON.stringify(boardArray));
    }
    location.reload();
})
document.getElementById("leaderboardButton").addEventListener("click", ()=>{
    document.getElementById("startButtonCont").style.display="none";
    document.getElementById("leaderboardCont").style.display="flex";
})
document.getElementById("settingsButton").addEventListener("click", ()=>{
    document.getElementById("startButtonCont").style.display="none";
    document.getElementById("settingsCont").style.display="flex";
})
document.querySelectorAll("#toStartFrom").forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.getElementById("startButtonCont").style.display="flex";
        document.getElementById("leaderboardCont").style.display="none";
        document.getElementById("settingsCont").style.display="none";
    })
})
document.getElementById("lightMode").addEventListener("change", ()=>{
    var checkbox = document.getElementById("lightMode");
    if (checkbox.checked) {
        console.log("Checkbox is checked");
        root.style.setProperty('--main-color', 'white');
        root.style.setProperty('--secondary-color', 'black');
    } else {
        console.log("Checkbox is not checked");
        root.style.setProperty('--main-color', 'black');
        root.style.setProperty('--secondary-color', 'white');
    }
})
document.getElementById("colorBlindMode").addEventListener("change", ()=>{
    var filter = document.getElementById("colorBlindModeFilter");
    if(document.getElementById("colorBlindMode").checked){
        filter.style.display="flex";
    }
    else{
        filter.style.display="none";
    }
})

const moveDistance = 5;
let keysPressed = {};
 
let velocityX = 0;
let velocityY = 0;
 
let aks = 0.4;
let friction = 0.9;
 
let canDash = true;
 
document.addEventListener("keydown", function (event) {
  keysPressed[event.code] = true;
 
  if (keysPressed["Space"]) {
    dash();
  }
});
 
document.addEventListener("keyup", function (event) {
  keysPressed[event.code] = false;
});
 
function moveBox() {
  if(stance == 1 && win == 0){
    velocityX -= (keysPressed["KeyA"]) ? aks : 0;
    velocityX += (keysPressed["KeyD"]) ? aks : 0;
    velocityY -= (keysPressed["KeyW"]) ? aks : 0;
    velocityY += (keysPressed["KeyS"]) ? aks : 0;
    
    if ((keysPressed["KeyA"] || keysPressed["KeyD"]) && (keysPressed["KeyW"] || keysPressed["KeyS"])) {
        velocityX *= 0.91;
        velocityY *= 0.91;
    }
    
    velocityX *= friction;
    velocityY *= friction;
    
    currentPositionX += velocityX;
    currentPositionY += velocityY;
  }
 
  player.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`;
 
  requestAnimationFrame(moveBox);
}
 
moveBox();
 
function dash() {
  if (canDash) {
    canDash = false;
    aks = 2;
    setTimeout(() => {
      aks = 0.4;
    }, 100);
    setTimeout(() => {
      canDash = true;
    }, 500)
  }
}
