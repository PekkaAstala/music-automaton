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

  isSharp() {
    return this.step.endsWith('#');
  }

  isFlat() {
    return this.step.endsWith('b');
  }

  setOctave(octave) {
    return new Note(this.step, octave);
  }

  alterOctave(amount) {
    return new Note(this.step, this.octave + amount);
  }

}

module.exports = Note;