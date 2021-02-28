import React, { useEffect, useState, useRef } from 'react';

import styles from './Xml.module.css';

import AceEditor from 'react-ace';
import { parseString } from 'xml2js';
import { Edit, MousePointer, X, Check } from 'react-feather';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/webpack-resolver';

const format = ({ x, y, width, height }) => (
  [x, y, width, height].map(n => n.toFixed(4)).join(',')
);

const renderPlainXml = ({ urn, boxes, activeBox, setActiveBox }) => {
  return (
    <div className={styles.xmlContainer}>
      <div className={styles.xml}>
        {boxes.map(({ x, y, width, height, text }, ii) => (
          <div key={ii} className={ii === activeBox ? [styles.active, styles.line].join(' ') : styles.line} onClick={() => setActiveBox(ii)}>
            <span className={styles.bracket}>&lt;w</span>
            {' '}
            <span className={styles.element}>
              <span className={styles.attribute}>facs</span><span className={styles.equals}>=</span>
              <span className={styles.attributeText}>
                {`"${urn}@${format({ x, y, width, height })}"`}
              </span>
            </span>
            <span className={styles.bracket}>&gt;</span>
            {text ? <br /> : false}
            {text ? <>&nbsp;&nbsp;</> : false}
            {text}
            {text ? <br /> : false}
            <span className={styles.bracket}>&lt;/w&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const xmlToJson = (xml) => {
  let json;
  parseString(xml, { explicitChildren: true }, (_err, result) => {
    json = result;
  });

  return json;
};

const extractJson = (key, children, boxes) => {
  children.forEach((node) => {
    if (key === 'w' && node.$ && node.$.facs) {
      const nums = node.$.facs.split('@')[1];
      const [x, y, width, height] = nums.split(',').map(parseFloat);

      boxes.push({ x, y, width, height, text: node._ });
    }

    if (node.$$) {
      Object.keys(node.$$).forEach((newKey) => {
        extractJson(newKey, node.$$[newKey], boxes);
      });
    }
  });
};

const Xml = ({ urn, xml, setXml, boxes, setBoxes, activeBox, setActiveBox }) => {
  const [mode, setMode] = useState('select') // select, edit
  const aceRef = useRef(null);

  useEffect(() => {
    const json = xmlToJson(xml)
    const boxes = [];
    Object.keys(json).forEach((element) => {
      if (json[element].$$) {
        Object.keys(json[element].$$).forEach((key) => {
          extractJson(key, json[element].$$[key], boxes);
        });
      }
    });
    setBoxes(boxes);
  }, [xml]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={mode === 'select' ? styles.activeSelector : styles.disabledSelector}>
          <MousePointer className={styles.icon} />
        </div>

        <div className={mode === 'edit' ? styles.activeSelector : styles.selector} onMouseDown={mode === 'edit' ? null : () => setMode('edit')}>
          <Edit className={styles.icon} />
        </div>

        <div className={mode === 'edit' ? styles.selector : styles.disabledSelector} onMouseDown={mode === 'edit' ? () => { setXml(aceRef.current.editor.getValue()); setMode('select') } : null}>
          <Check className={styles.icon} />
        </div>

        <div className={mode === 'edit' ? styles.selector : styles.disabledSelector} onMouseDown={mode === 'edit' ? () => setMode('select') : null}>
          <X className={styles.icon} />
        </div>
      </div>
      {(mode === 'edit') && (
        <AceEditor
          ref={aceRef}
          className={styles.editor}
          mode="xml"
          theme="chrome"
          tabSize={2}
          height="auto"
          width="auto"
          showPrintMargin={false}
          editorProps={{ $blockScrolling: true }}
          value={xml}
        />
      )}
      {(mode === 'select') && renderPlainXml({ urn, boxes, activeBox, setActiveBox })}
    </div>
  );
};

export default Xml
