import React from 'react';

import TranscriptionContext from '../transcription-context';

import Translation from '../../Translation';

const TranslationWithContext = () => (
  <TranscriptionContext.Consumer>
    {({
      boxes, setBoxes, activeBox, setActiveBox, urn, xml, setXml,
    }) => <Translation boxes={boxes} setBoxes={setBoxes} activeBox={activeBox} setActiveBox={setActiveBox} urn={urn} xml={xml} setXml={setXml} />}
  </TranscriptionContext.Consumer>
);

export default TranslationWithContext;
