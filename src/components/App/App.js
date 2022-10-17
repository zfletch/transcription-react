import React, { useState } from 'react';
import { PerseidsHeader, PerseidsFooter } from 'perseids-react-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Editor from '../Transcription/Editor';
import Navigator from '../Transcription/Navigator';
import Viewer from '../Transcription/Viewer';
import Transcription from '../Transcription';
import Xml from '../Transcription/Xml';
import XmlTranscribed from '../Transcription/XmlTranscribed';

import { xml as nuremberg } from '../../data/nuremberg';

import Home from '../Home';

import styles from './App.module.css';

const TranscriptionContainer = ({
  urn, setUrn, image, xml, setXml,
}) => (
  <Transcription className={styles.transcription} urn={urn} image={image} xml={xml} setXml={setXml}>
    <Viewer />
    <Editor />
    <Navigator />
    <Xml />
  </Transcription>
);

const HomeContainer = ({
  xml, setXml, urn, setUrn, image, setImage, mode, setMode,
}) => (
  <>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/demo">
          <Transcription className={styles.transcription} urn="" image={`${process.env.PUBLIC_URL}/images/nuremberg-bible.jpg`} xml={nuremberg} setXml={setXml}>
            <Viewer />
            <Navigator />
            <XmlTranscribed />
          </Transcription>
        </Route>
        <Route path="/">
          <PerseidsHeader>
            Transcription Editor
          </PerseidsHeader>
          <main role="main">
            <div className="container text-center">
              <Home xml={xml} setXml={setXml} urn={urn} setUrn={setUrn} image={image} setImage={setImage} mode={mode} setMode={setMode} />
            </div>
          </main>
          <PerseidsFooter />
        </Route>
      </Switch>
    </Router>
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

  return <TranscriptionContainer urn={urn} setUrn={setUrn} image={image} xml={xml} setXml={setXml} />;
};

export default App;
