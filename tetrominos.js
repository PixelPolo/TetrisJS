"use strict";
import {mainBoard} from "./tetris.js";
import {paintCell, rotateMatrix90Negative, rotateMatrix90Positive} from "./tools.js";


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
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                let cell = this.matrix[row][col];
                if (cell !== 0) {
                    paintCell(cell, this.x + col, this.y + row, canvas);
                }
            }
        }
    }

    displayOnNextCanvas(canvas) {
        // TODO : BETTER ALGO TO DISPLAY TETRO AT CENTER OF NEXT CANVAS (5x5)
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                let cell = this.matrix[row][col];
                if (cell !== 0) {
                    if (cell === 2) {
                        paintCell(cell, col + 1.5, row + 1.5, canvas);
                    } else if (cell === 3 || cell === 6 || cell === 7) {
                        paintCell(cell, col + 1, row + 0.5, canvas);
                    } else if (cell === 4) {
                        paintCell(cell, col + 0.5, row + 1, canvas);
                    } else if (cell === 5) {
                        paintCell(cell, col + 1.5, row + 1, canvas);
                    } else {
                        paintCell(cell, col + 0.5, row, canvas);
                    }
                }
            }
        }
    }

    isPositionValid(matrix, x, y) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] !== 0) {
                    let xCord = col + x;
                    let yCord = row + y;
                    // Checking if we are out of main board
                    if (xCord < 0 || xCord > mainBoard.grid[0].length - 1) return false;
                    else if (yCord < 0 || yCord > mainBoard.grid.length - 1) return false;
                    // Checking if we are on an occupied space
                    if (mainBoard.grid[yCord][xCord] !== 0) return false;
                }
            }
        }
        return true;
    }

    goOneDown() {
        // We have to check the future position, so we have to pass this.#y + 1
        if (this.isPositionValid(this.matrix, this.x, this.y + 1)) {
            this.y += 1;
            return true;
        } else {
            return false;
        }
    }

    goDown() {
        // We have to check the future position, so we have to pass this.#y + 1
        while (this.isPositionValid(this.matrix, this.x, this.y + 1))
            this.y += 1;
    }

    move(direction) {
        switch (direction) {
            case "left" :
                // We have to check the future position, so we have to pass this.#x - 1
                if (this.isPositionValid(this.matrix, this.x - 1, this.y)) this.x -= 1;
                break;
            case "right":
                // We have to check the future position, so we have to pass this.#x + 1
                if (this.isPositionValid(this.matrix, this.x + 1, this.y)) this.x += 1;
                break;
        }
    }

    rotate(angle) {
        let newMatrix;
        switch (angle) {
            case -90:
                // We have to check collisions with the future matrix
                newMatrix = rotateMatrix90Negative(this.matrix);
                if (this.isPositionValid(newMatrix, this.x, this.y)) this.matrix = newMatrix;
                break;
            case 90:
                // We have to check collisions with the future matrix
                newMatrix = rotateMatrix90Positive(this.matrix);
                if (this.isPositionValid(newMatrix, this.x, this.y)) this.matrix = newMatrix;
                break;
        }
    }

}


// ***** I Tetrominos *****
export class I extends Tetrominos {

    // ***** CONSTRUCTOR *****
    __proto__;
    constructor() {
        super(3, -2, [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ]);
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

}
