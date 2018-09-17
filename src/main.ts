import Scale, { Mode } from './Scale';
import Step, { Letter, Accidental } from './Step';
import MetaData from './MetaData';
import ChordGenerator from './ChordGenerator';
import NoteGenerator from './NoteGenerator';
import { toXml } from './MusicXMLOutput';
import Staff from './Staff';
import Measure from './Measure';

function generate(metaData: MetaData, scale: Scale): string {
  const bassStaves: Array<Staff> = new ChordGenerator(scale).generate();
  const measures: Array<Measure> = new NoteGenerator(scale).generate(scale.getFifths(), bassStaves);
  const xml: string = toXml(measures, metaData);
  return xml;
}

export { MetaData, Scale, Step, Letter, Mode, Accidental, generate };

