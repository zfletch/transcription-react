import React, { useState } from 'react';

import TranscriptionContext from './transcription-context';

import './Transcription.css';

const Transcription = ({
  image, urn, xml, setXml, className, children,
}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [zoom, setZoom] = useState(2);
  const [viewerState, setViewerState] = useState('draw'); // draw, select
  const [activeBox, setActiveBox] = useState(null);
  const [boxes, setBoxes] = useState([]);

  return (
    <TranscriptionContext.Provider value={{
      image, x, y, zoom, height, width, ratio, boxes, setX, setY, setZoom, setHeight, setWidth, setRatio, setBoxes, viewerState, setViewerState, activeBox, setActiveBox, urn, xml, setXml, naturalHeight, naturalWidth, setNaturalHeight, setNaturalWidth,
    }}
    >
      <div className={className}>
        {children}
      </div>
    </TranscriptionContext.Provider>
  );
};

export default Transcription;
