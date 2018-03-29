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

  inOctave(octave) {
    return new Note(this.step, octave, this.duration);
  }

  withDuration(duration) {
    return new Note(this.step, this.octave, duration);
  }

}

module.exports = Note;