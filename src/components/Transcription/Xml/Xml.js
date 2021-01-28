import React from 'react';

import TranscriptionContext from '../transcription-context';

import Xml from '../../Xml';

const XmlWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, activeBox, setActiveBox }) => <Xml boxes={boxes} activeBox={activeBox} setActiveBox={setActiveBox} />}
  </TranscriptionContext.Consumer>
);

export default XmlWithContext;
