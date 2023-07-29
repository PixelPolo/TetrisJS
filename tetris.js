"use strict";

import {MainBoard, NextBoard} from "./board.js";
import {I, J, L, O, S, T, Z} from "./tetrominos.js";


// ***** ZOOM DISABLING *****
document.querySelector(".content").addEventListener("click", (e) => e.preventDefault());


// ***** CANVAS SETTINGS *****
const CANVAS = document.querySelector(".canvas");
let canvasCtx = CANVAS.getContext("2d");
export const TILE = 16;
const COLS = 10;
const ROWS = 22;
const WIDTH = TILE * COLS;
const HEIGHT = TILE * ROWS;
CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;


// ***** CANVAS FOR NEXT TETROMINOS SETTINGS *****
const NEXT_CANVAS = document.querySelector(".nextCanvas");
let nextCanvasCTX = NEXT_CANVAS.getContext("2d");
export let NEXT_CANVAS_SIZE = TILE * 5;
NEXT_CANVAS.width = NEXT_CANVAS_SIZE;
NEXT_CANVAS.height = NEXT_CANVAS_SIZE;


// ***** SELECTING ELEMENTS *****
let bestScoreDiv = document.querySelector(".bestScore");
let scoreDiv = document.querySelector(".score");
let levelDiv = document.querySelector(".level");
let linesDiv = document.querySelector(".lines");
let startBtn = document.querySelector(".start");
let controlsBtn = document.querySelector(".controlsSelector");
let controlsDiv = document.querySelector(".controls");
let touchDiv = document.querySelector(".touch");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let downBtn = document.querySelector(".down");
let upBtn = document.querySelector(".up");
let aBtn = document.querySelector(".a");
let bBtn = document.querySelector(".b");
let form = document.getElementsByTagName("form")[0];
let submitBtn = document.querySelector(".submit");
let pseudo = document.querySelector(".pseudo");
let scoreToSubmit = document.querySelector(".scoreToSubmit");


// ***** GAME VARIABLES : SETTINGS *****
let speed = 1000;
let gameOver = true;
let bestScore = 0;
let score = 0;
let lines = 0;
let touchControls = false;


// ***** GAME VARIABLES : BOARDS *****
export let mainBoard = new MainBoard();
new NextBoard();


// ***** GAME VARIABLES : TETROMINOS *****
let nextTetrominos = getRandomTetro();
let currentTetrominos = getRandomTetro();


// ***** GAME LOOP *****
let lastTime = 0;
function main(time) {
    let elapsedTime = time - lastTime;
    if (elapsedTime > speed && !gameOver) {
        goOn();
        checkLines();
        updateSpeedAndLevel();
        repaint();
        lastTime = time;
    }
    // A DOMHighResTimeStamp is passed automatically
    requestAnimationFrame( t => main(t) );
}


// ***** STARTING LOOP *****
main(performance.now());


// ***** UPDATE ****
function repaint() {
    mainBoard.display(canvasCtx);
    currentTetrominos.display(canvasCtx);
    nextCanvasCTX.clearRect(0, 0, NEXT_CANVAS_SIZE, NEXT_CANVAS_SIZE);
    nextTetrominos.displayOnNextCanvas(nextCanvasCTX);
}


// ***** LINE CHECKING ****
function checkLines() {
    let linesBroken = mainBoard.checkFullLines();
    if (linesBroken > 0) {
        lines += linesBroken;
        if (linesBroken === 1) score += 40;
        else if (linesBroken === 2) score += 100;
        else if (linesBroken === 3) score += 300;
        else if (linesBroken === 4) score += 1200;
        if (score > bestScore) bestScore = score;
        bestScoreDiv.textContent = bestScore;
        linesDiv.textContent = lines;
        scoreDiv.textContent = score;
        repaint();
    }
}


// ***** GO ON *****
function goOn() {
    if (!currentTetrominos.goOneDown()) {
        // CHANGE PIECE
        // We have to save the constructor for creating a new nextTetrominos,
        // because if we switched tetrominos, coordinates of next are modified.
        mainBoard.addTetrominos(currentTetrominos);
        let nextConstructorFunction = nextTetrominos.constructor;
        currentTetrominos = new nextConstructorFunction();
        // GAME OVER
        if (!currentTetrominos.isPositionValid(
            currentTetrominos.matrix, currentTetrominos.x, currentTetrominos.y + 1)) {
                gameOver = true;
                alert("Game Over !");
        }
        nextTetrominos = getRandomTetro();
    }
}


// ***** UPDATE SPEED *****
function updateSpeedAndLevel() {
    if (lines < 10) {
        levelDiv.textContent = "0";
        speed = 800;
    } else if (lines === 10) {
        levelDiv.textContent = "1";
        speed = 800;
    } else if (lines === 20) {
        levelDiv.textContent = "2";
        speed = 760;
    } else if (lines === 30) {
        levelDiv.textContent = "3";
        speed = 720;
    } else if (lines === 40) {
        levelDiv.textContent = "4";
        speed = 680;
    } else if (lines === 50) {
        levelDiv.textContent = "5";
        speed = 640;
    } else if (lines === 60) {
        levelDiv.textContent = "6";
        speed = 600;
    } else if (lines === 70) {
        levelDiv.textContent = "7";
        speed = 560;
    } else if (lines === 80) {
        levelDiv.textContent = "8";
        speed = 520;
    } else if (lines === 90) {
        levelDiv.textContent = "9";
        speed = 480;
    } else if (lines === 100) {
        levelDiv.textContent = "10";
        speed = 440;
    } else if (lines === 110) {
        levelDiv.textContent = "11";
        speed = 400;
    } else if (lines === 120) {
        levelDiv.textContent = "12";
        speed = 360;
    } else if (lines === 130) {
        levelDiv.textContent = "13";
        speed = 320;
    } else if (lines === 140) {
        levelDiv.textContent = "14";
        speed = 280;
    } else if (lines === 150) {
        levelDiv.textContent = "15";
        speed = 240;
    } else if (lines === 160) {
        levelDiv.textContent = "16";
        speed = 200;
    } else if (lines === 170) {
        levelDiv.textContent = "17";
        speed = 160;
    } else if (lines === 180) {
        levelDiv.textContent = "18";
        speed = 120;
    } else if (lines === 190) {
        levelDiv.textContent = "19";
        speed = 80;
    }
}


// ***** GET RANDOM TETROMINOS *****
function getRandomTetro() {
    let tetrominos = [I, O, T, L, J, Z, S];
    let max = tetrominos.length;
    let rdm = Math.floor(Math.random() * max)
    return new tetrominos[rdm];
}


// ***** START *****
function start() {
    speed = 1000;
    gameOver = false;
    score = 0;
    lines = 0;
    linesDiv.textContent = lines;
    scoreDiv.textContent = score;
    mainBoard = new MainBoard();
    currentTetrominos = getRandomTetro();
    nextTetrominos = getRandomTetro();
    repaint();
}


// ****** SWITCH ******
function switchTetrominos() {
    if (
        // Check if next at current position will be valid
        nextTetrominos.isPositionValid(nextTetrominos.matrix, currentTetrominos.x, currentTetrominos.y) &&
        // Check if next at current position + one down will be valid
        nextTetrominos.isPositionValid(nextTetrominos.matrix, currentTetrominos.x, currentTetrominos.y + 1) &&
        // Check if current at position + one down will be valid
        currentTetrominos.isPositionValid(currentTetrominos.matrix, currentTetrominos.x, currentTetrominos.y)
    ) {
        // Switch tetrominos and their coordinates
        [currentTetrominos, nextTetrominos] = [nextTetrominos, currentTetrominos];
        [currentTetrominos.x, currentTetrominos.y] = [nextTetrominos.x, nextTetrominos.y];
    }
}


// ***** BUTTONS CONTROLS *****

// START
startBtn.addEventListener("click", start);

// CONTROLS SELECTION
controlsBtn.addEventListener("click", () => {
    controlsDiv.classList.toggle("hide");
    touchDiv.classList.toggle("hide");
    touchControls = !touchControls;
})

// DIRECTIONS
leftBtn.addEventListener("click", () => {
    currentTetrominos.move("left");
    repaint();
})
rightBtn.addEventListener("click", () => {
    currentTetrominos.move("right");
    repaint();
})

// ROTATIONS
aBtn.addEventListener("click", () => {
    currentTetrominos.rotate90Neg();
    repaint();
})
bBtn.addEventListener("click", () => {
    currentTetrominos.rotate90Pos();
    repaint();
})

// SWITCH
upBtn.addEventListener("click", () => {
    switchTetrominos();
    repaint();
});

// GOING DOWN
downBtn.addEventListener("click", () => {
    currentTetrominos.goDown();
    repaint();
})


// ***** KEYBOARD CONTROLS *****
document.addEventListener("keydown", (e) => {

    // DIRECTIONS
    let direction;
    if (e.key === "ArrowLeft" || e.key === "a") direction = "left";
    if (e.key === "ArrowRight" || e.key === "d") direction = "right";
    if (direction) {
        currentTetrominos.move(direction);
        repaint();
    }

    // ROTATIONS
    if (e.key === "ArrowDown" || e.key === "s") {
        currentTetrominos.rotate90Pos();
        repaint();
    }

    // SWITCH
    if (e.key === "ArrowUp" || e.key === "w") {
        switchTetrominos();
        repaint();
    }

    // GOING DOWN
    if (e.key === " ") {
        currentTetrominos.goDown();
        repaint();
    }

});


// ***** SWIPE CONTROLS *****
let startX, startY, endX, endY, dX, dY, absDX, absDY;

touchDiv.style.touchAction = "none";

touchDiv.addEventListener('touchstart', (event) => {
    if (touchControls && !gameOver) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }
});

touchDiv.addEventListener('touchmove', (event) =>  {
    if (touchControls && !gameOver) {
        updateDeltas(event);
        if (absDX > absDY && absDX > 2 * TILE) {
            // DIRECTIONS
            if (dX < 0) currentTetrominos.move("left");
            else currentTetrominos.move("right");
            startX = endX;
            repaint();
        }
    }
});

touchDiv.addEventListener('touchend', (event) => {
    if (touchControls && !gameOver) {
        updateDeltas(event);
        if (absDX < absDY && absDY > 2 * TILE) {
            // SWITCH
            if (dY < 0) switchTetrominos();
            // GOING DOWN
            else currentTetrominos.goDown();
            repaint();
        } else if (absDX < 2 && absDY < 2) {
            // ROTATIONS
            currentTetrominos.rotate90Pos();
            repaint();
        }
    }
})

function updateDeltas(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    dX = endX - startX;
    dY = endY - startY;
    absDX = Math.abs(dX);
    absDY = Math.abs(dY);
}


// ***** SCORE SUBMISSION *****
function submitForm(e) {
    if (pseudo.value === "") {
        alert("Enter your name first");
        e.preventDefault();
    } else {
        scoreToSubmit.value = bestScore;
        alert(
            pseudo.value +
            " : Your score of " +
            bestScore +
            " has been sent !"
        );
        form.submit();
    }
}

submitBtn.addEventListener("click", submitForm);
