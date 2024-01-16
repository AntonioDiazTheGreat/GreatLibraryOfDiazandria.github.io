function calculateSecondProj() {
    let speed = 0.1;

    secondEnemyProj.forEach(projectile =>{
        let projRekt = projectile.getBoundingClientRect();
        let playerRekt = player.getBoundingClientRect();
         
        let angleDeg = angle(projRekt.x, projRekt.y, playerRekt.x, playerRekt.y);
        let goX = projRekt.x + speed * Math.cos(angleDeg);
        let goY = projRekt.y + speed * Math.sin(angleDeg);
        projectile.style.transform = `translate(${goX}px, ${goY}px)`;
        
        console.log(projRekt);
    })
    requestAnimationFrame(calculateSecondProj);
}