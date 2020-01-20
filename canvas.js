let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");

const updateCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
updateCanvas();
window.addEventListener("resize", () => {
  updateCanvas();
  initParticle();
});

// context.fillStyle = "red";
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = "blue";
// context.fillRect(200, 200, 100, 100);
// context.fillStyle = "yellow";
// context.fillRect(300, 300, 100, 100);

//line
// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.strokeStyle = "green";
// context.lineTo(400, 300);
// context.stroke();

//arc
// context.beginPath();
// context.strokeStyle = "orange";
// context.arc(300, 300, 30, 0, Math.PI * 2, false);
// context.stroke();
// let color = ["black", "brown", "orange"];
// for (let index = 0; index < 3; index++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   context.beginPath();
//   context.arc(x, y, 30, 0, Math.PI * 2, false);
//   context.strokeStyle = color[index];
//   context.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined
};
canvas.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

let = maxRadius = 50;
let colorBulets = ["#ffaa33", "#99ffaa", "#80ff00", "#4411aa", "#ff1100"];

//animated
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.generateColor =
    colorBulets[Math.floor(Math.random() * colorBulets.length)];

  this.draw = function() {
    context.beginPath();
    // context.strokeText("DVD", this.x - 10, this.y + 5);
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.generateColor;

    // context.strokeStyle = "#000";
    // context.stroke();
    context.fill();
    return this;
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactive mouse hover
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  };
}

var circleArray = [];
function initParticle() {
  circleArray = [];
  for (let i = 0; i < 200; i++) {
    var radius = Math.random() * 5 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
initParticle();

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].draw().update();
  }
}
animate();
