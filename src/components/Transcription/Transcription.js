import React, { useState } from 'react';

import TranscriptionContext from './transcription-context';

const Transcription = ({ image, className, children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [boxes, setBoxes] = useState([{ x: 0.1, y: 0.2, width: 0.1, height: 0.1 }]);

  return (
    <TranscriptionContext.Provider value={{ image, x, y, zoom, height, width, boxes, setX, setY, setZoom, setHeight, setWidth, setBoxes }}>
      <div className={className}>
        {children}
      </div>
    </TranscriptionContext.Provider>
  );
};

export default Transcription;
