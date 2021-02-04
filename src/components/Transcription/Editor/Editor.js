import React from 'react';

import TranscriptionContext from '../transcription-context';

import Editor from '../../Editor';

const EditorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, width, height, boxes, setBoxes, zoom, setZoom, activeBox, setActiveBox, naturalHeight, naturalWidth }) => <Editor image={image} x={x} y={y} width={width} height={height} boxes={boxes} setBoxes={setBoxes} zoom={zoom} setZoom={setZoom} activeBox={activeBox} setActiveBox={setActiveBox} naturalHeight={naturalHeight} naturalWidth={naturalWidth} />}
  </TranscriptionContext.Consumer>
);

export default EditorWithContext;
