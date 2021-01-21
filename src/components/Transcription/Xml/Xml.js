import React from 'react';

import TranscriptionContext from '../transcription-context';

import Xml from '../../Xml';

const XmlWithContext = () => (
  <TranscriptionContext.Consumer>
    {({ boxes }) => <Xml boxes={boxes} />}
  </TranscriptionContext.Consumer>
);

export default XmlWithContext;
