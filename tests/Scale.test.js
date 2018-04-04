const Scale = require('../src/Scale');
const Note = require('../src/Note');


test ('Steps up within an octave in major scale', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepUp(new Note('D', 5));
  expect(result).toEqual(new Note('Eb', 5));
});

test ('Steps up crossing octaves', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepUp(new Note('Bb', 4));
  expect(result).toEqual(new Note('C', 5));
});

test ('Steps up going round the solfage', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepUp(new Note('A', 4));
  expect(result).toEqual(new Note('Bb', 4));
});

test ('Steps down within an octave', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepDown(new Note('Eb', 4));
  expect(result).toEqual(new Note('D', 4));
});

test ('Steps down crossing octaves', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepDown(new Note('C', 4));
  expect(result).toEqual(new Note('Bb', 3));
});

test ('Steps down going round the solfage', () => {
  const major = new Scale('Bb', 'I');
  const result = major.stepDown(new Note('Bb', 4));
  expect(result).toEqual(new Note('A', 4));
});

test('Generates inclusive note range ascending', () => {
  const major = new Scale('Bb', 'I');
  const range = major.getNoteRange(new Note('Bb', 4), new Note('A', 5));
  expect(range).toEqual([
    new Note('Bb', 4),
    new Note('C', 5),
    new Note('D', 5),
    new Note('Eb', 5),
    new Note('F', 5),
    new Note('G', 5),
    new Note('A', 5)
  ]);
});

test('Generates inclusive note range descending', () => {
  const major = new Scale('Bb', 'I');
  const range = major.getNoteRange(new Note('Eb', 4), new Note('G', 3));
  expect(range).toEqual([
    new Note('Eb', 4),
    new Note('D', 4),
    new Note('C', 4),
    new Note('Bb', 3),
    new Note('A', 3),
    new Note('G', 3)
  ]);
});

test('Creating a Major Scale from tonic (getScale)', () => {
  const major = new Scale('Bb', 'I');
  const majorScale = major.getScale('Bb');
  expect(majorScale).toEqual(['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']);
});

test('Creating a Major Scale from tonic (getScale)', () => {
  const major = new Scale('C', 'I');
  const majorScale = major.getScale('C');
  expect(majorScale).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('Creating a Major Scale from tonic (getScale)', () => {
  const major = new Scale('A', 'I');
  const majorScale = major.getScale('A');
  expect(majorScale).toEqual(['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']);
});

test('Creating a Major Scale from tonic (getScale)', () => {
  const major = new Scale('C', 'I');
  const majorScale = major.getScale('C');
  expect(majorScale).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});

test('Creating a Major Scale from tonic (getScale)', () => {
  const major = new Scale('C#', 'I');
  const majorScale = major.getScale('C#');
  expect(majorScale).toEqual(['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']);
});

test('Creating a minor Scale from tonic (getScale)', () => {
  const major = new Scale('A', 'VI');
  const majorScale = major.getScale('A', 'VI');
  expect(majorScale).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
});