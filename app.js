const ChordProgression = require('./src/ChordProgression');
const MajorScale = require('./src/MajorScale');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');

const scale = new MajorScale('D', 3);
const chordProgression = ChordProgression.generateMelodyInMajor();
const measures = chordProgression.map(degree => scale.getChord(degree));

const xml = MusicXMLOutput.toXml(scale.getFifths(), measures);

const outputFileName = './outputs/' + new Date().toISOString() + '.xml';
fs.writeFileSync(outputFileName, xml);


