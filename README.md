# music-automaton
A JavaScript library to automatically generate small melodies based on a set of predefined rules.

The output is a [MusicXML](https://www.musicxml.com/) string. MusicXML files can be imported into most composition softwares like [MuseScore](https://musescore.org/en) and there are other JavaScript libraries that can then be used to for example display MusicXML on a website.

## Running the application

Have [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed.

Clone the repository.

Use the command `yarn` to install dependencies and `yarn start` to run the application.

A [MusicXML](https://en.wikipedia.org/wiki/MusicXML) compatible file of the melody will be created in ./outputs/ directory.

You can import the file in more advanced music editing programs like [MuseScore](https://musescore.org/en).