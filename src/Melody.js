class Melody {

  constructor(metaData, fifths, harmonicMeasures, notes) {
    this.metaData = metaData;
    //this.title = title;
    this.fifths = fifths;
    this.measures = harmonicMeasures.map((harmonicMeasure, index) => ({
      number: index + 1,
      harmonic: harmonicMeasure,
      melodic: notes[index],
      fifths: fifths
    }));
  }

  getTitle() {
    return this.metaData.getTitle();
  }

  getMeasures() {
    return this.measures;
  }

}

module.exports = Melody;