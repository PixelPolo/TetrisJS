"use strict";

import {paintCell} from "./tools.js";


// ***** BOARD SUPER CLASS *****
export class Board {

    // ***** FIELDS *****
    x;
    y;
    grid;

    // ***** CONSTRUCTOR *****
    constructor(grid) {
        this.x = 0;
        this.y = 0;
        this.grid = grid;
    }

    // ***** METHODS *****
    display(canvas) {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                let cell = this.grid[row][col];
                paintCell(cell, this.x + col, this.y + row, canvas);
            }
        }
    }

}


// ***** MAIN BOARD *****
export class MainBoard extends Board {

    // ***** CONSTRUCTOR *****
    constructor() {
        super([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);
    }


    // ***** METHODS *****

    addTetrominos(tetrominos) {
        for (let row = 0; row < tetrominos.matrix.length; row++) {
            for (let col = 0; col < tetrominos.matrix[row].length; col++) {
                if (tetrominos.matrix[row][col] !== 0) {
                    let xCord = col + tetrominos.x;
                    let yCord = row + tetrominos.y;
                    this.grid[yCord][xCord] = tetrominos.matrix[row][col];
                }
            }
        }
    }

    checkFullLines() {
        let linesBreak = 0;
        for (let row = 0; row < this.grid.length; row++) {
            if (!this.grid[row].includes(0)) {
                this.grid.splice(row, 1);
                this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                linesBreak++;
            }
        }
        return linesBreak;
    }

}


// ***** NEXT BOARD *****
export class NextBoard extends Board {

    // ***** CONSTRUCTOR *****
    constructor() {
        super([
            [8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8],
        ]);
    }

}
