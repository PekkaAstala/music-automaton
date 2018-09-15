import Scale from './Scale';
import Chord from './Chord';

export default class ChordGenerator {

  constructor(readonly scale: Scale) { }

  generate(): Array<Chord> {
    const startingPoint = [ // Alway start with first degree, etc.
      1, null, null, 5,
      1, null, null, 1,
      1, null, null, 5,
      1, null, 5, 1,
    ];
    // Fill free positions with random chords from 1 to 6 (avoiding the diminished 7th)
    const degrees = startingPoint.map(value => value ? value : Math.floor(Math.random() * 6) + 1);
    return degrees.map(degree => this.scale.getChord(degree));
  }

}