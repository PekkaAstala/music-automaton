const chordsC = ['Cmaj', 'Dm', 'Em', 'F', 'G', 'Am', 'B°'];
const notesC = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];

const buildNote = position => {
	if (position > 7) {
		return {
			octave: 4 + (position % 7 === 0 ? Math.floor(position / 7) - 1 : Math.floor(position / 7)),
			step: notesC[position % 7 - 1]
		};
	}
	return {
		octave: 4,
		step: notesC[position - 1]
	};
};

const notes = degree => [buildNote(degree), buildNote(degree + 2), buildNote(degree + 4)];

module.exports = { notes };