const Note = require('./Note');
const Chord = require('./Chord');

const stepsByScale = {
  'C': [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ],
  'D': [ 'D', 'E', 'F#', 'G', 'A', 'B', 'C#' ],
  'E': [ 'E', 'F#', 'G#', 'A', 'B', 'C#', 'D#' ],
  'F': [ 'F', 'G', 'A', 'Bb', 'C', 'D', 'E' ],
  'G': [ 'G', 'A', 'B', 'C', 'D', 'E', 'F#' ],
  'A': [ 'A', 'B', 'C#', 'D', 'E', 'F#', 'G#' ],
  'B': [ 'B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#' ],
  'Db': [ 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C' ],
  'Eb': [ 'Eb', 'F', 'G', 'Ab', 'Bb', 'C' ],
  'F#': [ 'F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#' ],
  'Ab': [ 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G' ],
  'Bb': [ 'Bb', 'C', 'D', 'Eb', 'F', 'G', 'A' ]
};

const circularArray = (array, index) => {
  const calculatedIndex = ((index + 1) % array.length) - 1;
  return calculatedIndex < 0 ? array[calculatedIndex + array.length] : array[calculatedIndex];
};

class MajorScale {

  constructor(firstStep) {
    //if scale entry doesn't match, find enharmonic degree
    this.steps = stepsByScale[firstStep];
  }

  getStep(degree) {
    return circularArray(this.steps, degree - 1);
  }

  getChord(degree) {
    const types = [ 'Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'dim' ];
    return new Chord([this.getStep(degree), this.getStep(degree + 2), this.getStep(degree + 4)], types[degree - 1]);
  }

  getFifths() {
    if (this.steps[0].endsWith('b')) {
      return -(this.steps.filter(step => step.endsWith('b')).length);
    } else {
      return this.steps.filter(step => step.endsWith('#')).length;
    }
  }

  stepUp(note) {
    const index = this.steps.indexOf(note.getStep());
    let step = this.steps[index + 1];
    if (step === undefined) {
      step = this.steps[0];
    }
    let octave = note.getOctave();
    if (step.substring(0, 1) === 'C') {
      octave = octave + 1;
    }

    return new Note(step, octave, note.getDuration());
  }

  stepDown(note) {
    const index = this.steps.indexOf(note.getStep());
    let step = this.steps[index - 1];
    if (step === undefined) {
      step = this.steps[this.steps.length - 1];
    }
    let octave = note.getOctave();
    if (step.substring(0, 1) === 'B') {
      octave = octave - 1;
    }

    return new Note(step, octave, note.getDuration());
  }

  getNoteRange(firstNote, lastNote) {
    if (firstNote.equals(lastNote)) {
      return [ firstNote ];
    }

    const rangeAscending = (noteA, noteB) => {
      const range = [ noteA ];
      for (let cur = this.stepUp(noteA); cur.isBelow(noteB) || cur.equals(noteB); cur = this.stepUp(cur)) {
        range.push(cur);
      }
      return range;
    };

    const rangeDescending = (noteA, noteB) => {
      const range = [ noteA ];
      for (let cur = this.stepDown(noteA); noteB.isBelow(cur) || cur.equals(noteB); cur = this.stepDown(cur)) {
        range.push(cur);
      }
      return range;
    };

    return firstNote.isBelow(lastNote) ? rangeAscending(firstNote, lastNote) : rangeDescending(firstNote, lastNote);
  }


}

module.exports = MajorScale;