import Step, { Letter, Accidental } from '../src/Step';

test('isFlat', () => {
    expect(new Step(Letter.B, Accidental.Flat).isFlat()).toBe(true);
    expect(new Step(Letter.F, Accidental.Sharp).isFlat()).toBe(false);
    expect(new Step(Letter.C, Accidental.Natural).isFlat()).toBe(false);
})

test('isSharp', () => {
    expect(new Step(Letter.B, Accidental.Flat).isSharp()).toBe(false);
    expect(new Step(Letter.F, Accidental.Sharp).isSharp()).toBe(true);
    expect(new Step(Letter.C, Accidental.Natural).isSharp()).toBe(false);
})

test('isNatural', () => {
    expect(new Step(Letter.B, Accidental.Flat).isNatural()).toBe(false);
    expect(new Step(Letter.F, Accidental.Sharp).isNatural()).toBe(false);
    expect(new Step(Letter.C, Accidental.Natural).isNatural()).toBe(true);
})