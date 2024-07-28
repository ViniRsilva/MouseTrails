const coods = { x: 0, y: 0 };
var circles;

function bootstrap() {
  addXYProperties();
  moveCircles();
}

function addXYProperties() {
  circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
  });
}
function moveCircles() {
  let { x, y } = coods;
  const offset = -12;
  circles.forEach((circle, index) => {
    circle.style.left = x + offset + "px";
    circle.style.top = y + offset + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.2;
    y += (nextCircle.y - y) * 0.2;
  });

  requestAnimationFrame(moveCircles);
}

document.addEventListener("DOMContentLoaded", bootstrap);

document.addEventListener("mousemove", (event) => {
  coods.x = event.clientX;
  coods.y = event.clientY;
});
