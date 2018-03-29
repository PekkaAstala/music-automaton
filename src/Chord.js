const Note = require('./Note');

class Chord {

  constructor(steps, type) {
    this.steps = steps;
    this.type = type;
  }

  getSteps() {
    return this.steps;
  }

  getType() {
    return this.type;
  }

  toNotes(octaveOfFirstNote, duration) {
    return this.steps.map(step => new Note(step, octaveOfFirstNote, duration));
  }

}

module.exports = Chord;