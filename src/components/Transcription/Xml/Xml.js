import React from 'react';

import TranscriptionContext from '../transcription-context';

import Xml from '../../Xml';

const XmlWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, setBoxes, activeBox, setActiveBox, xml }) => <Xml boxes={boxes} setBoxes={setBoxes} activeBox={activeBox} setActiveBox={setActiveBox} xml={xml} />}
  </TranscriptionContext.Consumer>
);

export default XmlWithContext;
