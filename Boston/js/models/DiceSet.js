// Blake Gilmore 4/17/26. AI used to help tutor and debug
import Die from './Die.js';

export default class DiceSet {
    constructor() {
        this.dice = [];
        for (let i = 0; i < 3; i++) {
            this.dice.push(new Die());
        }
    
    }


    rollAll() {
        for (const die of this.dice) {
            die.roll();
        }
        this.evaluateDice();
    }

    evaluateDice() {

        let highestValue = 0;
        let highestDie = null;

        for (let i = 0; i < this.dice.length ; i++){ //CHANGED. loops through the array created by this dice to find the highest.
             if (this.dice[i].value > highestValue) {
                highestValue = this.dice[i].value ;
                highestDie = this.dice[i]
             } 
        }     

       highestDie.hold();
    }



    getCurrentGameScore() {
        // CHANGED. Took out qualifying code and simplified it to just add value of dice.
            let total = 0;
            for (const die of this.dice) {
                total += die.value;
            }
            return total 
    }
    

    reset() {
        
        for (const die of this.dice) {
            die.reset();
        }
    
    }
}