const Scale = require('./src/Scale');
const Melody = require('./src/Melody');
const MetaData = require('./src/MetaData.js');
const ChordGenerator = require('./src/ChordGenerator');
const NoteGenerator = require('./src/NoteGenerator');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');

const metaData = new MetaData('Art at ' + new Date().toISOString(),
  'Raphael', 'Simon', 'Rights owned by Jayce Wayland');

const scale = new Scale('Bb', 'I');
const chords = new ChordGenerator(scale).generate();

const harmonicMeasures = chords.map(chord => chord.toNotes(3, 'whole'));
const melodicMeasures = new NoteGenerator(scale).generate(chords);

const melody = new Melody(scale.getFifths(), harmonicMeasures,
  melodicMeasures);

const xml = MusicXMLOutput.toXml(melody, metaData);

fs.writeFileSync(metaData.getSanitizedTitle(), xml);