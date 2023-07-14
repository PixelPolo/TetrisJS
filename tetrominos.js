"use strict";
import {mainBoard} from "./tetris.js";
import {paintCell} from "./tools.js";


// ***** TETROMINOS SUPER CLASS *****
class Tetrominos {

    // ***** FIELDS *****
    x;
    y;
    matrix;
    orientation;
    orientations;

    // ***** CONSTRUCTOR *****
    constructor(x, y, matrix, orientations) {
        this.x = x;
        this.y = y;
        this.matrix = matrix;
        this.orientation = 0;
        this.orientations = orientations;
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
        let width = 0;
        let height = 0;
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                let cell = this.matrix[row][col];
                if (cell !== 0) {
                    if (width < col + 1) width = col + 1;
                    if (height < row + 1) height = row + 1;
                }
            }
        }
        let offsetX = (5 - width) / 2 ;
        let offsetY = (5 - height) / 2;
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                let cell = this.matrix[row][col];
                if (cell !== 0) {
                    paintCell(cell, col + offsetX, row + offsetY, canvas);
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

    rotate90Pos() {
        if (this.orientations === 0) return;
        if (this.changeMatrix((Math.abs(this.orientation + 1)) % this.orientations)) this.orientation++;
    }

    rotate90Neg() {
        if (this.orientations === 0) return;
        if (this.changeMatrix((Math.abs(this.orientation - 1)) % this.orientations)) this.orientation--;
    }

    changeMatrix(orientation) {
        if (this.isPositionValid(this.constructor["matrix" + orientation], this.x, this.y)) {
            this.matrix = this.constructor["matrix" + orientation];
            return true;
        } else {
            return false;
        }
    }

}


// ***** I Tetrominos *****
export class I extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ];

    static matrix1 = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ];

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -2, I.matrix0, 2);
    }

}


// ***** 0 Tetrominos *****
export class O extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [2, 2],
        [2, 2]
    ];

    // ***** CONSTRUCTOR *****
    constructor() {
        super(4, 0, O.matrix0, 0);
    }

}


// ***** T Tetrominos *****
export class T extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 0, 0],
        [3, 3, 3],
        [0, 3, 0]
    ];

    static matrix1 = [
        [0, 3, 0],
        [3, 3, 0],
        [0, 3, 0]
    ]

    static matrix2 = [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0]
    ]

    static matrix3 = [
        [0, 3, 0],
        [0, 3, 3],
        [0, 3, 0]
    ]

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, T.matrix0, 4);
    }

}


// ***** L Tetrominos *****
export class L extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4]
    ];

    static matrix1 = [
        [0, 0, 0],
        [4, 4, 4],
        [4, 0, 0]
    ]

    static matrix2 = [
        [4, 4, 0],
        [0, 4, 0],
        [0, 4, 0]
    ]

    static matrix3 = [
        [0, 0, 4],
        [4, 4, 4],
        [0, 0, 0],
    ]

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, 0, L.matrix0, 4);
    }

}


// ***** J Tetrominos *****
export class J extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 5, 0],
        [0, 5, 0],
        [5, 5, 0]
    ];

    static matrix1 = [
        [5, 0, 0],
        [5, 5, 5],
        [0, 0, 0]
    ]

    static matrix2 = [
        [0, 5, 5],
        [0, 5, 0],
        [0, 5, 0]
    ]

    static matrix3 = [
        [0, 0, 0],
        [5, 5, 5],
        [0, 0, 5],
    ]

    // ***** CONSTRUCTOR *****
    constructor() {
        super(4, 0, J.matrix0, 4);
    }

}


// ***** Z Tetrominos *****
export class Z extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 0, 0],
        [6, 6, 0],
        [0, 6, 6]
    ];

    static matrix1 = [
        [0, 6, 0],
        [6, 6, 0],
        [6, 0, 0]
    ]

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, Z.matrix0, 2);
    }

}


// ***** S Tetrominos *****
export class S extends Tetrominos {

    // ***** FIELDS *****
    static matrix0 = [
        [0, 0, 0],
        [0, 7, 7],
        [7, 7, 0]
    ];

    static matrix1 = [
        [7, 0, 0],
        [7, 7, 0],
        [0, 7, 0]
    ]

    // ***** CONSTRUCTOR *****
    constructor() {
        super(3, -1, S.matrix0, 2);
    }

}
