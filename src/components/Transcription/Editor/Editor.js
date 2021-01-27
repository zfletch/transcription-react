import React from 'react';

import TranscriptionContext from '../transcription-context';

import Editor from '../../Editor';

const EditorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, setBoxes, zoom, setZoom }) => <Editor boxes={boxes} setBoxes={setBoxes} zoom={zoom} setZoom={setZoom} />}
  </TranscriptionContext.Consumer>
);

export default EditorWithContext;
