export enum Letter { 
    C = 0, 
    D = 1, 
    E = 2, 
    F = 3, 
    G = 4, 
    A = 5, 
    B = 6 
}

function nextLetter(letter: Letter): Letter {
    if (letter === Letter.B) {
        return Letter.C;
    } else {
        return letter + 1;
    }
}

const LetterDistances = [
    2, // Semitones between C and D
    2, // Semitones between D and E
    1, // etc.
    2, 
    2, 
    2, 
    1
]

export enum Accidental { Sharp, Flat, Natural }

export default class Step {

    constructor(readonly letter: Letter, readonly accidental: Accidental = Accidental.Natural) { }

    isFlat(): boolean {
        return this.accidental === Accidental.Flat;
    }

    isSharp(): boolean {
        return this.accidental === Accidental.Sharp;
    }

    isNatural(): boolean {
        return this.accidental === Accidental.Natural;
    }

    equals(step: Step) {
        return step.letter === this.letter && step.accidental === this.accidental;
    }

    stepUpSemitone(preferredAccidental: Accidental): Step {
        const distanceToNextLetter = LetterDistances[this.letter];
        if (distanceToNextLetter === 1) {
            return new Step(nextLetter(this.letter), this.accidental);
        } else if (this.accidental === Accidental.Flat) {
            return new Step(this.letter, Accidental.Natural);
        } else if (this.accidental === Accidental.Sharp) {
            return new Step(nextLetter(this.letter), Accidental.Natural)
        } else if (preferredAccidental === Accidental.Flat) {
            return new Step(nextLetter(this.letter), Accidental.Flat);
        } else {
            return new Step(this.letter, Accidental.Sharp);
        }
    }

}