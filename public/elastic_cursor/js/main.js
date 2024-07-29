const mouseCoords = { x: 0, y: 0 };
const mouseCoordsPrevious = { x: 0, y: 0 };
const circleCoords = { x: 0, y: 0 };
let currentScaleValue = 0;
const speed = 0.18;

document.addEventListener("DOMContentLoaded", () => {
  bootstrap();
});

function bootstrap() {
  moveCircle();
}

function moveCircle() {
  const circle = document.querySelector(".circle");

  circleCoords.x += (mouseCoords.x - circleCoords.x) * speed;
  circleCoords.y += (mouseCoords.y - circleCoords.y) * speed;
  const { x, y } = circleCoords;

  const deltaMouseX = mouseCoords.x - mouseCoordsPrevious.x;
  const deltaMouseY = mouseCoords.y - mouseCoordsPrevious.y;

  const angleBetweenPointsRadians = Math.atan2(deltaMouseY, deltaMouseX);
  console.log("🚀 ~ moveCircle ~ angleBetweenPointsRadians:", angleBetweenPointsRadians);
  const angleBetweenPointsDegree = (angleBetweenPointsRadians * 180) / Math.PI;
  console.log("🚀 ~ moveCircle ~ angleBetweenPointsDegree:", angleBetweenPointsDegree);

  // limited in 150
  const distan = Math.min(Math.sqrt(Math.pow(deltaMouseX, 2) + Math.pow(deltaMouseY, 2)) * 4, 150);
  // convert to new scale to use in scale css after. [0, 150] -> [0 , 0.5]
  const scaleDist = (distan / 150) * 0.5;

  currentScaleValue += (scaleDist - currentScaleValue) * speed;

  mouseCoordsPrevious.x = mouseCoords.x;
  mouseCoordsPrevious.y = mouseCoords.y;

  const translateTransform = `translate(${x}px,${y}px)`;
  const scaleTransform = `scale(${1 + currentScaleValue}, ${1 - currentScaleValue})`;
  const rotateTransform = `rotate(${angleBetweenPointsDegree}deg)`;

  circle.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
  // circle.style.transform = `translate(${x}px,${y}px) scale(${1 + currentScaleValue}, ${1 - currentScaleValue}) `;

  requestAnimationFrame(moveCircle);
}
document.addEventListener("mousemove", function (e) {
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
});
