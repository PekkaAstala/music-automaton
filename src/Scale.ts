import Note from './Note';
import Chord from './Chord';

const NotesOrder : Array<string> = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MajorSteps : Array<number> = [2, 2, 1, 2, 2, 2, 1];
const KeyIds =
{'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3,'Eb': 3, 'E': 4, 'E#': 5, 'Fb': 4,
  'F': 5, 'F#': 6, 'Gb': 6,'G': 7,'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11, 'B#': 0, 'Cb': 11,};

const circularArray = <T>(array: Array<T>, index: number): T => {
  const calculatedIndex: number = ((index + 1) % array.length) - 1;
  return calculatedIndex < 0 ? array[calculatedIndex + array.length] : array[calculatedIndex];
};

const modeIndexes = {
  'I': 0,
  'II': 1,
  'III': 2,
  'IV': 3,
  'V': 4,
  'VI': 5,
  'VII': 6
};

const getScale = function(tonic, mode) {
  const indexOfTonic = NotesOrder.findIndex(element => tonic.startsWith(element));
  const scaleArray = NotesOrder.slice(indexOfTonic, 7).concat(NotesOrder.slice(0, indexOfTonic));
  scaleArray[0] = tonic;

  const modeSteps = MajorSteps.slice(modeIndexes[mode], 7).concat(MajorSteps.slice(0, modeIndexes[mode]));

  for (let i = 0; i < scaleArray.length - 1; i++) {

    let idCur = KeyIds[scaleArray[i]];
    let idNext = KeyIds[scaleArray[i+1]];

    let differencesInIds;
    if (idCur > idNext) {
      differencesInIds = idNext - idCur + 12;
    } else {
      differencesInIds = idNext - idCur;
    }

    if (differencesInIds < modeSteps[i] ){
      scaleArray[i+1] = scaleArray[i+1] + '#';
    }

    if (differencesInIds > modeSteps[i] ){
      scaleArray[i+1] = scaleArray[i+1] + 'b';
    }

  }

  return scaleArray;
};

export default class Scale {
  steps: Array<string>;

  constructor(tonic, readonly mode: string) {
    this.steps = getScale(tonic, mode);
  }

  getStep(degree: number) {
    return circularArray(this.steps, degree - 1);
  }

  getChord(degree: number): Chord {
    const types = [ 'Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'dim' ];
    return new Chord([this.getStep(degree), this.getStep(degree + 2), this.getStep(degree + 4)], types[degree - 1]);
  }

  getFifths() : number {
    if (this.steps[0].endsWith('b')) {
      return -(this.steps.filter(step => step.endsWith('b')).length);
    } else {
      return this.steps.filter(step => step.endsWith('#')).length;
    }
  }

  stepUp(note: Note) : Note {
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

  stepDown(note: Note) : Note {
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

  getNoteRange(firstNote: Note, lastNote: Note) : Array<Note> {
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