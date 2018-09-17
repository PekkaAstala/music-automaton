import Note from './Note';
import Chord, { ChordType } from './Chord';
import Step, { Letter, Accidental } from './Step';

const { Flat, Natural, Sharp } = Accidental;
const { C, D, E, F, G, A, B } = Letter;

const NotesOrder : Array<string> = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MajorSteps : Array<number> = [2, 2, 1, 2, 2, 2, 1];
const ChordTypes = [ ChordType.Major, ChordType.Minor, ChordType.Minor, ChordType.Major, ChordType.Major, ChordType.Minor, ChordType.Diminished ];

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

const getScale = function(tonic: Step, mode): Array<Step> {
  const modeSteps = MajorSteps.slice(modeIndexes[mode], 7).concat(MajorSteps.slice(0, modeIndexes[mode]));

  const stepArray: Array<Step> = [ tonic ];
  for (let i = 0; i < modeSteps.length - 1; i++) {
    const prevStep = stepArray[stepArray.length - 1];
    const preferredAccidental = tonic.isFlat() ? Flat : Sharp;
    if (modeSteps[i] === 1) {
      stepArray.push(prevStep.stepUpSemitone(preferredAccidental))
    } else {
      stepArray.push(prevStep.stepUpSemitone(preferredAccidental).stepUpSemitone(preferredAccidental));
    }
  }

  return stepArray;
};

export default class Scale {
  steps: Array<Step>;
  chordTypes: Array<ChordType>;

  constructor(tonic: Step, readonly mode: string) {
    this.steps = getScale(tonic, mode);
    const indexOfTonic = NotesOrder.findIndex(element => Letter[tonic.letter].startsWith(element));
    this.chordTypes = ChordTypes.slice(indexOfTonic, 7).concat(ChordTypes.slice(0, indexOfTonic));
  }

  getStep(degree: number): Step {
    return circularArray(this.steps, degree - 1);
  }

  getChord(degree: number): Chord {
    return new Chord([this.getStep(degree), this.getStep(degree + 2), this.getStep(degree + 4)], this.chordTypes[degree - 1]);
  }

  getFifths() : number {
    if (this.steps[0].isFlat()) {
      return -(this.steps.filter(step => step.isFlat()).length);
    } else {
      return this.steps.filter(step => step.isSharp()).length;
    }
  }

  stepUp(note: Note) : Note {
    const stepIndex = this.steps.findIndex(step => step.equals(note.step));
    const newStepIndex = stepIndex === this.steps.length - 1 ? 0 : stepIndex + 1;
    const newStep = this.steps[newStepIndex];
    const increaseOctave = newStep.letter === C;
    return new Note(newStep, increaseOctave ? note.octave + 1 : note.octave, note.duration);
  }

  stepDown(note: Note) : Note {
    const stepIndex = this.steps.findIndex(step => step.equals(note.step));
    const newStepIndex = stepIndex === 0 ? this.steps.length - 1 : stepIndex - 1;
    const newStep = this.steps[newStepIndex];
    const decreaseOctave = newStep.letter === B;
    return new Note(newStep, decreaseOctave ? note.octave - 1 : note.octave, note.duration);
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