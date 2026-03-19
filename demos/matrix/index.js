const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const FONT_SIZE = 18;
const COLUMNS = canvas.width / FONT_SIZE;

function getText() {
    const TEXTS = [
        'ア', 'ァ', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ャ', 'ラ', 'ワ', 'ガ', 'ザ', 'ダ', 'バ', 'パ', 'イ', 'ィ', 'キ', 'シ', 'チ', 'ニ', 'ヒ', 'ミ', 'リ', 'ヰ', 'ギ', 'ジ', 'ヂ', 'ビ', 'ピ', 'ウ', 'ゥ', 'ク', 'ス', 'ツ', 'ヌ', 'フ', 'ム', 'ユ', 'ュ', 'ル', 'グ', 'ズ', 'ブ', 'ヅ', 'プ', 'エ', 'ェ', 'ケ', 'セ', 'テ', 'ネ', 'ヘ', 'メ', 'レ', 'ヱ', 'ゲ', 'ゼ', 'デ', 'ベ', 'ペ', 'オ', 'ォ', 'コ', 'ソ', 'ト', 'ノ', 'ホ', 'モ', 'ヨ', 'ョ', 'ロ', 'ヲ', 'ゴ', 'ゾ', 'ド', 'ボ', 'ポ', 'ヴ', 'ッ', 'ン', 
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    ]
    return TEXTS[Math.floor(Math.random()*TEXTS.length)];
}

function getFinalColor() {
    return '#0F0'
}

function getFont() {
    return FONT_SIZE + 'px arial'
}

const drops = [];
for(let x =0; x < COLUMNS; x++){
    drops[x] = '';
}

function draw(){
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = getFinalColor();
    ctx.font = getFont();
    
    for(let index=0; index < drops.length; index++){
        const text = getText()
        
        ctx.fillText(text,index*FONT_SIZE,drops[index]*FONT_SIZE);

        if(drops[index] * FONT_SIZE > canvas.height || Math.random() > 0.97){
            drops[index] = 0;
        }

        drops[index]++;
    }
}

setInterval(draw,33);