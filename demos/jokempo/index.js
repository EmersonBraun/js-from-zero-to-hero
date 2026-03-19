let wons = 0
let draws = 0
let losses = 0
function clearSelected() {
    document.querySelectorAll('.card').forEach(element => element.classList.remove("selected"))
}
function adicionarSelecionado(movePlayer, movePC) {
    document.querySelector(`#${movePlayer}-player`).classList.add("selected");
    document.querySelector(`#${movePC}-pc`).classList.add("selected");
}
function move(movePlayer) {
    clearSelected()
    const itens = ['rock', 'paper', 'scissor']
    const movePC = itens[Math.floor(Math.random() * itens.length)];
    show(movePlayer, movePC)
}
function show(movePlayer, movePC) {
    adicionarSelecionado(movePlayer, movePC)
    const winner = document.querySelector('#winner');

    // version 1
    // if(movePlayer === movePC) {
    //     winner.innerText = 'DRAW'
    //     document.querySelector('#winner')
    //     document.querySelector('#draws').innerText = ++draws
    //     return
    // }

    // if(
    //     movePlayer === 'rock' && movePC === 'scissor' ||
    //     movePlayer === 'paper' && movePC === 'rock' ||
    //     movePlayer === 'scissor' && movePC === 'paper'
    // ) {
    //     winner.innerText = 'YOU WON'
    //     document.querySelector('#wons').innerText = ++wons
    //     return
    // }

    // Lizard poisons Spock
    // Spock crushes (or melts) scissors
    // Scissors decapitate lizard
    // Lizard eats paper
    // Paper refutes Spock
    // Spock vaporizes Rock
    // Rock crushes scissors

    // version 2
    // const moves = {
    //     rock: {
    //         paper: 0,
    //         scissor: 1,
    //     },
    //     paper: {
    //         rock: 1,
    //         scissor: 0,
    //     },
    //     scissor: {
    //         rock: 1,
    //         paper: 0,
    //     },
    //     lizard: {
    //         rock: 0,
    //         paper: 0,
    //     },
    //     spock: {
    //         rock: 1,
    //         paper: 0,
    //     }
    // }

    // const result = moves[movePlayer][movePC]
    // if(movePlayer === movePC) {
    //     winner.innerText = 'DRAW'
    //     document.querySelector('#winner')
    //     document.querySelector('#draws').innerText = ++draws
    //     return
    // }

    // if(result) {
    //     winner.innerText = 'YOU WON'
    //     document.querySelector('#wons').innerText = ++wons
    // } else {
    //     winner.innerText = 'YOU LOSE'
    //     document.querySelector('#losses').innerText = ++losses
    // }

    const moves = {
        rock: {
            paper: 0,
            scissor: 1,
            lizard: 1,
            spock: 0,
        },
        paper: {
            rock: 1,
            scissor: 0,
            lizard: 1,
            spock: 0,
        },
        scissor: {
            rock: 1,
            paper: 0,
            lizard: 1,
            spock: 0
        },
        lizard: {
            rock: 0,
            paper: 0,
            scissor: 1,
            spock: 1
        },
        spock: {
            rock: 1,
            paper: 0,
            scissor: 1,
            lizard: 0
        }
    }

    const result = moves[movePlayer][movePC]
    if (movePlayer === movePC) {
        winner.innerText = 'DRAW'
        document.querySelector('#winner')
        document.querySelector('#draws').innerText = ++draws
        return
    }

    if (result) {
        winner.innerText = 'YOU WON'
        document.querySelector('#wons').innerText = ++wons
    } else {
        winner.innerText = 'YOU LOSE'
        document.querySelector('#losses').innerText = ++losses
    }
}