const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const FONT_SIZE = 18;
const COLUMNS = canvas.width / FONT_SIZE;

let TEXTS = [0,1,2,3,4,5,6,7,8,9]
let FINAL_COLOR = '#0F0'
let INTERVAL = 33

const form = document.querySelector('form');

form.addEventListener('submit', function( event ) {
    event.preventDefault();
});

function getText() {
    return TEXTS[Math.floor(Math.random()*TEXTS.length)];
}

const drops = [];
for(let x =0; x < COLUMNS; x++){
    drops[x] = '';
}

function validateForm() {
    // console.log(document.forms["form"])
    const text = form.querySelector('#ftext').value
    const color = form.querySelector('#fcolor').value
    const interval = form.querySelector('#finterval').value
    console.log({ text, color, interval})
    TEXTS = text.split('')
    FINAL_COLOR = color
    INTERVAL = interval
    startDrawn()
}

function startDrawn() {
    document.querySelector('.container').style.display = 'none'

    function draw(){
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = FINAL_COLOR
        ctx.font = FONT_SIZE + 'px arial'
        
        for(let index=0; index < drops.length; index++){
            const text = getText()
            
            ctx.fillText(text,index*FONT_SIZE,drops[index]*FONT_SIZE);
    
            if(drops[index] * FONT_SIZE > canvas.height || Math.random() > 0.97){
                drops[index] = 0;
            }
    
            drops[index]++;
        }
    }

    setInterval(draw,INTERVAL);
}
