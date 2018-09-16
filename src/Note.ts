import Step, { Letter, Accidental } from "./Step";

export default class Note {

  constructor(readonly step: Step, readonly octave: number, readonly duration: string = 'quarter') {
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
    return this.step.isSharp();
  }

  isFlat(): boolean {
    return this.step.isFlat();
  }

  equals(otherNote): boolean {
    return this.octave === otherNote.octave && this.step.equals(otherNote.step);
  }

  isBelow(otherNote): boolean {
    if (this.octave === otherNote.octave) {
      return this.step.letter < otherNote.step.letter;
    } else {
      return this.octave < otherNote.octave;
    }
  }

  alterOctaveBy(amount: number): Note {
    return this.inOctave(this.octave + amount);
  }

  inOctave(octave): Note {
    return new Note(this.step, octave, this.duration);
  }

  withDuration(duration): Note {
    return new Note(this.step, this.octave, duration);
  }

}