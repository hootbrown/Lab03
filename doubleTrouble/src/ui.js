//Blake Gilmore 4/10

// The ui object handles all interaction with the HTML document.
// It only modifies visual elements and relies on gameLogic for data.


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


export class Ui {
      dominoElements = [];
      cacheDominoElements() {
        this.dominoElements = [];
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            this.dominoElements.push(document.getElementById(i));
        }
    }

    // Shows the back for all dominos.
    showAllBacks() {
          for (let i = 0; i < this.dominoElements.length; i++) {
            this.showDominoBack(i);
        }
        
        
        // TODO: iterate over dominoElements and show the back for each domino.
        //DONE!!
    }

    // Shows the back of one domino based on its index.
    showDominoBack(index) {
        let html = '<div class="domino-back">';
        html += '</div>';
        this.dominoElements[index].classList.remove('selected')
        this.dominoElements[index].innerHTML = html;

        // TODO: show the back of the domino at the given index.
        //DONE!!
    }

    // Shows the face of one domino based on its index and domino object.
    showDominoFace(index, domino) {
        let html = '<div class="domino-face">';
          html += this.buildHalfHTML(domino.left);
          html += this.buildHalfHTML(domino.right);
          html += '</div>';
         this.dominoElements[index].innerHTML = html;

        // TODO: show the face of the domino at the given index.
        //DONE!!
    }

    // Builds the inner HTML for one domino half using a 3×3 pip grid.
    // Positions 1–9 map left-to-right, top-to-bottom; active positions get the .pip class.
    buildHalfHTML(pipCount) {
        let html = `<div class="domino-half">`;
        for (let pos = 1; pos <= 9; pos++) {
            let hasPip = PIP_LAYOUTS[pipCount].includes(pos);
            html += `<span class="pip-cell${hasPip ? ' pip' : ''}"></span>`;
        }
        html += '</div>';
        return html;
    }

    // Adds the amber selection highlight to the first-picked domino.
    highlightDomino(index) {
        this.dominoElements[index].classList.add('selected');
    }

    // Disables one domino based on its index.
    disableDomino(index) {
        var gameDomino = this.dominoElements[index];
        gameDomino.onclick = () => { };   
        gameDomino.style.cursor = 'not-allowed';
    }   
        // DONE!!

    // Disables all dominos.
    disableAllDominoes() {
           for (let i = 0; i < this.dominoElements.length; i++) {
            this.disableDomino(i);
        }
    }//DONE!!

    // Assigns the clickHandler function to dominos (all dominos by default,
    // or only those still on the board when onlyRemaining is true).
    enableAllDominoes(clickHandler, onlyRemaining = false) {
 //DEFAULT PARAMETER       
        for (let i = 0; i < NUMBER_OF_DOMINOES; i++) {
            let el = this.dominoElements[i];
            if (!onlyRemaining || !el.classList.contains('removed')) {
                el.onclick = clickHandler;
                el.style.cursor = 'pointer';
            }
        }
    }

    // Removes one domino from the board by hiding it while keeping its grid space.
    removeDomino(index) {
        let element = this.dominoElements[index];
        element.classList.add('removed');
        this.dominoElements[index].innerHTML = "";
        
        // TODO: remove the domino at the given index from the board.
    }

    updateScore(cleared, turns, sum = 0) {
//DEFAULT PARAMETER
        document.getElementById('status').innerHTML =
            `Cleared: ${cleared}  Turns: ${turns}  Sum: ${sum}`;
      
        // TODO: show cleared, turns, and sum in the status element.
    }

    // Replaces the score display with a win message.
    showWin(turns) {
        document.getElementById('status').innerHTML =
            `You cleared the board in ${turns} turn${(turns === 1 ? '' : 's')}!`;
    }
};


