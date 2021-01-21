import React from 'react';

import TranscriptionContext from '../transcription-context';

import Viewer from '../../Viewer';

const ViewerWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y }) => <Viewer image={image} x={x} y={y} />}
  </TranscriptionContext.Consumer>
);

export default ViewerWithContext;
