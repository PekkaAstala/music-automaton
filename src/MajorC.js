const notesC = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];

const buildNote = position => {
	const octaveIncrease = position % 7 === 0 && position !== 0 ? Math.floor(position / 7) - 1 : Math.floor(position / 7);
	const step = position % 7 === 0 && position !== 0 ? 6 : position % 7 - 1;

	return {
		octave: 4 + octaveIncrease,
		step: notesC[step],
	};
};

const notes = degree => [buildNote(degree), buildNote(degree + 2), buildNote(degree + 4)];

module.exports = { notes };