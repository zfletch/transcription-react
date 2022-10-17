import React from 'react';

import TranscriptionContext from '../transcription-context';

import XmlTranscribed from '../../XmlTranscribed';

const XmlTranscribedWithContext = () => (
  <TranscriptionContext.Consumer>
    {({
      boxes, setBoxes, activeBox, setActiveBox, urn, xml, setXml,
    }) => <XmlTranscribed boxes={boxes} setBoxes={setBoxes} activeBox={activeBox} setActiveBox={setActiveBox} urn={urn} xml={xml} setXml={setXml} />}
  </TranscriptionContext.Consumer>
);

export default XmlTranscribedWithContext;
