import React, { useRef, useEffect } from 'react';
import AceEditor from 'react-ace';

import copyUrl from './copy-url.png';
import editTranscription from './edit-transcription.png';
import pasteUrl from './paste-url.png';
import visitPage from './visit-page.png';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/webpack-resolver';

const handleKeyDown = () => {};

const handleChangeFun = (fun) => (
  ({ target: { value } }) => fun(value)
);

const Home = ({
  image, setImage, urn, setUrn, mode, setMode, xml, setXml,
}) => {
  const aceRef = useRef(null);

  const handleImageChange = ({ target: { value } }) => {
    const components = (value || '').split(/[./]/);

    if (components.length > 1 && urn === 'urn:cite:perseus:miscellanyimgs:image') {
      setUrn(`urn:cite:perseus:miscellanyimgs:${components[components.length - 2]}`);
    }

    setImage(value);
  };

  useEffect(() => {
    if (!xml) {
      return;
    }

    const regex = /<w facs="(.+?)@0.+?">/;
    const match = regex.exec(xml);

    if (match && match[1]) {
      setUrn(match[1]);
    }
  }, [xml, setUrn]);

  return (
    <>
      <header>
        <div className="row pt-4">
          <div className="col">
            <h1 className="h3">
              Transcription Editor
            </h1>
            <h2 className="h6">
              EpiDoc XML helper for image transcription
            </h2>
          </div>
        </div>
      </header>
      <div className="row pt-2">
        <div className="col col-lg-10 offset-lg-1">

          <div className="input-group input-group-lg pb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="image-input-group">Image:</span>
            </div>
            <input className="form-control" type="text" value={image} onChange={handleImageChange} onKeyDown={handleKeyDown} placeholder="Link to image ..." aria-label="URL" aria-describedby="image-input-group" />
          </div>

          <div className="input-group input-group-lg pb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="urn-input-group">URN:</span>
            </div>
            <input className="form-control" type="text" value={urn} onChange={handleChangeFun(setUrn)} onKeyDown={handleKeyDown} placeholder="Unique identifier (optional) ..." aria-label="URL" aria-describedby="image-input-group" />
          </div>

          <div className="input-group input-group-lg pb-2">
            <label htmlFor="xml">Transcription XML (optional):</label>
            <AceEditor
              ref={aceRef}
              mode="xml"
              name="xml"
              theme="chrome"
              tabSize={2}
              className="border rounded"
              height="40vh"
              width="100%"
              showPrintMargin={false}
              editorProps={{ $blockScrolling: true }}
              onChange={(x) => setXml(x)}
            />
          </div>

          <button className="btn btn-block btn-primary" disabled={!image} onMouseDown={image ? () => { setMode('edit'); } : () => {}}>
            Edit transcription
          </button>
        </div>
      </div>
      <hr />
      <div className="row pt-2">
        <div className="col">
          <h3 className="h4">
            Getting started
          </h3>
        </div>
      </div>
      <div className="row pt-2 mb-4 pb-2">
        <div className="col-md-3">
          <img src={visitPage} className="img-fluid border" alt="treebank template page" />
          <p className="text-left pt-2">
            1. Visit the page with the image you're transcribing.
          </p>
        </div>
        <div className="col-md-3">
          <img src={copyUrl} className="img-fluid border" alt="treebank template page" />
          <p className="text-left pt-2">
            2. Copy the URL.
          </p>
        </div>
        <div className="col-md-3">
          <img src={pasteUrl} className="img-fluid border" alt="treebank template page" />
          <p className="text-left pt-2">
            3. Paste the URL in the &quot;Image&quot; input and paste any XML you have in the &quot;XML&quot; input.
          </p>
        </div>
        <div className="col-md-3">
          <img src={editTranscription} className="img-fluid border" alt="treebank template page" />
          <p className="text-left pt-2">
            4. Click the &quot;Edit transcription&quot; button.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
