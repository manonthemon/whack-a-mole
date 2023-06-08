const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

//function to return random time
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
//function to return random hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    //Stops the same hole show twice in a row
    console.log("Same hole!");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

//function to release a random mole for a random amount of time
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  console.log(time, hole);
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return; //cheater
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;

  console.log(e);
}
moles.forEach((mole) => mole.addEventListener("click", bonk));
