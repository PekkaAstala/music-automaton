class Note {

  constructor(step, octave, value = 4) {
    this.step = step;
    this.octave = octave;
    this.value = value;
    //notes might need an alteration attribute?  How are tey going to be treated in the future
    // for future possible MIDI functions, could be interesting to use MIDI note ID attribute
  }

  getStep() {
    return this.step;
  }

  getOctave() {
    return this.octave;
  }

  getValue() {
    return this.value;
  }

  getType() {
    switch (this.value) {
    case 1: return 'whole';
    case 2: return 'half';
    case 4: return 'quarter';
    case 8: return 'eigth';
    case 16: return '16th';
    case 32: return '32nd';
    default: throw 'Value (' + this.value + ') can\'t be converted to type!';
    }
  }

  isSharp() {
    return this.step.endsWith('#');
  }

  isFlat() {
    return this.step.endsWith('b');
  }

  equals(otherNote) {
    return this.octave === otherNote.octave && this.step === otherNote.step;
  }

  isBelow(otherNote) {
    if (this.octave === otherNote.octave) {
      const indexes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      return indexes.indexOf(this.step.substring(0, 1)) < indexes.indexOf(otherNote.step.substring(0, 1));
    } else {
      return this.octave < otherNote.octave;
    }
  }

  inOctave(octave) {
    return new Note(this.step, octave, this.value);
  }

  withValue(value) {
    return new Note(this.step, this.octave, value);
  }

}

module.exports = Note;