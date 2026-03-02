const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const score = document.querySelector('#score')
const gameOver = document.querySelector('.game-over')
let loop
let running = true
let points = 0

function marioJump() {
 mario.classList.add('jump');
  setTimeout(() => {
   mario.classList.remove('jump');
  },500)
}

function updatePoints() {
  score.innerHTML = ++points
}

function toogleGameOver() {
  gameOver.style.display = running ? 'none' : 'block'
}

function checkGame() {
  const pipePosition = pipe.offsetLeft
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',0)
  if(pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
      pipe.classList.remove('pipe-animation')
      pipe.style.left = `${pipePosition}px`
  
      mario.style.animation = 'none'
      mario.style.bottom = `${marioPosition}px`
      mario.src = '../images/game-over.png'
      mario.style.width = '75px'
      mario.style.marginLeft = '50px'
  
      clearTimeout(loop)
      running = false
      toogleGameOver()
  }
  if(running) updatePoints()
}

loop = setInterval(checkGame, 10)

function restartGame() {
  points = 0
  running = true
  pipe.style = ''

  setTimeout(() => {
    pipe.classList.add('pipe-animation')
  }, 100)
  
  mario.style = ''
  mario.style.bottom = `0px`
  mario.style.width = `150px`
  mario.src = '../images/mario.gif'
  toogleGameOver()
  loop = setInterval(checkGame, 10)
}

document.body.onkeydown = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    marioJump();
  }
};
