import React from 'react';

import Navigator from '../Transcription/Navigator';
import Viewer from '../Transcription/Viewer';
import Transcription from '../Transcription';

import styles from './App.module.css';

import philostratus from './philostratus.jpg';

const App = () => (
  <Transcription className={styles.transcription} image={philostratus}>
    <Viewer />
    <Navigator />
  </Transcription>
);

export default App;
