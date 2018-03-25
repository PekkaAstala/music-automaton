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

  getAccidental() {
    if (this.step.endsWith('#')) {
      return 'sharp';
    } else if (this.step.endsWith('b')) {
      return 'flat';
    } else {
      return null;
    }
  }

}

module.exports = Note;