import Step, { Letter, Accidental } from '../src/Step';

const { A, B, C, D, E, F, G } = Letter;
const { Flat, Sharp, Natural } = Accidental;

test('isFlat', () => {
    expect(new Step(B, Flat).isFlat()).toBe(true);
    expect(new Step(F, Sharp).isFlat()).toBe(false);
    expect(new Step(C, Natural).isFlat()).toBe(false);
})

test('isSharp', () => {
    expect(new Step(B, Flat).isSharp()).toBe(false);
    expect(new Step(F, Sharp).isSharp()).toBe(true);
    expect(new Step(C, Natural).isSharp()).toBe(false);
})

test('isNatural', () => {
    expect(new Step(B, Flat).isNatural()).toBe(false);
    expect(new Step(F, Sharp).isNatural()).toBe(false);
    expect(new Step(C, Natural).isNatural()).toBe(true);
})

test('stepUp returns a note semitone higher when scale uses flats', () => {
    expect(new Step(B, Flat).stepUpSemitone(Flat).equals(new Step(C, Flat))).toBe(true);
    expect(new Step(C, Flat).stepUpSemitone(Flat).equals(new Step(C))).toBe(true);
    expect(new Step(C, Natural).stepUpSemitone(Flat).equals(new Step(D, Flat))).toBe(true);
});

test('stepUp returns a note semitone higher when scale uses sharps', () => {
    expect(new Step(C, Sharp).stepUpSemitone(Sharp).equals(new Step(D, Natural))).toBe(true);
    expect(new Step(D, Natural).stepUpSemitone(Sharp).equals(new Step(D, Sharp))).toBe(true);
    expect(new Step(D, Sharp).stepUpSemitone(Flat).equals(new Step(E, Natural))).toBe(true);
});