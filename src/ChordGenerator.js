class ChordGenerator {

  generateMelodyInMajor () {
    const startingPoint = [ // Alway start with first degree, etc.
      1, null, null, 5,
      1, null, null, 1,
      1, null, null, 5,
      1, null, 5, 1,
    ];
    // Fill free positions with random chords from 1 to 6 (avoiding the diminished 7th)
    return startingPoint.map(value => value ? value : Math.floor(Math.random() * 6) + 1);
  }

}

module.exports = ChordGenerator;