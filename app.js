const MajorScale = require('./src/MajorScale');
const Melody = require('./src/Melody');
const MetaData = require('./src/MetaData.js');
const ChordGenerator = require('./src/ChordGenerator');
const NoteGenerator = require('./src/NoteGenerator');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const metaData = new MetaData('Art at ' + new Date().toISOString(), 'Raphael', 'Simon', 'Rights owned by Jayce Wayland');

//const title = 'Art at ' + new Date().toISOString();
//const composer = 'Raphael';
//const poet = 'Simon';
//const rights = 'Rights owned by Jayce Wayland';
//const date = new Date().toISOString();

const scale = new MajorScale('Bb');
const chords = new ChordGenerator(scale).generate();

const harmonicMeasures = chords.map(chord => chord.toNotes(3, 'whole'));
const melodicMeasures = new NoteGenerator(scale).generate(chords);

const melody = new Melody(metaData, scale.getFifths(), harmonicMeasures, melodicMeasures);

const xml = MusicXMLOutput.toXml(melody);

const outputFileName = './outputs/' + sanitize(metaData.getTitle(), { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);

