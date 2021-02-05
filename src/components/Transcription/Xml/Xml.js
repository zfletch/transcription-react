import React from 'react';

import TranscriptionContext from '../transcription-context';

import Xml from '../../Xml';

const XmlWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes, setBoxes, activeBox, setActiveBox, xml, setXml }) => <Xml boxes={boxes} setBoxes={setBoxes} activeBox={activeBox} setActiveBox={setActiveBox} xml={xml} setXml={setXml} />}
  </TranscriptionContext.Consumer>
);

export default XmlWithContext;
