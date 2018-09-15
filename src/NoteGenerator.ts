import Scale from './Scale';
import Staff, { Clef } from './Staff';
import Note from './Note';
import Measure from './Measure';

function getNoteInBetween(scale, noteA, noteB) {
  const range = scale.getNoteRange(noteA, noteB);
  return range[Math.floor(range.length / 2)];
}

function pickRandom<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default class NoteGenerator {

  constructor(readonly scale: Scale) { }

  generate(fifths: number, bassStaves: Array<Staff>): Array<Measure> {
    const upbeats: Array<{first: Note, second: Note}> = bassStaves.map((staff, index): {first: Note, second: Note} => ({
      first: pickRandom(staff.notes).withDuration('quarter').alterOctaveBy(1),
      second: pickRandom(staff.notes).withDuration('quarter').alterOctaveBy(1)
    }));

    const trebleStaves = bassStaves.map((staff, index) => {
      if (index === bassStaves.length - 1) {
        return new Staff(Clef.treble, [ upbeats[index].first.withDuration('whole') ]);
      } else {
        return new Staff(Clef.treble, [
          upbeats[index].first,
          getNoteInBetween(this.scale, upbeats[index].first, upbeats[index].second),
          upbeats[index].second,
          getNoteInBetween(this.scale, upbeats[index].second, upbeats[index+1].first)
        ]);
      }
    });

    return bassStaves.map((bassStaff, index) => new Measure(index+1, fifths, [ bassStaff, trebleStaves[index]]));
  }

}