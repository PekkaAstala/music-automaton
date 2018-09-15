export default class Melody {
  measures: Array<{}>;

  constructor(readonly fifths: number, harmonicMeasures, notes) {
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