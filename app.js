const ChordProgression = require('./src/ChordProgression');
const MajorScale = require('./src/MajorScale');
const MusicXMLOutput = require('./src/MusicXMLOutput');
const fs = require('fs');
const sanitize = require('sanitize-filename');

const title = 'Art at ' + new Date().toISOString();

const scale = new MajorScale('D', 3);

const chordProgression = ChordProgression.generateMelodyInMajor();

const measures = chordProgression.map(degree => scale.getChord(degree));

const xml = MusicXMLOutput.toXml(title, scale.getFifths(), measures);

const outputFileName = './outputs/' + sanitize(title, { replacement: '-' }) + '.xml';

fs.writeFileSync(outputFileName, xml);
