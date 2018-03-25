function getNoteInBetween(scale, noteA, noteB) {
  return scale.getNote((scale.getPositionOf(noteA) + scale.getPositionOf(noteB)) / 2);
}

class NoteGenerator {

  constructor(scale) {
    this.scale = scale;
  }

  generate(chords) {
    return chords.map(chord => {
      const firstUpbeat = chord.getNotes()[Math.floor(Math.random() * 3)].alterOctave(1);
      const secondUpbeat = chord.getNotes()[Math.floor(Math.random() * 3)].alterOctave(1);
      return [ firstUpbeat, getNoteInBetween(this.scale, firstUpbeat, secondUpbeat), secondUpbeat, secondUpbeat ];
    });
  }

}

module.exports = NoteGenerator;