import React, { useState } from 'react';

import TranscriptionContext from './transcription-context';

const Transcription = ({ image, className, children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [zoom, setZoom] = useState(2);

  return (
    <TranscriptionContext.Provider value={{ image, x, y, zoom, height, width, setX, setY, setZoom, setHeight, setWidth }}>
      <div className={className}>
        {children}
      </div>
    </TranscriptionContext.Provider>
  );
};

export default Transcription;
