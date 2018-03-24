class Note {

  constructor(step, octave) {
    this.step = step;
    this.octave = octave;
  }

  getStep() {
    return this.step;
  }

  getOctave() {
    return this.octave;
  }

  equals(otherNote) {
    return typeof otherNote === typeof this && otherNote.octave === this.octave && otherNote.step === this.step;
  }

}

module.exports = Note;