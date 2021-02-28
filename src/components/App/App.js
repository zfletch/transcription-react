import React, { useState } from 'react';
import { PerseidsHeader, PerseidsFooter } from 'perseids-react-components';

import Editor from '../Transcription/Editor';
import Navigator from '../Transcription/Navigator';
import Viewer from '../Transcription/Viewer';
import Transcription from '../Transcription';
import Xml from '../Transcription/Xml';

import Home from '../Home';

import styles from './App.module.css';

const TranscriptionContainer = ({ urn, setUrn, image, xml, setXml }) => (
  <Transcription className={styles.transcription} urn={urn} image={image} xml={xml} setXml={setXml}>
    <Viewer />
    <Editor />
    <Navigator />
    <Xml />
  </Transcription>
);

const HomeContainer = ({ xml, setXml, urn, setUrn, image, setImage, mode, setMode }) => (
  <>
    <PerseidsHeader>
      Transcription Editor
    </PerseidsHeader>
    <main role="main">
      <div className="container text-center">
        <Home xml={xml} setXml={setXml} urn={urn} setUrn={setUrn} image={image} setImage={setImage} mode={mode} setMode={setMode} />;
      </div>
    </main>
    <PerseidsFooter />
  </>
);

const App = () => {
  const [xml, setXml] = useState('');
  const [urn, setUrn] = useState('urn:cite:perseus:miscellanyimgs:image');
  const [image, setImage] = useState('');
  const [mode, setMode] = useState('input'); // input, edit

  if (mode === 'input') {
    return <HomeContainer xml={xml} setXml={setXml} urn={urn} setUrn={setUrn} image={image} setImage={setImage} mode={mode} setMode={setMode} />;
  }

  return <TranscriptionContainer urn={urn} setUrn={setUrn} image={image} xml={xml} setXml={setXml} />
};


export default App;
