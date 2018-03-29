function getNoteInBetween(scale, noteA, noteB) {
  const range = scale.getNoteRange(noteA, noteB);
  return range[Math.floor(range.length / 2)];
}

class NoteGenerator {

  constructor(scale) {
    this.scale = scale;
  }

  generate(chords) {
    const upBeats = chords.map(chord => {
      const firstRandomChord = chord.toNotes(4, 'quarter')[Math.floor(Math.random() * 3)];
      const secondRandomChord = chord.toNotes(4, 'quarter')[Math.floor(Math.random() * 3)];

      return {
        firstUpbeat: firstRandomChord.inOctave(firstRandomChord.getOctave() + 1),
        secondUpbeat: secondRandomChord.inOctave(secondRandomChord.getOctave() + 1)
      };
    });

    const measures = [];
    for (let i = 0; i < upBeats.length; i++) {
      if (i === upBeats.length - 1) {
        measures.push([upBeats[i].firstUpbeat.withDuration('whole')]);
      } else {
        measures.push([ upBeats[i].firstUpbeat,
          getNoteInBetween(this.scale, upBeats[i].firstUpbeat, upBeats[i].secondUpbeat),
          upBeats[i].secondUpbeat,
          (upBeats[i+1] ? getNoteInBetween(this.scale, upBeats[i].secondUpbeat, upBeats[i+1].firstUpbeat) : upBeats[i].secondUpbeat)
        ]);
      }
    }
    return measures;
  }

}

module.exports = NoteGenerator;