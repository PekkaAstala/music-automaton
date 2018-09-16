# music-automaton
A JavaScript library to automatically generate small melodies based on a set of predefined rules.

The output is a [MusicXML](https://www.musicxml.com/) string. MusicXML files can be imported into most composition softwares like [MuseScore](https://musescore.org/en) and there are other JavaScript libraries that can then be used to for example display MusicXML on a website.

## Using the library

```javascript
const MusicAutomaton = require('./dist/main');

const metaData = new MusicAutomaton.MetaData('Art at ' + new Date().toISOString(), 'ComposerName', 'PoetName', 'Rights');
const Bb = new MusicAutomaton.Step(MusicAutomaton.Letter.B, MusicAutomaton.Accidental.Flat);
const BbMajor = new MusicAutomaton.Scale(Bb, 'I');
const xml = MusicAutomaton.generate(metaData, BbMajor);
```

This will produce a MusicXML string in B flat major.