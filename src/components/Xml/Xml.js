import React, { useEffect, useState } from 'react';

import styles from './Xml.module.css';

import AceEditor from 'react-ace';
import { parseString } from 'xml2js';
import { Copy, Clipboard } from 'react-feather';

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

const xmlBoxText = (urn, boxes, activeBox) => {
  const { x, y, width, height, text } = boxes[activeBox];
  const attr = `"${urn}@${format({ x, y, width, height })}"`;
  const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<w facs=${attr}>${escaped}</w>`;
};

const xmlFullText = (urn, boxes) => {
  return boxes.map((_, ii) => xmlBoxText(urn, boxes, ii)).join('\n');
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
        <div className={(activeBox === undefined || activeBox === null) ? styles.disabledSelector : styles.selector} onMouseDown={() => {navigator.clipboard.writeText(xmlBoxText(urn, boxes, activeBox))}}>
          <Copy className={styles.icon} />
        </div>
        <div className={styles.selector} onMouseDown={() => {navigator.clipboard.writeText(xmlFullText(urn, boxes))}}>
          <Clipboard className={styles.icon} />
        </div>
      </div>
      {renderPlainXml({ urn, boxes, activeBox, setActiveBox })}}
    </div>
  );
};

export default Xml
