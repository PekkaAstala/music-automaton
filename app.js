const MajorScale = require('./src/MajorScale');
const Melody = require('./src/Melody');
const ChordGenerator = require('./src/ChordGenerator');
const NoteGenerator = require('./src/NoteGenerator');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const title = 'Art at ' + new Date().toISOString();

const scale = new MajorScale('Bb', 3);

const chordProgression = new ChordGenerator().generateMelodyInMajor();

const chords = chordProgression.map(degree => scale.getChord(degree));
const notes = new NoteGenerator(scale).generate(chords);
const melody = new Melody(title, scale.getFifths(), chords, notes);

const xml = MusicXMLOutput.toXml(melody);

const outputFileName = './outputs/' + sanitize(title, { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);
