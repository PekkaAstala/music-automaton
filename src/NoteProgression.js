function generate(chords) {
  return chords.map(chord => [
    chord.getNotes()[1].alterOctave(1),
    chord.getNotes()[1].alterOctave(1),
    chord.getNotes()[1].alterOctave(1),
    chord.getNotes()[1].alterOctave(1),
  ]);
}

module.exports = { generate };