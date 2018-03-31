class Note {

  constructor(step, octave, duration = 'quarter') {
    this.step = step;
    this.octave = octave;
    this.duration = duration;
    //notes might need an alteration attribute?  How are tey going to be treated in the future
    // for future possible MIDI functions, could be interesting to use MIDI note ID attribute
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
    return new Note(this.step, octave, this.duration);
  }

  withDuration(duration) {
    return new Note(this.step, this.octave, duration);
  }

}

module.exports = Note;