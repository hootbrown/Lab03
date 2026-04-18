// Written by Brian Bird, 4/10/2026 using Gemini 3.1 in Antigravity.
// Blake Gilmore 4/17/26. AI used to help tutor and debug
// This class represents a player in the game.
export default class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.turn = 0; //ADDED
    }

    // Encapsulates score updates so that only the Player controls its own data.
    setScore(score) {
        this.score = score;
    }
}
