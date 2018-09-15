export default class Note {

  constructor(readonly step: string, readonly octave: number, readonly duration: string = 'quarter') {
    //notes might need an alteration attribute?  How are tey going to be treated in the future
    // for future possible MIDI functions, could be interesting to use MIDI note ID attribute
  }

  getStep() {
    return this.step;
  }

  getOctave(): number {
    return this.octave;
  }

  getDuration() {
    return this.duration;
  }

  isSharp(): boolean {
    return this.step.endsWith('#');
  }

  isFlat(): boolean {
    return this.step.endsWith('b');
  }

  equals(otherNote): boolean {
    return this.octave === otherNote.octave && this.step === otherNote.step;
  }

  isBelow(otherNote): boolean {
    if (this.octave === otherNote.octave) {
      const indexes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      return indexes.indexOf(this.step.substring(0, 1)) < indexes.indexOf(otherNote.step.substring(0, 1));
    } else {
      return this.octave < otherNote.octave;
    }
  }

  inOctave(octave): Note {
    return new Note(this.step, octave, this.duration);
  }

  withDuration(duration): Note {
    return new Note(this.step, this.octave, duration);
  }

}