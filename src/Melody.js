class Melody {

  constructor(fifths, harmonicMeasures, notes) {
    this.fifths = fifths;
    this.measures = harmonicMeasures.map((harmonicMeasure, index) => ({
      number: index + 1,
      harmonic: harmonicMeasure,
      melodic: notes[index],
      fifths: fifths
    }));
  }

  getMeasures() {
    return this.measures;
  }

}

module.exports = Melody;