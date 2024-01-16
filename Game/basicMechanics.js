function calculateColission(A, B){
  if(A.right >= B.left &&
      A.left <= B.right &&
      A.bottom >= B.top &&
      A.top <= B.bottom){
      return true;
  }
  else{return false;}
}
function calculateCircularCollision(circle1, circle2){
  const distance = getDistance(circle1, circle2);
  return distance < circle1.radius + circle2.radius;
} 
function getDistance(circle1, circle2){
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
function angle(cx, cy, ex, ey){
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  const deg = rad * 180 / Math.PI;
  return deg;
}
function compareRectangles(rect1, rect2) {
  return (
      rect1.x === rect2.x &&
      rect1.y === rect2.y &&
      rect1.width === rect2.width &&
      rect1.height === rect2.height
  );
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
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const rekt = player.getBoundingClientRect();
  const playerX = rekt.left + rekt.width / 2;
  const playerY = rekt.top + rekt.height / 2;
  angledeg = angle(mouseX, mouseY, playerX, playerY);
})