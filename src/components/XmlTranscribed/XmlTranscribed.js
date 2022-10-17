import React, { useEffect } from 'react';

import { parseString } from 'xml2js';
import { Copy, Clipboard } from 'react-feather';
import styles from './XmlTranscribed.module.css';

const format = ({
  x, y, width, height,
}) => (
  [x, y, width, height].map((n) => n.toFixed(4)).join(',')
);

const renderPlainXml = ({
  urn, boxes, activeBox, setActiveBox,
}) => (
  <div className={styles.xmlContainer}>
    <div className={styles.xml}>
      {boxes.map(({
        text,
      }, ii) => (
        <React.Fragment key={ii}>
          {ii !== 0 ? ' ' : ''}
          <span className={ii === activeBox ? [styles.active, styles.text].join(' ') : styles.text} onClick={() => setActiveBox(ii)}>
            {text}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const xmlBoxText = (urn, boxes, activeBox) => {
  const {
    x, y, width, height, text,
  } = boxes[activeBox];
  const attr = `"${urn}@${format({
    x, y, width, height,
  })}"`;
  const escaped = (text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<w facs=${attr}>${escaped}</w>`;
};

const xmlFullText = (urn, boxes) => boxes.map((_, ii) => xmlBoxText(urn, boxes, ii)).join('\n');

const xmlToJson = (xml) => {
  let json;
  parseString(xml, { explicitChildren: true, preserveChildrenOrder: true, charsAsChildren: true }, (_err, result) => {
    json = result;
  });

  return json;
};

const getText = (node) => {
  if (node['#name'] === '__text__') {
    return node._.trim();
  }

  if (!node.$$) {
    return '';
  }

  return node.$$.map((n) => getText(n)).join('');
};

const extractJson = (key, node, boxes) => {

  if (key === 'w' || key === 'num') {
    if (node.$ && node.$.facs) {
      const nums = node.$.facs.split('@')[1];
      const [x, y, width, height] = nums.split(',').map(parseFloat);

      boxes.push({
        x, y, width, height, text: getText(node),
      });
    }

    return;
  }

  if (node.$$) {
    node.$$.forEach((n) => {
      extractJson(n['#name'], n, boxes);
    });
  }
};

const XmlTranscribed = ({
  urn, xml, setXml, boxes, setBoxes, activeBox, setActiveBox,
}) => {
  useEffect(() => {
    if (!xml) {
      return;
    }

    const json = xmlToJson(xml);
    const boxes = [];
    Object.keys(json).forEach((element) => {
      if (json[element].$$) {
        json[element].$$.forEach((node) => {
          extractJson(node['#name'], node, boxes);
        });
      }
    });
    setBoxes(boxes);
  }, [xml]);

  return (
    <div className={styles.container}>
      {renderPlainXml({
        urn, boxes, activeBox, setActiveBox,
      })}
    </div>
  );
};

export default XmlTranscribed;
