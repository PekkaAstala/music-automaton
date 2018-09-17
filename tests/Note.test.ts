import Note from '../src/Note';
import Step, { Letter, Accidental } from '../src/Step';

const { C, D, E, F, G, A, B } = Letter;
const { Flat, Natural, Sharp } = Accidental;

test ('isBelow when going round the solfage', () => {
  expect(new Note(new Step(B, Flat), 4).isBelow(new Note(new Step(F), 4))).toBe(false);
});

test ('isBelow when octaves differ', () => {
  expect(new Note(new Step(E, Flat), 4).isBelow(new Note(new Step(G), 3))).toBe(false);
});
