class Melody {

  constructor(title, timeSignature, fifths, harmonicMeasures, notes) {
    this.title = title;
    this.timeSignature = timeSignature;
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

  getTimeSignature() {
    return this.timeSignature;
  }

}

module.exports = Melody;