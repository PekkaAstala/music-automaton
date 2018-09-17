import Scale, { Mode } from '../src/Scale';
import Note from '../src/Note';
import Step, { Letter, Accidental } from '../src/Step';

const { Flat, Natural, Sharp } = Accidental;
const { C, D, E, F, G, A, B } = Letter;
const { I, II, III, IV, V, VI, VII } = Mode;

test ('Major scale step generation', () => {
  const BbMajor = new Scale(new Step(Letter.B, Flat), I);
  
  expect(BbMajor.getStep(1).letter).toBe(B);
  expect(BbMajor.getStep(1).isFlat()).toBe(true);

  expect(BbMajor.getStep(2).letter).toBe(C);
  expect(BbMajor.getStep(2).isNatural()).toBe(true);

  expect(BbMajor.getStep(3).letter).toBe(D);
  expect(BbMajor.getStep(3).isNatural()).toBe(true);

  expect(BbMajor.getStep(4).letter).toBe(E);
  expect(BbMajor.getStep(4).isFlat()).toBe(true);

  expect(BbMajor.getStep(5).letter).toBe(F);
  expect(BbMajor.getStep(5).isNatural()).toBe(true);

  expect(BbMajor.getStep(6).letter).toBe(G);
  expect(BbMajor.getStep(6).isNatural()).toBe(true);

  expect(BbMajor.getStep(7).letter).toBe(A);
  expect(BbMajor.getStep(7).isNatural()).toBe(true);
});

test ('Steps up within an octave in major scale', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepUp(new Note(new Step(D), 5));
  expect(result).toEqual(new Note(new Step(E, Flat), 5));
});

test ('Steps up crossing octaves', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepUp(new Note(new Step(B, Flat), 4));
  expect(result).toEqual(new Note(new Step(C), 5));
});

test ('Steps up going round the solfage', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepUp(new Note(new Step(A), 4));
  expect(result).toEqual(new Note(new Step(B, Flat), 4));
});

test ('Steps down within an octave', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepDown(new Note(new Step(E, Flat), 4));
  expect(result).toEqual(new Note(new Step(D), 4));
});

test ('Steps down crossing octaves', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepDown(new Note(new Step(C), 4));
  expect(result).toEqual(new Note(new Step(B, Flat), 3));
});

test ('Steps down going round the solfage', () => {
  const major = new Scale(new Step(B, Flat), I);
  const result = major.stepDown(new Note(new Step(B, Flat), 4));
  expect(result).toEqual(new Note(new Step(A), 4));
});

test('Generates inclusive note range ascending', () => {
  const major = new Scale(new Step(B, Flat), I);
  const range = major.getNoteRange(new Note(new Step(B, Flat), 4), new Note(new Step(A), 5));
  expect(range).toEqual([
    new Note(new Step(B, Flat), 4),
    new Note(new Step(C), 5),
    new Note(new Step(D), 5),
    new Note(new Step(E, Flat), 5),
    new Note(new Step(F), 5),
    new Note(new Step(G), 5),
    new Note(new Step(A), 5)
  ]);
});

test('Generates inclusive note range descending', () => {
  const major = new Scale(new Step(B, Flat), I);
  const range = major.getNoteRange(new Note(new Step(E, Flat), 4), new Note(new Step(G), 3));
  expect(range).toEqual([
    new Note(new Step(E, Flat), 4),
    new Note(new Step(D), 4),
    new Note(new Step(C), 4),
    new Note(new Step(B, Flat), 3),
    new Note(new Step(A), 3),
    new Note(new Step(G), 3)
  ]);
});

test('Generates inclusive note range descending (minor scale)', () => {
  const major = new Scale(new Step(A), VI);
  const range = major.getNoteRange(new Note(new Step(C), 4), new Note(new Step(B), 4));
  expect(range).toEqual([
    new Note(new Step(C), 4),
    new Note(new Step(D), 4),
    new Note(new Step(E), 4),
    new Note(new Step(F), 4),
    new Note(new Step(G), 4),
    new Note(new Step(A), 4),
    new Note(new Step(B), 4)
  ]);
});