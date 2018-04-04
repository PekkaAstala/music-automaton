class TimeSignature {

  constructor (beat, value) {
    this.beat = beat;
    this.value = value;
  }

  getBeat() {
    return this.beat;
  }

  getValue() {
    return this.value;
  }

}

module.exports = TimeSignature;