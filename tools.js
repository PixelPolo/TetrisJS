"use strict";

import {TILE} from "./tetris.js";


// ***** DISPLAY A CELL ON CANVAS *****
export function paintCell(cell, x, y, canvas) {
    canvas.fillStyle = selectColor(cell);
    canvas.fillRect((x) * TILE, (y) * TILE, TILE, TILE);
    canvas.strokeStyle = "black";
    canvas.strokeRect((x) * TILE, (y) * TILE, TILE, TILE)
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
