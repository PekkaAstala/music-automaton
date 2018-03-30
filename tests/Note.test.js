const Note = require('../src/Note');


test ('isBelow when going round the solfage', () => {
  expect(new Note('Bb', 4).isBelow(new Note('F', 4))).toBe(false);
});

test ('isBelow when octaves differ', () => {
  expect(new Note('Eb', 4).isBelow(new Note('G', 3))).toBe(false);
});
