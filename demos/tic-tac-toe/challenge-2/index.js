const DEFAULT_PLAYER = 'X'

let gameActive = true
let playerSelected = ''
let currentPlayer = DEFAULT_PLAYER
let gameState = [
    "", "", "",
    "", "", "",
    "", "", ""
]

const winningConditions = [
    // Rows
    [0, 1, 2], // 1a 1b 1c
    [3, 4, 5], // 2a 2b 2c
    [6, 7, 8], // 3a 3b 3c

    // Columns
    [0, 3, 6], // 1a 2a 3a
    [1, 4, 7], // 1b 2b 3c
    [2, 5, 8], // 1c 2c 3c

    // Diagonal
    [0, 4, 8], // 1a 2b 3c
    [2, 4, 6]  // 1c 2b 3a
]

function handleSelectPlayer(option) {
    document.getElementById('game').style.display = 'block'
    document.getElementById('selection').style.display = 'none'
    playerSelected = option
    if(option == 'O') handlePCPlay()
}

function handlePCPlay() {
    if (!gameActive) {
        return
    }

    let pcPlay
    while (!pcPlay) {
        play = Math.floor(Math.random() * gameState.length)
        if(gameState[play] == "") pcPlay = play
    }

    handleCellPlayed(pcPlay)
    handleResultValidation()

}

function handleCellClick(id) {
    if (gameState[id] !== "" || !gameActive) {
        return
    }

    handleCellPlayed(id)
    handleResultValidation()
    handlePCPlay()
}

function changeStatus(message) {
    const statusDisplay = document.querySelector('.status')
    statusDisplay.innerHTML = message
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    changeStatus(`It's ${currentPlayer}'s turn`)
}

function handleCellPlayed(id) {
    gameState[id] = currentPlayer
    document.getElementById(id).innerHTML = currentPlayer
}

function handleResultValidation() {
    let roundWon = false
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]

        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if (a === '' || b === '' || c === '') {
            continue
        }

        if (a === b && b === c) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        changeStatus(`Player ${currentPlayer} has won!`)
        gameActive = false
        return
    }

    let roundDraw = !gameState.includes("")
    if (roundDraw) {
        changeStatus(`Game ended in a draw!`)
        gameActive = false
        return
    }

    handlePlayerChange()
}

function handleRestartGame() {
    document.getElementById('selection').style.display = 'block'
    document.getElementById('game').style.display = 'none'

    gameActive = true
    currentPlayer = DEFAULT_PLAYER
    gameState = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    changeStatus(`It's ${currentPlayer}'s turn`)
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}
