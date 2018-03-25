function getNoteInBetween(scale, noteA, noteB) {
  return scale.getNote(Math.floor((scale.getPositionOf(noteA) + scale.getPositionOf(noteB)) / 2));
}

class NoteGenerator {

  constructor(scale) {
    this.scale = scale;
  }

  generate(chords) {
    const upBeats = chords.map(chord => ({
      firstUpbeat: chord.getNotes()[Math.floor(Math.random() * 3)].alterOctave(1),
      secondUpbeat: chord.getNotes()[Math.floor(Math.random() * 3)].alterOctave(1)
    }));

    const measures = [];
    for (let i = 0; i < upBeats.length; i++) {
      measures.push([ upBeats[i].firstUpbeat,
        getNoteInBetween(this.scale, upBeats[i].firstUpbeat, upBeats[i].secondUpbeat),
        upBeats[i].secondUpbeat,
        (i === upBeats.length - 1 ? upBeats[i].secondUpbeat : getNoteInBetween(this.scale, upBeats[i].secondUpbeat, upBeats[i+1].firstUpbeat))
      ]);
    }
    return measures;
  }

}

module.exports = NoteGenerator;