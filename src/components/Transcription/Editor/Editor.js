import React from 'react';

import TranscriptionContext from '../transcription-context';

import Editor from '../../Editor';

const EditorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, setBoxes }) => <Editor boxes={boxes} setBoxes={setBoxes} />}
  </TranscriptionContext.Consumer>
);

export default EditorWithContext;
