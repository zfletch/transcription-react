import React from 'react';

import TranscriptionContext from '../transcription-context';

import Viewer from '../../Viewer';

const ViewerWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ image, x, y, width, height, ratio, zoom, boxes, setWidth, setHeight, setBoxes, activeBox, setActiveBox }) => <Viewer image={image} x={x} y={y} width={width} height={height} zoom={zoom} ratio={ratio} boxes={boxes} setWidth={setWidth} setHeight={setHeight} setBoxes={setBoxes} activeBox={activeBox} setActiveBox={setActiveBox} />}
  </TranscriptionContext.Consumer>
);

export default ViewerWithContext;
