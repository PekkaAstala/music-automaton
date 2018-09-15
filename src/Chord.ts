import Note from './Note';

export default class {

  constructor(readonly steps: Array<string>, readonly type: string) { }

  getSteps(): Array<string> {
    return this.steps;
  }

  getType(): string {
    return this.type;
  }

  toNotes(octaveOfFirstNote: number, duration: string): Array<Note> {
    const notes = [];
    for (let i = 0; i < this.steps.length; i++) {
      const note = new Note(this.steps[i], octaveOfFirstNote, duration);
      if (i === 0 || !note.isBelow(notes[i-1])) {
        notes.push(note);
      } else {
        notes.push(note.inOctave(note.getOctave() + 1));
      }
    }
    return notes;
  }

}