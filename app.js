const MajorScale = require('./src/MajorScale');
const Melody = require('./src/Melody');
const ChordGenerator = require('./src/ChordGenerator');
const NoteGenerator = require('./src/NoteGenerator');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const title = 'Art at ' + new Date().toISOString();

const scale = new MajorScale('Bb');
const chords = new ChordGenerator(scale).generate();

const harmonicMeasures = chords.map(chord => chord.toNotes(2, 'whole'));
const melodicMeasures = new NoteGenerator(scale).generate(chords);

const melody = new Melody(title, scale.getFifths(), harmonicMeasures, melodicMeasures);

const xml = MusicXMLOutput.toXml(melody);

const outputFileName = './outputs/' + sanitize(title, { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);

