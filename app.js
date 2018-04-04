const TimeSignature = require('./src/TimeSignature');
const Scale = require('./src/Scale');
const Melody = require('./src/Melody');
const ChordGenerator = require('./src/ChordGenerator');
const NoteGenerator = require('./src/NoteGenerator');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const title = 'Art at ' + new Date().toISOString();

const timeSignature = new TimeSignature(4, 4);
const scale = new Scale('Bb', 'I');
const chords = new ChordGenerator(scale).generate();

const harmonicMeasures = chords.map(chord => chord.toNotes(3, 1));
const melodicMeasures = new NoteGenerator(scale).generate(chords);

const melody = new Melody(title, timeSignature, scale.getFifths(), harmonicMeasures, melodicMeasures);

const xml = MusicXMLOutput.toXml(melody);

const outputFileName = './outputs/' + sanitize(title, { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);

