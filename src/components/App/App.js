import React from 'react';

import Editor from '../Transcription/Editor';
import Navigator from '../Transcription/Navigator';
import Viewer from '../Transcription/Viewer';
import Transcription from '../Transcription';
import Xml from '../Transcription/Xml';

import styles from './App.module.css';

import philostratus from './philostratus.jpg';

const App = () => (
  <Transcription className={styles.transcription} image={philostratus}>
    <Viewer />
    <Editor />
    <Navigator />
    <Xml />
  </Transcription>
);

export default App;
