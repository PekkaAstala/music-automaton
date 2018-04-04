const Note = require('./Note');

class Chord {

  constructor(steps, type) {
    this.steps = steps;
    this.type = type;
  }

  getSteps() {
    return this.steps;
  }

  getType() {
    return this.type;
  }

  toNotes(octaveOfFirstNote, value) {
    const notes = [];
    for (let i = 0; i < this.steps.length; i++) {
      const note = new Note(this.steps[i], octaveOfFirstNote, value);
      if (i === 0 || !note.isBelow(notes[i-1])) {
        notes.push(note);
      } else {
        notes.push(note.inOctave(note.getOctave() + 1));
      }
    }
    return notes;
  }

}

module.exports = Chord;