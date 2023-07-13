"use strict";

import {TILE} from "./tetris.js";


// ***** DISPLAY A GRID ON CANVAS *****

function paintCell(cell, x, y, canvas) {
    canvas.fillStyle = selectColor(cell);
    canvas.fillRect((x) * TILE, (y) * TILE, TILE, TILE);
    canvas.strokeStyle = "black";
    canvas.strokeRect((x) * TILE, (y) * TILE, TILE, TILE)
}

export function display(grid, x, y, canvas) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let cell = grid[row][col];
            paintCell(cell, x + col, y + row, canvas);
        }
    }
}


export function displayTetrominos(grid, x, y, canvas) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            let cell = grid[row][col];
            if (cell !== 0) {
                paintCell(cell, x + col, y + row, canvas);
            }
        }
    }
}


// ***** SELECT COLOR TO GRID DISPLAYING *****
function selectColor(cell) {
    let color;
    switch (cell) {
        case 0 :
            color = "black";
            break;
        case 1 :
            color = "lightblue";
            break;
        case 2 :
            color = "yellow";
            break;
        case 3 :
            color = "purple";
            break;
        case 4 :
            color = "orange";
            break;
        case 5 :
            color = "blue";
            break;
        case 6 :
            color = "red";
            break;
        case 7 :
            color = "green";
            break;
        case 8 :
            color = "#ECECEC";
            break;
    }
    return color;
}


// ***** ROTATE A SQUARE MATRIX BY -90 DEGREES *****
export function rotateMatrix90Negative(matrix) {
    const n = matrix.length;
    let matrixRotated = Array.from(Array(n), () => new Array(n).fill(0));
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            matrixRotated[row][col] = matrix[col][n - 1 - row];
        }
    }
    return matrixRotated;
}


// ***** ROTATE A SQUARE MATRIX BY +90 DEGREES *****
export function rotateMatrix90Positive(matrix) {
    const n = matrix.length;
    let matrixRotated = Array.from(Array(n), () => new Array(n).fill(0));
    let col = 0;
    while (col < n) {
        for (let row = 0; row < n; row++) {
            matrixRotated[row][col] = matrix[n - 1 - col][row];
        }
        col++;
    }
    return matrixRotated;
}