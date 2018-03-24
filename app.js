const ChordProgression = require('./src/ChordProgression');
const MajorScale = require('./src/MajorScale');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');

const chordProgression = ChordProgression.generateMelodyInMajor();
const measures = chordProgression.map(degree => MajorScale.notes('C', degree));

const xml = MusicXMLOutput.toXml(measures);

const outputFileName = './outputs/' + new Date().toISOString() + '.xml';
fs.writeFileSync(outputFileName, xml);


