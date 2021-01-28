import React from 'react';

import TranscriptionContext from '../transcription-context';

import Editor from '../../Editor';

const EditorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, setBoxes, zoom, setZoom, activeBox, setActiveBox }) => <Editor boxes={boxes} setBoxes={setBoxes} zoom={zoom} setZoom={setZoom} activeBox={activeBox} setActiveBox={setActiveBox} />}
  </TranscriptionContext.Consumer>
);

export default EditorWithContext;
