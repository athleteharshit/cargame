// select class div in html
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

// click and game start window show
startScreen.addEventListener("click", start);

// confirmation game started
let player = {
  start: false,
  speed: 5,
  score: 0,
};

// create object key for which key we press
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(keys);
}

// eneamy car and playing car hit togather then game stop
function isCollide(a, b) {
  let aReact = a.getBoundingClientRect();
  let bReact = b.getBoundingClientRect();

  return !(
    aReact.bottom < bReact.top ||
    aReact.top > bReact.bottom ||
    aReact.right < bReact.left ||
    aReact.left > bReact.right
  );
}

// road lines move top to bottom
function mouseLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach((item) => {
    if (item.y >= 720) {
      item.y -= 750;
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

// end game function 
const endGame = () => {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML = "Game Over <br> Your final Score is " + player.score + "<br> Press here to restart the game"
}

// eneamy car move top to bottom
function eneamyCar(car) {
  let eneamy = document.querySelectorAll(".eneamy");
  eneamy.forEach((item) => {
    if (isCollide(car, item)) {
      // console.log("boom Hit");
      endGame();
    }

    if (item.y >= 700) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }

    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

// window show Animation function
function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    mouseLines();
    eneamyCar(car);

    if (keys.ArrowUp && player.y > road.top + 150) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 105) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    player.score++;
    let ps = player.score - 1;
    score.innerText = `Score : ${ps}`;
    window.requestAnimationFrame(gamePlay);
  }
  // console.log("play");
}

// game window start
function start() {
  // gameArea.classList.remove("hide");
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  // create road line
  for (let l = 0; l < 5; l++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    gameArea.appendChild(roadLine);
    roadLine.y = l * 150;
    roadLine.style.top = roadLine.y + "px";
  }

  // create eneamy car
  for (let i = 0; i < 3; i++) {
    let eneamy = document.createElement("div");
    eneamy.setAttribute("class", "eneamy");
    eneamy.y = Math.floor(Math.random() * 350) + "px";
    eneamy.y = (i + 1) * 350 * -1;
    eneamy.style.top = eneamy.y;
    eneamy.style.left = Math.floor(Math.random() * 350) + "px";
    eneamy.style.background = "";
    gameArea.appendChild(eneamy);
  }

  // appendchild in gameArea to show game window
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  // car.innerText = "hey i am your car";
  gameArea.appendChild(car);

  // axis the car position and set in player object
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}
