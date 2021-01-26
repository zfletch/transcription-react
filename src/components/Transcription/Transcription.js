import React, { useState } from 'react';

import TranscriptionContext from './transcription-context';

const Transcription = ({ image, className, children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [zoom, setZoom] = useState(2);
  const [boxes, setBoxes] = useState([{ x: 0.1130, y: 0.0867, width: 0.0706, height: 0.0481 }, { x: 0.2940, y: 0.1554, width: 0.1657, height: 0.0128 }]);

  return (
    <TranscriptionContext.Provider value={{ image, x, y, zoom, height, width, ratio, boxes, setX, setY, setZoom, setHeight, setWidth, setRatio, setBoxes }}>
      <div className={className}>
        {children}
      </div>
    </TranscriptionContext.Provider>
  );
};

export default Transcription;
