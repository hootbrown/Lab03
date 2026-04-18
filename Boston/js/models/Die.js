// Written by Brian Bird, 4/10/2026
// This class represents a single die in the game.
// Blake Gilmore 4/17/26. AI used to help tutor and debug
export default class Die {
    constructor() {
        this.value = 1;
        this.isHeld = false;
    }

    roll() {
        if (!this.isHeld) {
            this.value = Math.floor(Math.random() * 6) + 1;
        }
        return this.value;
    }

    hold() {
        this.isHeld = true;
    }

    // Prepares the die for a new turn by clearing the held state and resetting the value.
    reset() {
        this.isHeld = false;
        this.value = 1;
    }
}
