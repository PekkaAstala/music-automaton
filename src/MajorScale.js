const steps = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const stepIndexesInScale = [ 0, 2, 4, 5, 7, 9, 11 ]; // root + tone, tone, semitone, tone, tone, tone

const circularArray = (array, index) => {
  const calculatedIndex = ((index + 1) % array.length) - 1;
  return calculatedIndex < 0 ? array[calculatedIndex + array.length] : array[calculatedIndex];
}

const generateScale = firstStep => {
  const indexOffset = steps.indexOf(firstStep);
  return stepIndexesInScale.map(index => circularArray(steps, indexOffset + index));
};

const buildNote = (scale, position) => {
  const octaveIncrease = position % 7 === 0 && position !== 0 ? Math.floor(position / 7) - 1 : Math.floor(position / 7);

  return {
    octave: 4 + octaveIncrease,
    step: circularArray(generateScale(scale), position - 1),
  };
};

const notes = (scale, degree) => [buildNote(scale, degree), buildNote(scale, degree + 2), buildNote(scale, degree + 4)];

module.exports = { notes };