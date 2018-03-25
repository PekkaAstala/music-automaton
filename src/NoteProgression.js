function generate(chords) {
  return chords.map(chord => {
    const randomNoteInChord = chord.getNotes()[Math.floor(Math.random() * 3)].alterOctave(1);
    return [ randomNoteInChord, randomNoteInChord, randomNoteInChord, randomNoteInChord ];
  });
}

module.exports = { generate };