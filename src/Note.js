class Note {

  constructor(step, octave, duration = 'quarter') {
    this.step = step;
    this.octave = octave;
    this.duration = duration;
  }

  getStep() {
    return this.step;
  }

  getOctave() {
    return this.octave;
  }

  getDuration() {
    return this.duration;
  }

  isSharp() {
    return this.step.endsWith('#');
  }

  isFlat() {
    return this.step.endsWith('b');
  }

  setOctave(octave) {
    return new Note(this.step, octave, this.duration);
  }

  alterOctave(amount) {
    return new Note(this.step, this.octave + amount);
  }

  asQuarterNote() {
    return new Note(this.step, this.octave, 'quarter');
  }

  asWholeNote() {
    return new Note(this.step, this.octave, 'whole');
  }

}

module.exports = Note;