export enum Letter { 
    C = 0, 
    D = 1, 
    E = 2, 
    F = 3, 
    G = 4, 
    A = 5, 
    B = 6 
}

export enum Accidental { Sharp, Flat, Natural }

export default class Step {

    constructor(readonly letter: Letter, readonly accidental: Accidental = Accidental.Natural) {

    }

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

}