import Scale from './src/Scale';
import Chord from './src/Chord';
import Note from './src/Note';
import Melody from './src/Melody';
import MetaData from './src/MetaData.js';
import ChordGenerator from './src/ChordGenerator';
import NoteGenerator from './src/NoteGenerator';
import { toXml } from './src/MusicXMLOutput';
const fs = require('fs');

const metaData: MetaData = new MetaData('Art at ' + new Date().toISOString(),
  'Raphael', 'Simon', 'Rights owned by Jayce Wayland');

const scale: Scale = new Scale('Bb', 'I');
const chords: Array<Chord> = new ChordGenerator(scale).generate();

const harmonicMeasures: Array<Array<Note>> = chords.map(chord => chord.toNotes(3, 'whole'));
const melodicMeasures = new NoteGenerator(scale).generate(chords);

const melody: Melody = new Melody(scale.getFifths(), harmonicMeasures, melodicMeasures);

const xml: string = toXml(melody, metaData);

fs.writeFileSync(metaData.getSanitizedTitle(), xml);