const Note = require('./Note');

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

  getNote(position) {
    const step = circularArray(this.steps, position - 1);
    const octaveIncrease = position % 7 === 0 && position !== 0 ? Math.floor(position / 7) - 1 : Math.floor(position / 7);
    if (this.steps[0] !== 'C' && this.steps.indexOf(step) >= this.steps.findIndex(val => val.includes('C'))) {
      return new Note (step, 5 + octaveIncrease);
    }
    return new Note (step, 4 + octaveIncrease);
  }

  getChord(degree) {
    return [
      this.getNote(degree), this.getNote(degree + 2), this.getNote(degree + 4)
    ];
  }

  getFifths() {
    if (this.steps[0].endsWith('b')) {
      return -(this.steps.filter(step => step.endsWith('b')).length);
    } else {
      return this.steps.filter(step => step.endsWith('#')).length;
    }
  }

}

module.exports = MajorScale;