const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let finishedGame = false;
let firstCard, secondCard;
let qtdOfCharacters = 0

let wrong = 0
let right = 0

const CHARACTERS = [
    'bowser',
    'bowser_jr',
    'gooma',
    'kamek',
    'larry_koopa',
    'luigi',
    'mario',
    'peach',
    'toad',
    'yoshi'
]

function updateRight() {
    document.getElementById('right').innerHTML = ++right
}

function updateWrong() {
    document.getElementById('wrong').innerHTML = ++wrong
}

function flipCard(e) {
    if (finishedGame) return;
    
    const card = e.path[1]

    card.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    hasFlippedCard = false;

    checkForMatch();
}

function gameOverCheck() {
    let message = ''
    console.log({right, qtdOfCharacters})
    if(right === qtdOfCharacters) {
        if(wrong === 0) {
            message = 'Perfect'
        } else {
            message = wrong > right ? 'Bad' : 'Good'
        }
        document.querySelector('#game-over').innerHTML = `${message} Game!`
        finishedGame = true
    }
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        updateRight()
    } else {
        updateWrong()
        unflipCards();
    }
    gameOverCheck()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    finishedGame = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false
    finishedGame = false
    firstCard = null
    secondCard = null
}

function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * (CHARACTERS.length * 2));
        card.style.order = randomPosition;
    })
};

function getCharacterList(qtd) {
    const characters = []
    while (characters.length < qtd) {
        const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        if(!characters.includes(character)) characters.push(character)
    }
    return characters
}

function createBoard(qtd = 1) {
    document.querySelector('.container').style.display = 'none'
    let board = ''
    const characters = getCharacterList(qtd)

    for (let index = 0; index < qtd; index++) {
        board += `
        <div class="card" data-card="${characters[index]}">
            <img src="../images/${characters[index]}.png" alt="Face da carta" class="card-front">
            <img src="../images/box.png" alt="Verso da carta" class="card-back">
        </div>
        `
    }

    const title = `
    <div class="title">
        <div class="score">Wrong: <span id="wrong"></span></div>
        <div class="score">Right: <span id="right"></span></div>
        <div class="score" id="game-over"></div>
    </div>
    `

    document.querySelector('main').innerHTML = `${board}\n${board}\n${title}`

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', (e) => flipCard(e));
    });

    shuffle()
}

function startGame() {
    qtdOfCharacters = Number(document.getElementById('qtd').value)
    createBoard(qtdOfCharacters)
}