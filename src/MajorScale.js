const steps = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const stepIndexesInScale = [ 0, 2, 4, 5, 7, 9, 11 ]; // root + tone, tone, semitone, tone, tone, tone

const circularArray = (array, index) => {
  const calculatedIndex = ((index + 1) % array.length) - 1;
  return calculatedIndex < 0 ? array[calculatedIndex + array.length] : array[calculatedIndex];
};

const generateScale = firstStep => {
  const indexOffset = steps.indexOf(firstStep);
  return stepIndexesInScale.map(index => circularArray(steps, indexOffset + index));
};

class MajorScale {

  constructor(firstStep) {
    this.notes = generateScale(firstStep);
  }

  getNote(position) {
    const octaveIncrease = position % 7 === 0 && position !== 0 ? Math.floor(position / 7) - 1 : Math.floor(position / 7);

    return {
      octave: 4 + octaveIncrease,
      step: circularArray(this.notes, position - 1),
    };
  }

  getChord(degree) {
    return [
      this.getNote(degree), this.getNote(degree + 2), this.getNote(degree + 4)
    ];
  }

}

module.exports = MajorScale;