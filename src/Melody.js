class Melody {

  constructor(title, fifths, harmonicMeasures, notes) {
    this.title = title;
    this.fifths = fifths;
    this.measures = harmonicMeasures.map((harmonicMeasure, index) => ({
      number: index + 1,
      harmonic: harmonicMeasure,
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