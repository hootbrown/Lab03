//Blake Gilmore 4/11

// -------------------- Core Logic --------------------
// The gameLogic object handles the rules and state of the game.
// It does not interact with the HTML document or CSS styles.

// Domino object constructor used in gameLogic object.

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

function Domino(left, right) {
    this.left = left;
    this.right = right;
    this.isDouble = (left === right);
    this.totalPips = left + right;
}

export const gameLogic = {
    dominoes: [],
    firstPick: -1,   // index of the first domino picked, -1 if none yet
    secondPick: -1,  // index of the second domino picked, -1 if none yet
    cleared: 0,      // number of dominos cleared so far
    turns: 0,        // number of turns taken so far

    // Fills the dominoes array with a fixed curated set of 15 dominos:
    //   3 doubles (removed instantly) + 6 non-double pairs that each sum to 12.
    fillDominoes: function() {
        this.dominoes.push(new Domino(6,6), new Domino(1,1), new Domino(4,4),
         new Domino(4,3), new Domino(3,2), new Domino (6,4), 
         new Domino(2,0), new Domino(1,5), new Domino(4,2), 
         new Domino(0,1), new Domino(6,5), new Domino(4,1), 
         new Domino(6,1), new Domino(5,4), new Domino(2,1));
        
    }, //DONE!!

    // Shuffles the elements in the dominoes array.
    shuffleDominoes: function() {
          for (let i = 0; i < this.dominoes.length; i++) {
        let rndIndex = Math.floor(Math.random() * this.dominoes.length);
        let temp = this.dominoes[i];
        this.dominoes[i] = this.dominoes[rndIndex];
        this.dominoes[rndIndex] = temp;
    }}, //DONE!!

    // Records a player's domino pick.
    pickDomino: function(index) {
        if (this.firstPick === -1){ this.firstPick = index

        }else{

            this.secondPick = index;
        }
        //DONE!!!!
    },

    // Resets the picks for the next turn.
    resetPicks: function() {

       this.firstPick = -1;
       this.secondPick = -1;
    }, //DONE!!

    // Returns true when the two picked non-double dominos sum to exactly 12 pips.
    isMatch: function() {
        let hasMatched = false;
        if (this.dominoes[this.firstPick].totalPips+ this.dominoes[this.secondPick].totalPips === 12) {
            hasMatched = true;
        } else { hasMatched = false;
            }
            return hasMatched;
    }
};  //DONE!!
