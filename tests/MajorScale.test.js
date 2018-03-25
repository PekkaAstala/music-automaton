const MajorScale = require('../src/MajorScale');
const Note = require('../src/Note');

test('Creating a scale with no accidentals', () => {
  const majorC = new MajorScale('C');
  expect(majorC.getNote(1)).toEqual(new Note('C', 4));
  expect(majorC.getNote(2)).toEqual(new Note('D', 4));
  expect(majorC.getNote(3)).toEqual(new Note('E', 4));
  expect(majorC.getNote(4)).toEqual(new Note('F', 4));
  expect(majorC.getNote(5)).toEqual(new Note('G', 4));
  expect(majorC.getNote(6)).toEqual(new Note('A', 4));
  expect(majorC.getNote(7)).toEqual(new Note('B', 4));
});

test('Creating a scale with sharps', () => {
  const majorFsharp = new MajorScale('F#');
  expect(majorFsharp.getNote(1)).toEqual(new Note('F#', 4));
  expect(majorFsharp.getNote(2)).toEqual(new Note('G#', 4));
  expect(majorFsharp.getNote(3)).toEqual(new Note('A#', 4));
  expect(majorFsharp.getNote(4)).toEqual(new Note('B', 4));
  expect(majorFsharp.getNote(5)).toEqual(new Note('C#', 5));
  expect(majorFsharp.getNote(6)).toEqual(new Note('D#', 5));
  expect(majorFsharp.getNote(7)).toEqual(new Note('E#', 5));
});