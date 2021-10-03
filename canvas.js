let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");
let isMouseDown = false

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

//Draw shape
class Shape {
  constructor({ x, y, dx, dy, radius, shape = 'circle' }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.shape = shape;
    this.generateColor =
      colorBulets[Math.floor(Math.random() * colorBulets.length)];
  }

  draw = () => {
    context.beginPath();

    switch (this.shape) {
			case 'square':
				context.rect(this.x, this.y, this.radius, this.radius, false)
    		break

      case 'shinomiya':
        var image = document.getElementById('source-shinomiya');
        var size = (parseFloat(this.radius) * 5 + 2); 
        context.drawImage(image, this.x, this.y, size, size);
        break

      case 'emerald':
        var image = document.getElementById('source-emerald');
        var size = (parseFloat(this.radius) * 5 + 2); 
        context.drawImage(image, this.x, this.y, size, size);
        break

			default:
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
				break
    }
    
    context.fillStyle = this.generateColor;
    context.fill();
    
    return this;
  }

  update = () => {
    //bounch boundary
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactive mouse hover
    let isScaled = document.querySelector("#isScale")
    isScaled.checked && interactiveMouse.hover(this)
    // interactiveMouse.connect()
  }
}

//interactive options
const interactiveMouse = {
  hover: param => {
    if (!isMouseDown) {
      if (
        mouse.x - param.x < 50 &&
        mouse.x - param.x > -50 &&
        mouse.y - param.y < 50 &&
        mouse.y - param.y > -50
      ) {
        if (param.radius < maxRadius) {
          param.radius += 1;
        }
      } else if (param.radius > param.minRadius) {
        param.radius -= 1;
      }
    }
  },
  connect: _ => {
    let p1, p2;
    for (let i = 0; i < totalParticles.value-1; i++) {
      p1 = shapeArray[i];
      for (let j = i + 1; j < totalParticles.value; j++) {
        p2 = shapeArray[j];
        let currentDist = getDistance(p2.x, p1.x, p2.y, p1.y);
        //100 = distance between particles           
        if (currentDist < 100) {
          context.beginPath();
          context.lineWidth = .1;
          context.strokeStyle = 'rgba(0,0,0,0.1)';
          context.fillStyle = 'rgba(0,0,0,0.1)';
          context.moveTo(p1.x, p1.y);
          context.lineTo(p2.x, p2.y, p1.x, p1.y);
          context.stroke();
        } 
      }
    }
  }
}

//get distacce between shape
const getDistance = (x1, x2, y1, y2) => {
  let a = x1 - x2
  let b = y1 - y2
	return Math.sqrt(a * a + b * b);
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
totalParticles.value = 100
let shapeSize =  document.querySelector("#shape-size")
shapeSize.value = 10
let isSpeed = document.querySelector("#isSpeed")
let speedParticle = document.querySelector("#particle-speed")
speedParticle.value = 3
let bounceX = document.querySelector("#bounce-x")
bounceX.value = 3
let bounceY = document.querySelector("#bounce-y")
bounceY.value = 3
let shape = document.querySelector("#shape")
shape.value = 'circle'

//add on enter event
let selectedElements = [totalParticles,shapeSize,speedParticle,bounceX,bounceY]
selectedElements.map(res => {
  res.addEventListener("keypress", e => {
    e.key === "Enter" && initParticle()
  })
})

shape.addEventListener('change', () => {
  initParticle()
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

  initParticle()
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

var shapeArray = [];
const initParticle = () => {
  shapeArray = [];
  for (let i = 0; i < totalParticles.value; i++) {
    var radius = Math.random() * shapeSize.value + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * getType("x");
    var dy = (Math.random() - 0.5) * getType("y");
    
    shapeArray.push(new Shape({ x, y, dx, dy, radius, shape: shape.value }));
  }
}
initParticle();

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < shapeArray.length; i++) {
    shapeArray[i].draw().update();
  }
 
  //shwo FPS
  fpsCount.getFPS()
}
animate();

const addParticle = event => {
  for (let i = 0; i < 5; i++) {
    var radius = Math.random() * shapeSize.value + 1;
    var x =  event.x;
    var y =  event.y;
    var dx = (Math.random() - 0.5) * getType("x");
    var dy = (Math.random() - 0.5) * getType("y");
    shapeArray.push(new Shape({ x, y, dx, dy, radius, shape: shape.value }));
  }
  totalParticles.value = parseInt(totalParticles.value) +5 
}

// add +5 particles on click
canvas.addEventListener("mousedown", event => {
  addParticle(event) 
  isMouseDown = true
});

canvas.addEventListener("mouseup", event => {
  addParticle(event) 
  isMouseDown = false
});

canvas.addEventListener("mousemove", event => {
  if(isMouseDown)
    addParticle(event)
});