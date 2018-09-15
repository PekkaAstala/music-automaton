import MetaData from '../src/MetaData';

test ('Functions tests for MetaData Objects', () => {
  const metaData = new MetaData('Composition in A minor', 'Raphael', 'Simon', 'Rights owned by Jayce Wayland');
  const title = metaData.getTitle();
  const composer = metaData.getComposer();
  expect(title).toEqual('Composition in A minor');
  expect(composer).toEqual('Raphael');
});