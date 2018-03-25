class Melody {

  constructor(title, fifths, chords, notes) {
    this.title = title;
    this.fifths = fifths;
    this.measures = chords.map((chord, index) => ({
      number: index + 1,
      harmonic: chord.getNotes(),
      melodic: notes[index],
      fifths: fifths
    }));
  }

  getTitle() {
    return this.title;
  }

  getMeasures() {
    return this.measures;
  }

}

module.exports = Melody;