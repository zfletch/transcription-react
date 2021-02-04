import React from 'react';

import TranscriptionContext from '../transcription-context';

import Navigator from '../../Navigator';

const NavigatorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, zoom, height, width, setX, setY, setRatio, setZoom, setNaturalHeight, setNaturalWidth }) => (
      <Navigator image={image} x={x} y={y} zoom={zoom} height={height} width={width} setX={setX} setY={setY} setRatio={setRatio} setZoom={setZoom} setNaturalHeight={setNaturalHeight} setNaturalWidth={setNaturalWidth} />
    )}
  </TranscriptionContext.Consumer>
);

export default NavigatorWithContext;
