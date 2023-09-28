const boxes = document.querySelectorAll('.box');
// Conver into a array
Array.from(boxes);
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const resultScreen = document.querySelector('.result_screen');
const resultText = document.querySelector('.result_text');
const restartBtn = document.querySelector('.restart');

// Audio
const winningAudio = new Audio('winner.mp3');
const drawAudio = new Audio('draw.mp3');

//  Define some constant 
let playerX = 'X';
let playerO = 'O';
let currentPlayer;
let trunPlayer = true;

// Winning Conditions 
const winnginConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        currentPlayer = trunPlayer ? playerX : playerO;
        box.innerHTML = currentPlayer;
        box.classList.add('disable');
        box.classList.add(currentPlayer);

        if (chekWinner(currentPlayer)) {
            resultScreen.classList.add('active');
            resultText.innerText = `${currentPlayer} win the game`;
            winningAudio.play();
        }
        else if (isDraw()) {
            resultScreen.classList.add('active');
            resultText.innerText = 'Draw the game!';
            drawAudio.play();

        }
        else {
            swapPlayer();
        }



    })
});


// Swap Player 
function swapPlayer() {
    trunPlayer = !trunPlayer;

    if (trunPlayer) {
        player1.classList.add('active');
        player2.classList.remove('active');
    }
    else {
        player2.classList.add('active');
        player1.classList.remove('active');
    }
};


function chekWinner(currentPlayer) {
    return winnginConditions.some(function (condtion) {
        return condtion.every(function (index) {
            return boxes[index].classList.contains(currentPlayer);
        })
    })
};


function isDraw() {
    return [...boxes].every(function (box) {
        return box.classList.contains(playerX) || box.classList.contains(playerO);
    })
}


restartBtn.addEventListener("click", function(){
    location.reload();
})