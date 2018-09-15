import Scale from './Scale';
import Chord from './Chord';
import Note from './Note';
import MetaData from './MetaData';
import ChordGenerator from './ChordGenerator';
import NoteGenerator from './NoteGenerator';
import { toXml } from './MusicXMLOutput';
import Staff from './Staff';
import Measure from './Measure';

export { MetaData, Scale };

export default function generate(metaData: MetaData, scale: Scale): string {
  const bassStaves: Array<Staff> = new ChordGenerator(scale).generate();
  const measures: Array<Measure> = new NoteGenerator(scale).generate(scale.getFifths(), bassStaves);
  const xml: string = toXml(measures, metaData);
  return xml;
}