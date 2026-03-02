const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

function marioJump() {
 mario.classList.add('jump');
  setTimeout(() => {
   mario.classList.remove('jump');
  },500)
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',0)
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = './images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearTimeout(loop)
    }
}, 10)

document.body.onkeydown = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    marioJump();
  }
};
