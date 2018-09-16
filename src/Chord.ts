import Note from './Note';
import Step from './Step';

export enum ChordType { Major, Minor, Augmented, Diminished }

export default class {

  constructor(readonly steps: Array<Step>, readonly type: ChordType) { }

  getSteps(): Array<Step> {
    return this.steps;
  }

  toNotes(octaveOfFirstNote: number, duration: string): Array<Note> {
    const notes = [];
    for (let i = 0; i < this.steps.length; i++) {
      const note = new Note(this.steps[i], octaveOfFirstNote, duration);
      if (i === 0 || !note.isBelow(notes[i-1])) {
        notes.push(note);
      } else {
        notes.push(note.alterOctaveBy(1));
      }
    }
    return notes;
  }

}