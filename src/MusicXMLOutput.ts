import Measure from "./Measure";
import MetaData from "./MetaData";
import Note, { Duration } from "./Note";
import { Letter } from "./Step";

import { create, XMLElementOrXMLNode } from 'xmlbuilder';

function buildPartlist(id, name) {
  return {
    'score-part': {
      '@id': id,
      'part-name': {
        '#text': name
      }
    }
  };
}

function noteToMusicXMLObject(note: Note, continuesChord: boolean, staff: number) {
  const obj = {};
  if (continuesChord) {
    obj['chord'] = {};
  }
  obj['pitch'] =  {
    'step': { '#text': Letter[note.step.letter] },
    'alter': (note.isSharp() ? 1 : note.isFlat() ? - 1 : 0),
    'octave': { '#text': note.getOctave() }
  };

  obj['duration'] = note.getDuration() === Duration.Quarter ? 1 : 4;
  obj['type'] = note.getDuration();
  obj['staff'] = staff;

  return obj;
}

function addMeasure(parent: XMLElementOrXMLNode, measure: Measure) {
  const measureElem = parent.ele({ 'measure': { '@number': measure.number } });
  if (measure.number === 1) {
    measureElem.ele({ 'attributes': {
      'divisions': { '#text': '1' },
      'key': {
        'fifths': { '#text': measure.fifths }
      },
      'time': {
        'beats': { '#text': '4' },
        'beat-type': { '#text': '4' }
      },
      'staves': 2,
      clef: [
        {
          '@number': 1,
          'sign': { '#text': 'G' },
          'line': { '#text': '2' }
        },
        {
          '@number': 2,
          'sign': { '#text': 'F' },
          'line': { '#text': '4' }
        }
      ]
    }});
  }

  const harmonicNotes = measure.staves[0].notes.map((note, index) => noteToMusicXMLObject(note, index > 0, 2));
  harmonicNotes.forEach(note => measureElem.ele({ note }));

  measureElem.ele({ 'backup': { 'duration': { '#text': 16 }}});

  const melodicNotes = measure.staves[1].notes.map(note => noteToMusicXMLObject(note, false, 1));
  melodicNotes.forEach(note => measureElem.ele({ note }));
}

export function toXml(measures: Array<Measure>, metaData: MetaData): string {
  const root : XMLElementOrXMLNode = create({ 'score-partwise' : { '@version': 3.1 }},
    { version: '1.0', encoding: 'UTF-8', standalone: 'no'},
    {
      pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN',
      sysID: 'http://www.musicxml.org/dtds/partwise.dtd'
    }
  );
  root.ele({ 'work': { 'work-title': metaData.getTitle() }});
  root.ele({ 'part-list': buildPartlist('P1', 'Music' )});
  const part = root.ele({ 'part': { '@id': 'P1' }});

  measures.forEach(measure => addMeasure(part, measure));

  return root.end({ pretty: true});
}