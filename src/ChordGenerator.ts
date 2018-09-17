import Scale from './Scale';
import Chord from './Chord';
import Staff, { Clef } from './Staff';
import { Duration } from './Note';

export default class ChordGenerator {

  constructor(readonly scale: Scale) { }

  generate(): Array<Staff> {
    const startingPoint = [ // Always start with first degree, etc.
      1, null, null, 5,
      1, null, null, 1,
      1, null, null, 5,
      1, null, 5, 1,
    ];
    // Fill free positions with random chords from 1 to 6 (avoiding the diminished 7th)
    const degrees = startingPoint.map(value => value ? value : Math.floor(Math.random() * 6) + 1);
    return degrees.map(degree => new Staff(Clef.bass, this.scale.getChord(degree).toNotes(3, Duration.Whole)));
  }

}