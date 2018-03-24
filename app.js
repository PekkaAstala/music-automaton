const ChordProgressionFactory = require('./src/ChordProgressionFactory');
const MajorScale = require('./src/MajorC');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');

const chordProgression = ChordProgressionFactory.generate();
const measures = chordProgression.map(degree => MajorScale.notes(degree));

const xml = MusicXMLOutput.toXml(measures);

const outputFileName = './outputs/' + new Date().toISOString() + '.xml';
fs.writeFileSync(outputFileName, xml);


