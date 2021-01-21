import React from 'react';

import TranscriptionContext from '../transcription-context';

import Navigator from '../../Navigator';

const NavigatorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, setX, setY }) => (
      <Navigator image={image} x={x} y={y} setX={setX} setY={setY} />
    )}
  </TranscriptionContext.Consumer>
);

export default NavigatorWithContext;
