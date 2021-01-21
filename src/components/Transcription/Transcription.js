import React, { useState } from 'react';

import TranscriptionContext from './transcription-context';

const Transcription = ({ image, className, children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <TranscriptionContext.Provider value={{ image, x, y, setX, setY }}>
      <div className={className}>
        {children}
      </div>
    </TranscriptionContext.Provider>
  );
};

export default Transcription;
