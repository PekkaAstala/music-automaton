import Note from '../src/Note';
import Step, { Letter, Accidental } from '../src/Step';

test ('isBelow when going round the solfage', () => {
  expect(new Note(new Step(Letter.B, Accidental.Flat), 4).isBelow(new Note(new Step(Letter.F, Accidental.None), 4))).toBe(false);
});

test ('isBelow when octaves differ', () => {
  expect(new Note(new Step(Letter.E, Accidental.Flat), 4).isBelow(new Note(new Step(Letter.G, Accidental.None), 3))).toBe(false);
});
