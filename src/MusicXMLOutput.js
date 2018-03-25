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

function buildMeasure(number, fifths, notes) {
  const measure = { '@number': number };
  if (number === 1) {
    measure.attributes = {
      'divisions': { '#text': '1' },
      'key': {
        'fifths': { '#text': fifths }
      },
      'time': {
        'beats': { '#text': '4' },
        'beat-type': { '#text': '4' }
      },
      'clef': {
        'sign': { '#text': 'G' },
        'line': { '#text': '2' }
      }
    };
  }
  measure.note = notes.map((note, index) => {
    const obj = {};
    if (index > 0) {
      obj.chord = {};
    }
    obj.pitch =  {
      'step': { '#text': note.getStep().substring(0, 1) },
      'alter': (note.isSharp() ? 1 : note.isFlat() ? - 1 : 0),
      'octave': { '#text': note.getOctave() }
    };

    obj.duration = '4';
    obj.type = 'whole';
        
    return obj;
  });
  return measure;
}

function toXml(fifths, measures) {
  return builder.create({
    'score-partwise': {
      '@version': '3.1',
      'part-list': buildPartlist('P1', 'Music'),
      'part': {
        '@id': 'P1',
        'measure': measures.map((notes, index) => buildMeasure(index + 1, fifths, notes))
      }
    }
  }, 
  { version: '1.0', encoding: 'UTF-8', standalone: 'no'},
  {
    pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN',
    sysID: 'http://www.musicxml.org/dtds/partwise.dtd'
  }).end({ pretty: true});
}

module.exports = { toXml };