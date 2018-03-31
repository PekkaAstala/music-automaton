const Note = require('./Note');
const Chord = require('./Chord');

const NotesOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MajorSteps = ['2', '2', '1', '2', '2', '2', '1'];
const KeyIds =
{'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3,'Eb': 3, 'E': 4, 'E#': 5, 'Fb': 4,
  'F': 5, 'F#': 6, 'Gb': 6,'G': 7,'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11, 'B#': 0, 'Cb': 11,};

const stepsByMajorScale = {
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

const stepsByMinorScale = {
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

class Scale {

  constructor(tonic, mode) {
    //case if scale entry doesn't match, find enharmonic degree
    this.mode = mode;
    if (this.mode == 'I'){
      //calls a function that cares about creating the proper scale array
      //this.steps = KeyIds[tonic];
      this.steps = stepsByMajorScale[tonic];
    }

    else if (this.mode == 'VI'){
      this.steps = stepsByMinorScale[tonic];
    }

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

  /**
  * This function creates an array of strings containing the notes of a given scale (firstStep) accordingly to to the
  * mode (mode) given as parameter.
  *
  * @param {string} firstStep       first note of the scale (tonic or name of the key)
  * @param {mode} string            mode of the scale represented by a roman number from I to VII (I = Major VI = minor)
  * @return {array}                 returns an array of strings representing the degrees of the scale.
  */

  getMajorScale(firstStep, mode) {

    // 1- create an array with the proper note names const NotesOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    const scaleArray = [];

    for (let i = 0; i < 7; i++) {
      scaleArray.push(NotesOrder[this.firstStep] + i);
    }

    for (let i = 0; i < scaleArray.length(); i++) {
      scaleArray.push(NotesOrder[this.firstStep] + i);
    }

    //2- verify if distances are okay (if distance between array [0] and [1] == Major Steps [0])  --> const MajorSteps = ['2', '2', '1', '2', '2', '2', '1']
    //if < or > replace with appropriate note -- chose one with the appropriate number that match the name of the notes

    let noteName, noteKeyID;
    for (let i = 0; i < scaleArray.length(); i++) {
      if (KeyID[scaleArray[i+1]] - KeyID[scaleArray[i]] < MajorSteps[i] ){

        noteName = scaleArray[i+1];
        noteKeyID = KeyID[scaleArray[i]];
        // imcomplete

      }

      if (KeyID[scaleArray[i+1]] - KeyID[scaleArray[i]] < MajorSteps[i] ){

        noteName = scaleArray[i+1];
        noteKeyID = KeyID[scaleArray[i]];
        // imcomplete

      }

      if (KeyID[scaleArray[i+1]] - KeyID[scaleArray[i]] < MajorSteps[i] ){

        noteName = scaleArray[i+1];
        noteKeyID = KeyID[scaleArray[i]];
        // imcomplete

      }
    }

    return scaleArray;
  }


}

module.exports = Scale;