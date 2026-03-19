const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let finishedGame = false;
let firstCard, secondCard;

let wrong = 0
let right = 0

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

function updateRight() {
    document.getElementById('right').innerHTML = ++right
}

function updateWrong() {
    document.getElementById('wrong').innerHTML = ++wrong
}

function gameOverCheck() {
    let message = ''
    if(right === 6) {
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
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}

(() => shuffle())();

cards.forEach((card) => {
    card.addEventListener('click', (e) => flipCard(e));
});