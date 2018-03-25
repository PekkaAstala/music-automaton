const MajorScale = require('./src/MajorScale');
const Melody = require('./src/Melody');
const ChordProgression = require('./src/ChordProgression');
const NoteProgression = require('./src/NoteProgression');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const title = 'Art at ' + new Date().toISOString();

const scale = new MajorScale('D', 3);

const chordProgression = ChordProgression.generateMelodyInMajor();

const chords = chordProgression.map(degree => scale.getChord(degree));
const notes = NoteProgression.generate(chords)
const melody = new Melody(title, scale.getFifths(), chords, notes);

const xml = MusicXMLOutput.toXml(melody);

const outputFileName = './outputs/' + sanitize(title, { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);
