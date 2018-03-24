const ChordProgressionFactory = require('./ChordProgressionFactory');
const MajorScale = require('./MajorC');
const MusicXMLOutput = require('./MusicXMLOutput');
const fs = require('fs');

const chordProgression = ChordProgressionFactory.generate();
const measures = chordProgression.map(degree => MajorScale.notes(degree));
const xml = MusicXMLOutput.toXml(measures);
fs.writeFileSync('./LatestMelody.xml', xml);


