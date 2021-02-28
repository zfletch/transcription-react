import React from 'react';

import TranscriptionContext from '../transcription-context';

import Navigator from '../../Navigator';

const NavigatorWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, zoom, height, width, setX, setY, setRatio, setZoom, setNaturalHeight, setNaturalWidth, boxes, activeBox }) => (
      <Navigator image={image} x={x} y={y} zoom={zoom} height={height} width={width} setX={setX} setY={setY} setRatio={setRatio} setZoom={setZoom} setNaturalHeight={setNaturalHeight} setNaturalWidth={setNaturalWidth} boxes={boxes} activeBox={activeBox} />
    )}
  </TranscriptionContext.Consumer>
);

export default NavigatorWithContext;
