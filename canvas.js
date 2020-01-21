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

//Draw circles
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.generateColor =
      colorBulets[Math.floor(Math.random() * colorBulets.length)];
  }
  

  draw = function() {
    context.beginPath();
    // context.strokeText("DVD", this.x - 10, this.y + 5);
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.generateColor;

    // context.strokeStyle = "#000";
    // context.stroke();
    context.fill();
    return this;
  };

  update = function() {
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

//toggle menu 
const toggleMenu = param => {
  let wrapperMenu = document.querySelector(".options-wrapper")
  if(param.dataset.toggle === "true") {
    wrapperMenu.style.transform = "translateX(0px)"
    param.dataset.toggle = "false"
    param.innerHTML = "&laquo;"
  } else {
    wrapperMenu.style.transform = "translateX(-280px)"
    param.dataset.toggle = "true"
    param.innerHTML = "&raquo;"
  }
}


/**
 * Dynamic Options
 */
let totalParticles =  document.querySelector("#total-particle")
totalParticles.value = 200
let circleSize =  document.querySelector("#circle-size")
circleSize.value = 1
let isSpeed = document.querySelector("#isSpeed")
let speedParticle = document.querySelector("#particle-speed")
speedParticle.value = 3
let bounceX = document.querySelector("#bounce-x")
bounceX.value = 3
let bounceY = document.querySelector("#bounce-y")
bounceY.value = 3

//add on enter event
let selectedElements = [totalParticles,circleSize,speedParticle,bounceX,bounceY]
selectedElements.map(res => {
  res.addEventListener("keypress", e=> {
    e.key === "Enter" && initParticle()
  })
})

//change bounce type
const changeBounce = () => {
  if(isSpeed.checked) {
    bounceX.style.opacity = 0.5
    bounceX.disabled = true
    bounceX.value = 3
    bounceY.style.opacity = 0.5
    bounceY.disabled = true
    bounceY.value = 3
    speedParticle.style.opacity = 1
    speedParticle.disabled = false
  } else {
    bounceX.style.opacity = 1
    bounceX.disabled = false
    bounceY.style.opacity = 1
    bounceY.disabled = false
    speedParticle.style.opacity = 0.5
    speedParticle.disabled = true
    speedParticle.value = 3
  }
}

//type of bounce
const getType = type => {
  if(!isSpeed.checked) {
    if(type === "x") {
      return bounceX.value
    } else {
      return bounceY.value
    }
  } else {
    return speedParticle.value
  }
}

//calculate FPS
let fpsCount = {
  startTime: 0,
  frameNumber: 0,
  getFPS: function() {
      this.frameNumber++;
      var d = performance.now(),
          currentTime = (d - this.startTime) / 1000,
          result = Math.floor((this.frameNumber / currentTime));
      if (currentTime > 1) {
          this.startTime = performance.now();
          this.frameNumber = 0;
      }

      context.beginPath();
      context.fillStyle = "rgba(0,0,0,0.8)"; 
      context.fillRect(canvas.width-105, 30, 70, 25);
      context.stroke();
      context.fillStyle = "#FFF"; 
      context.font = '20px serif';
      context.fillText(`${result} FPS`, canvas.width-100, 50);
  }
};

var circleArray = [];
function initParticle() {
  circleArray = [];
  for (let i = 0; i < totalParticles.value; i++) {
    var radius = Math.random() * 5 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * getType("x");
    var dy = (Math.random() - 0.5) * getType("y");
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
 
  fpsCount.getFPS()
}
animate();
