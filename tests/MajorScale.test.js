const MajorScale = require('../src/MajorScale');
const Note = require('../src/Note');

test('Creating a scale with no accidentals', () => {
  const majorC = new MajorScale('C');
  expect(majorC.getNote(1).equals(new Note('C', 4))).toBe(true);
  expect(majorC.getNote(2).equals(new Note('D', 4))).toBe(true);
  expect(majorC.getNote(3).equals(new Note('E', 4))).toBe(true);
  expect(majorC.getNote(4).equals(new Note('F', 4))).toBe(true);
  expect(majorC.getNote(5).equals(new Note('G', 4))).toBe(true);
  expect(majorC.getNote(6).equals(new Note('A', 4))).toBe(true);
  expect(majorC.getNote(7).equals(new Note('B', 4))).toBe(true);
});