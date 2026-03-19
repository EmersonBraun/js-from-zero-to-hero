const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let finishedGame = false;
let firstCard, secondCard;

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

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
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

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', (e) => flipCard(e));
});