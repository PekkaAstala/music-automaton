import Scale from './Scale';
import Chord from './Chord';
import Note from './Note';
import Melody from './Melody';
import MetaData from './MetaData';
import ChordGenerator from './ChordGenerator';
import NoteGenerator from './NoteGenerator';
import { toXml } from './MusicXMLOutput';

export { MetaData, Scale };

export default function generate(metaData: MetaData, scale: Scale): string {
  const chords: Array<Chord> = new ChordGenerator(scale).generate();
  const harmonicMeasures: Array<Array<Note>> = chords.map(chord => chord.toNotes(3, 'whole'));
  const melodicMeasures = new NoteGenerator(scale).generate(chords);
  const melody: Melody = new Melody(scale.getFifths(), harmonicMeasures, melodicMeasures);
  const xml: string = toXml(melody, metaData);
  return xml;
}