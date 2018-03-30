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
    if (index === this.steps.length - 1) {
      return new Note(this.steps[0], note.getOctave() + 1, note.getDuration());
    } else {
      return new Note(this.steps[index + 1], note.getOctave(), note.getDuration());
    }
  }

  getNoteRange(firstNote, lastNote) {
    const range = [firstNote];
    for (let cur = firstNote; cur.isBelow(lastNote); cur = this.stepUp(cur)) {
      range.push(cur);
    }
    return range;
  }

}

module.exports = MajorScale;