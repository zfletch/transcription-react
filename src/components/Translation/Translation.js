import React, { useEffect } from 'react';

import { parseString } from 'xml2js';
import { Copy, Clipboard } from 'react-feather';
import styles from './Translation.module.css';

const format = ({
  x, y, width, height,
}) => (
  [x, y, width, height].map((n) => n.toFixed(4)).join(',')
);

const renderPlainXml = ({
  urn, notBoxes
}) => (
  <div className={styles.xmlContainer}>
    <div className={styles.xml}>
      {notBoxes.map(({
        text,
      }, ii) => (
        <React.Fragment key={ii}>
          {ii !== 0 ? ' ' : ''}
          <span>
            {text}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const xmlToJson = (xml) => {
  let json;
  parseString(xml, { explicitChildren: true, preserveChildrenOrder: true, charsAsChildren: true }, (_err, result) => {
    json = result;
  });

  return json;
};

const getText = (node) => {
  if (node['#name'] === '__text__') {
    return node._.trimStart();
  }

  if (!node.$$) {
    return '';
  }

  return node.$$.map((n) => getText(n)).join('');
};

const extractJson = (key, node, boxes) => {
  if (key === 'div') {
    if (node.$ && node.$.type === 'translation') {
      boxes.push({
        text: getText(node),
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

const Translation = ({
  urn, xml,
}) => {
  if (!xml) {
    return false;
  }

  const json = xmlToJson(xml);
  const notBoxes = [];
  Object.keys(json).forEach((element) => {
    if (json[element].$$) {
      json[element].$$.forEach((node) => {
        extractJson(node['#name'], node, notBoxes);
      });
    }
  });

  return (
    <div className={styles.container}>
      {renderPlainXml({
        urn, notBoxes
      })}
    </div>
  );
};

export default Translation;
