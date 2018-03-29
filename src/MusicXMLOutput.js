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
  const harmonicNotes = model.harmonic.map((note, index) => {
    const obj = {};
    if (index > 0) {
      obj.chord = {};
    }
    obj.pitch =  {
      'step': { '#text': note.getStep().substring(0, 1) },
      'alter': (note.isSharp() ? 1 : note.isFlat() ? - 1 : 0),
      'octave': { '#text': note.getOctave() }
    };

    obj.duration = note.getDuration() === 'quarter' ? 1 : 4;
    obj.type = note.getDuration();
    obj.staff = 2;

    return obj;
  });
  harmonicNotes.forEach(note => measure.ele({ note }));

  measure.ele({ 'backup': { 'duration': { '#text': 16 }}});

  const melodicNotes = model.melodic.map(note => ({
    'pitch': {
      'step': { '#text': note.getStep().substring(0, 1) },
      'alter': (note.isSharp() ? 1 : note.isFlat() ? - 1 : 0),
      'octave': { '#text': note.getOctave() }
    },
    'duration': note.getDuration() === 'quarter' ? 1 : 4,
    'type': note.getDuration(),
    'staff': '1'
  }));
  melodicNotes.forEach(note => measure.ele({ note }));
}

function toXml(melody) {
  const root = builder.create({ 'score-partwise' : { '@version': 3.1 }},
    { version: '1.0', encoding: 'UTF-8', standalone: 'no'},
    {
      pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN',
      sysID: 'http://www.musicxml.org/dtds/partwise.dtd'
    }
  );
  root.ele({ 'work': { 'work-title': melody.getTitle() }});
  root.ele({ 'part-list': buildPartlist('P1', 'Music' )});
  const part = root.ele({ 'part': { '@id': 'P1' }});

  melody.getMeasures().forEach(measure => addMeasure(part, measure));

  return root.end({ pretty: true});
}

module.exports = { toXml };