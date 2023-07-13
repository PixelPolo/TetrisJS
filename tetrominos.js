"use strict";
import {mainBoard} from "./tetris.js";
import {displayTetrominos, rotateMatrix90Negative, rotateMatrix90Positive} from "./tools.js";


// ***** TETROMINOS SUPER CLASS *****
class Tetrominos {

    // ***** FIELDS *****
    x;
    y;
    matrix;

    // ***** CONSTRUCTOR *****
    constructor(x, y, matrix) {
        this.x = x;
        this.y = y;
        this.matrix = matrix;
    }

    // ***** METHODS *****

    display(canvas) {
        displayTetrominos(this.matrix, this.x, this.y, canvas);
    }

    isPositionValid(board, matrix, x, y) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] !== 0) {
                    let xCord = col + x;
                    let yCord = row + y;
                    // Checking if we are out of main board
                    if (xCord < 0 || xCord > board.grid[0].length - 1) return false;
                    else if (yCord < 0 || yCord > board.grid.length - 1) return false;
                    // Checking if we are on an occupied space
                    if (board.grid[yCord][xCord] !== 0) return false;
                }
            }
        }
        return true;
    }

    goOneDown() {
        // We have to check the future position, so we have to pass this.#y + 1
        if (this.isPositionValid(mainBoard, this.matrix, this.x, this.y + 1)) {
            this.y += 1;
            return true;
        } else {
            return false;
        }
    }

    goDown() {
        // We have to check the future position, so we have to pass this.#y + 1
        while (this.isPositionValid(mainBoard, this.matrix, this.x, this.y + 1))
            this.y += 1;
    }

    move(direction) {
        switch (direction) {
            case "left" :
                // We have to check the future position, so we have to pass this.#x - 1
                if (this.isPositionValid(mainBoard, this.matrix, this.x - 1, this.y)) this.x -= 1;
                break;
            case "right":
                // We have to check the future position, so we have to pass this.#x + 1
                if (this.isPositionValid(mainBoard, this.matrix, this.x + 1, this.y)) this.x += 1;
                break;
        }
    }

    rotate(angle) {
        let newMatrix;
        switch (angle) {
            case -90:
                // We have to check collisions with the future matrix
                newMatrix = rotateMatrix90Negative(this.matrix);
                if (this.isPositionValid(mainBoard, newMatrix, this.x, this.y)) this.matrix = newMatrix;
                break;
            case 90:
                // We have to check collisions with the future matrix
                newMatrix = rotateMatrix90Positive(this.matrix);
                if (this.isPositionValid(mainBoard, newMatrix, this.x, this.y)) this.matrix = newMatrix;
                break;
        }
    }

}


// ***** I Tetrominos *****
export class I extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -2, [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 0.5, 0, canvas)
    }

}


// ***** 0 Tetrominos *****
export class O extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(4, 0, [
            [2, 2],
            [2, 2],
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 1.5, 1.5, canvas)
    }

}


// ***** T Tetrominos *****
export class T extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, [
            [0, 0, 0],
            [3, 3, 3],
            [0, 3, 0]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 1, 0.5, canvas)
    }

}


// ***** L Tetrominos *****
export class L extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, 0, [
            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 0.5, 1, canvas)
    }

}


// ***** J Tetrominos *****
export class J extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(4, 0, [
            [0, 5, 0],
            [0, 5, 0],
            [5, 5, 0]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 1.5, 1, canvas)
    }

}


// ***** Z Tetrominos *****
export class Z extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, [
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 1, 0.5, canvas)
    }

}


// ***** S Tetrominos *****
export class S extends Tetrominos {

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, [
            [0, 0, 0],
            [0, 7, 7],
            [7, 7, 0]
        ]);
    }

    // ***** METHODS *****
    displayOnNextCanvas(canvas) {
        displayTetrominos(this.matrix, 1, 0.5, canvas)
    }

}
