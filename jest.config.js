module.exports = {
  'roots': [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  'testURL': 'http://localhost:3000' /* Workaround to a jest bug https://github.com/jsdom/jsdom/issues/2304 */
};