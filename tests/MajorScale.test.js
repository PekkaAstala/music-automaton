const MajorScale = require('../src/MajorScale');
const Note = require('../src/Note');


test ('Steps up within an octave', () => {
  const major = new MajorScale('Bb');
  const result = major.stepUp(new Note('D', 5));
  expect(result).toEqual(new Note('Eb', 5));
});

test ('Steps up crossing octaves', () => {
  const major = new MajorScale('Bb');
  const result = major.stepUp(new Note('Bb', 4));
  expect(result).toEqual(new Note('C', 5));
});

test ('Steps up going round the solfage', () => {
  const major = new MajorScale('Db');
  const result = major.stepUp(new Note('C', 4));
  expect(result).toEqual(new Note('Db', 4));
});

test('Generates inclusive note range ascending', () => {
  const major = new MajorScale('Bb');
  const range = major.getNoteRange(new Note('Bb', 4), new Note('F', 5));
  expect(range).toEqual([new Note('Bb', 4), new Note('C', 5), new Note('D', 5), new Note('Eb', 5), new Note('F', 5)]);
});