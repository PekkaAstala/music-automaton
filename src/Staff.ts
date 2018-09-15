import Note from "./Note";

export enum Clef {
    'bass', 'treble'
}

export default class Staff {    

    constructor (readonly clef: Clef, readonly notes: Array<Note>) {

    }

}