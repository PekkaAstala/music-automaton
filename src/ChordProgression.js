
function generateMelodyInMajor () {
  const startingPoint = [
    1, null, null, 5,
    1, null, null, 1,
    1, null, null, 5,
    1, null, 5, 1,
  ];
  return startingPoint.map(value => value ? value : Math.floor(Math.random() * 7) + 1);
}

module.exports = { generateMelodyInMajor };