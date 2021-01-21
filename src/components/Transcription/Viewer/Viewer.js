import React from 'react';

import TranscriptionContext from '../transcription-context';

import Viewer from '../../Viewer';

const ViewerWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, zoom, setWidth, setHeight }) => <Viewer image={image} x={x} y={y} zoom={zoom} setWidth={setWidth} setHeight={setHeight} />}
  </TranscriptionContext.Consumer>
);

export default ViewerWithContext;
