const builder = require('xmlbuilder');

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

function noteToMusicXMLObject(note, continuesChord, staff) {
  const obj = {};
  if (continuesChord) {
    obj['chord'] = {};
  }
  obj['pitch'] =  {
    'step': { '#text': note.getStep().substring(0, 1) },
    'alter': (note.isSharp() ? 1 : note.isFlat() ? - 1 : 0),
    'octave': { '#text': note.getOctave() }
  };

  obj['duration'] = note.getDuration() === 'quarter' ? 1 : 4;
  obj['type'] = note.getDuration();
  obj['staff'] = staff;

  return obj;
}

function addMeasure(parent, model) {
  const measure = parent.ele({ 'measure': { '@number': model.number } });
  if (model.number === 1) {
    measure.ele({ 'attributes': {
      'divisions': { '#text': '1' },
      'key': {
        'fifths': { '#text': model.fifths }
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

  const harmonicNotes = model.harmonic.map((note, index) => noteToMusicXMLObject(note, index > 0, 2));
  harmonicNotes.forEach(note => measure.ele({ note }));

  measure.ele({ 'backup': { 'duration': { '#text': 16 }}});

  const melodicNotes = model.melodic.map(note => noteToMusicXMLObject(note, false, 1));
  melodicNotes.forEach(note => measure.ele({ note }));
}

export function toXml(melody, metaData) {
  const root = builder.create({ 'score-partwise' : { '@version': 3.1 }},
    { version: '1.0', encoding: 'UTF-8', standalone: 'no'},
    {
      pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN',
      sysID: 'http://www.musicxml.org/dtds/partwise.dtd'
    }
  );
  root.ele({ 'work': { 'work-title': metaData.getTitle() }});
  root.ele({ 'part-list': buildPartlist('P1', 'Music' )});
  const part = root.ele({ 'part': { '@id': 'P1' }});

  melody.getMeasures().forEach(measure => addMeasure(part, measure));

  return root.end({ pretty: true});
}