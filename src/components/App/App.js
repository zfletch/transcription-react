import React, { Fragment, useState } from 'react';

import philostratus from './philostratus.jpg';

import { xmlToJson } from '../../utils/parsing';

const xml = ''
  + '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<TEI\n'
  + '    xmlns="http://www.tei-c.org/ns/1.0" xml:lang="en">\n'
  + '    <teiHeader>\n'
  + '        <fileDesc>\n'
  + '            <titleStmt>\n'
  + '                <title>IG II² 12974, Philostratus the son of Philoxenus</title>\n'
  + '                <editor>\n'
  + '                    <name>Daniel Orazio</name>\n'
  + '                </editor>\n'
  + '                <editor>\n'
  + '                    <name>Michael Brown</name>\n'
  + '                </editor>\n'
  + '                <editor>\n'
  + '                    <name>Devon Armstrong</name>\n'
  + '                </editor>\n'
  + '                <editor role="reviewer">Marie-Claire Beaulieu, Phd.</editor>\n'
  + '            </titleStmt>\n'
  + '            <publicationStmt>\n'
  + '                <authority>Perseus Project</authority>\n'
  + '                <idno type="urn:cts">urn:cts:ig:ii_2.12974.perseus-grc1</idno>\n'
  + '                <availability>\n'
  + '                    <p>This work is licensed under a\n'
  + '          \n'
  + '                        <ref type="license" target="http://creativecommons.org/licenses/by-sa/3.0/">Creative \n'
  + '          Commons Attribution-ShareAlike 3.0 License</ref>.\n'
  + '                    </p>\n'
  + '                </availability>\n'
  + '            </publicationStmt>\n'
  + '            <sourceDesc>\n'
  + '                <p>\n'
  + '                    <bibl></bibl>\n'
  + '                </p>\n'
  + '            </sourceDesc>\n'
  + '        </fileDesc>\n'
  + '        <profileDesc>\n'
  + '            <langUsage>\n'
  + '                <language ident="en">English</language>\n'
  + '                <language ident="grc">Greek</language>\n'
  + '            </langUsage>\n'
  + '        </profileDesc>\n'
  + '        <revisionDesc>\n'
  + '            <change when="2014-11-30T14:34:52.01Z" who="http://data.perseus.org/sosol/users/Bridget%20Almas">Finalized - Finalized.</change>\n'
  + '            <change when="2014-11-30T14:34:52.006Z" who="http://data.perseus.org/sosol/users/Marie-Claire%20B">Vote - Approve - Great!</change>\n'
  + '            <change when="2014-11-26T22:19:41.364Z" who="http://data.perseus.org/sosol/users/Bridget%20Almas">Adding editors, titles and correcting transcription.</change>\n'
  + '            <change when="2014-02-06T20:15:23.157Z" who="http://data.perseus.org/sosol/users/Bridget%20Almas%20-%20Tufts%20Account">Finalized - Committing approved version to master repo.</change>\n'
  + '            <change when="2014-02-06T20:15:23.148Z" who="http://data.perseus.org/sosol/users/Marie-Claire%20B">Vote - Accept - Very good translation! You will get full credit. The second line is tricky to render into English, but I think you did well to emphasize the "kai... te"</change>\n'
  + '            <change when="2013-12-13T18:39:17.529Z" who="http://data.perseus.org/sosol/users/Dan%20Orazio">transcribed and translated</change>\n'
  + '            <change when="2013-12-04T20:32:43+00:00" who="http://perseids.org/editor">Automated creation from template</change>\n'
  + '        </revisionDesc>\n'
  + '    </teiHeader>\n'
  + '    <text>\n'
  + '        <body>\n'
  + '            <div xml:lang="grc" type="edition" xml:space="preserve">\n'
  + '                <lg met="">\n'
  + '                    <l n="1">\n'
  + '                        <supplied reason="lost">Φιλ</supplied>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.2012,0.4199,0.3483,0.0725">όστρατοσ</w>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.5506,0.435,0.4324,0.0634">Φιλοξένου</w>\n'
  + '                        <lb n="1"></lb>\n'
  + '                    </l>\n'
  + '                    <l n="1">\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.0661,0.5166,0.047,0.0453">παῖ</w>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.1121,0.5227,0.1271,0.0408">πατέρος</w>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.2402,0.5317,0.1061,0.0438">σαυτοῦ</w>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.3453,0.5302,0.1211,0.0498">πατρὸς</w>\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.4655,0.5363,0.0871,0.0438">ἔχων</w>\n'
  + '                        <lb n="2"></lb>\n'
  + '                    </l>\n'
  + '                    <l n="1">\n'
  + '                        <w facs="urn:cite:perseus:funeraryimg.wUdglRwLMJ6@0.6496,0.5393,0.0551,0.0483">καὶ</w>\n'
  + '                        <w>παραμύθιον</w>\n'
  + '                        <w>ἦσθα</w>\n'
  + '                        <w>παπωνύμιον</w>\n'
  + '                        <w>τε</w>\n'
  + '                        <w>γονεῦσι</w>\n'
  + '                        <lb n="3"></lb>\n'
  + '                    </l>\n'
  + '                    <l n="1">\n'
  + '                        <w>Νεολλαρίων</w>\n'
  + '                        <w>δαίμων</w>\n'
  + '                        <w>δέ</w>\n'
  + '                        <w>σ\'</w>\n'
  + '                        <w>ἀφείλετο</w>\n'
  + '                        <w>πᾶ(σ)ι</w>\n'
  + '                        <w>ποθεινόν</w>\n'
  + '                        <lb n="4"></lb>\n'
  + '                    </l>\n'
  + '                </lg>\n'
  + '            </div>\n'
  + '        </body>\n'
  + '    </text>\n'
  + '</TEI>\n'

const wordStyle = (active) => (
  active ? { cursor: 'pointer', backgroundColor: '#f6d918' } : { cursor: 'pointer' }
);

const renderWord = ({ $, _ }, active, setActive, setFacs, row, index) => {
  const facs = $ ? $.facs : null;
  const id = `word-${row}-${index}`;
  const onMouseDown = () => {
    setActive(id);
    setFacs(facs ? facs.split('@')[1].split(',').map(parseFloat) : null);
  };

  return (
    <Fragment key={id}>
      <span style={wordStyle(active === id)} onMouseDown={onMouseDown}>
        {_}
      </span>
      {' '}
    </Fragment>
  );
};

const renderLine = ({ w }, active, setActive, setFacs, index) => (
  <Fragment key={`line-${index}`}>
    {w.map((word, ii) => renderWord(word, active, setActive, setFacs, index, ii))}
    <br />
  </Fragment>
);

const renderFacs = (facs) => {
  if (!facs) {
    return null;
  }
  const [x, y, width, height]  = facs.map((n) => n * 100).map((n) => `${n}%`);

  const style = {
    position: 'absolute',
    backgroundColor: '#f6d918',
    opacity: '0.4',
    left: x,
    top: y,
    width: width,
    height: height,
  };

  return (
    <div style={style} />
  );
};

const App = () => {
  const [active, setActive] = useState(null);
  const [facs, setFacs] = useState(null);

  const json = xmlToJson(xml);

  const lines = json.TEI.text[0].body[0].div[0].lg[0].l;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', margin: '10px' }}>
        <pre style={{ overflow: 'scroll' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 'max-content', height: 'max-content', position: 'relative' }}>
              <img src={philostratus} alt="tomb" />
              {renderFacs(facs)}
            </div>
          </div>
        </pre>
      </div>
      <div style={{ width: '50%', margin: '10px', marginTop: '23px' }}>
        {lines.map((line, ii) => renderLine(line, active, setActive, setFacs, ii))}
      </div>
    </div>
  );
}

export default App;
