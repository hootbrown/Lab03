//Blake Gilmore 4/11

import {ui} from "./ui.js";
import {gameLogic} from "./gameLogic.js";

/*  Overview
    Double Trouble is a domino-clearing game with 15 dominos.
    Players can click one "Double" domino (both halves equal, e.g. [4|4]) to
    remove it instantly, OR click two standard dominos whose total pip count
    adds up to 12. Non-matching pairs are shown for 2 seconds then flipped back.
    The game ends when all 15 dominos are cleared from the board.
*/
//Blake Gilmore CS233 Lab 1 Part 2
// -------------------- Constants --------------------
const NUMBER_OF_DOMINOES = 15;

// Pip positions (1–9) active for each face value in a 3×3 grid:
//   1 2 3  (top row)
//   4 5 6  (middle row)
//   7 8 9  (bottom row)
const PIP_LAYOUTS = {
    0: [],
    1: [5],
    2: [3, 7],
    3: [3, 5, 7],
    4: [1, 3, 7, 9], 
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
};

// -------------------- Main Flow --------------------
// These functions act as the "glue" between the game logic and the UI
// which are defined in sections below.

// Initializes the page after it's loaded.
const init = () => {
    ui.cacheDominoElements();
    gameLogic.fillDominoes();
    gameLogic.shuffleDominoes();
    ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
    ui.enableAllDominoes(handleClick);
    ui.showAllBacks();
};

// This function is called when the user clicks on a domino.
// It coordinates between the ui showing the domino and game logic tracking the pick.
function handleClick() {
    const CHECK_DELAY_MS = 4000;
    let index = Number(this.id);  // index represents the domino location in the dominoes array and on the page.
    const isFirstPick = gameLogic.firstPick === -1;
    const {dominoes} = gameLogic;

    gameLogic.pickDomino(index);

    if (dominoes[index].isDouble && isFirstPick) {
        // Doubles are shown then removed after the delay and count as one turn.
        ui.showDominoFace(index, dominoes[index]);
        ui.disableAllDominoes();
        ui.updateScore(gameLogic.cleared, gameLogic.turns, dominoes[index].totalPips);
        
        setTimeout(() => {
            gameLogic.turns++;
            gameLogic.cleared++;
            ui.removeDomino(index);
            ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
            gameLogic.resetPicks();
    
            if (gameLogic.cleared === NUMBER_OF_DOMINOES) {
                ui.showWin(gameLogic.turns);
            } else {
                ui.enableAllDominoes(handleClick, true);
            }
        }, CHECK_DELAY_MS);
    } else {
        // Non-double: show the face and disable the tile.
        ui.showDominoFace(index, dominoes[index]);
        ui.disableDomino(index);

        let sum = dominoes[gameLogic.firstPick].totalPips;
        if (gameLogic.secondPick !== -1) {
            sum += dominoes[gameLogic.secondPick].totalPips;
        }
        ui.updateScore(gameLogic.cleared, gameLogic.turns, sum);

        if (gameLogic.secondPick !== -1) {
            // Second pick set — wait, then check for a sum-to-12 match.
            ui.disableAllDominoes();
            setTimeout(completeTurn, CHECK_DELAY_MS);
        } else {
            // First pick — highlight it and wait for any second pick.
            ui.highlightDomino(index);
        }
    }
}

// Checks the 2 non-double dominos that have been picked for a sum-to-12 match.
const completeTurn = () => {
    gameLogic.turns++;
    const {firstPick, secondPick} = gameLogic;

    if (gameLogic.isMatch()) {
        gameLogic.cleared += 2;
        ui.removeDomino(firstPick);
        ui.removeDomino(secondPick);
    } else {
        ui.showDominoBack(firstPick);
        ui.showDominoBack(secondPick);
    }

    ui.updateScore(gameLogic.cleared, gameLogic.turns, 0);
    gameLogic.resetPicks();

    if (gameLogic.cleared === NUMBER_OF_DOMINOES) {
        ui.showWin(gameLogic.turns);
    } else {
        ui.enableAllDominoes(handleClick, true);
    }
};

window.onload = init;


