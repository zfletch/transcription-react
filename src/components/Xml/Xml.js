import React, { useEffect } from 'react';

import styles from './Xml.module.css';

// const format = ({ x, y, width, height }) => (
//   [x, y, width, height].map(n => n.toFixed(4)).join(',')
// );
//
// const Xml = ({ boxes, activeBox, setActiveBox }) => {
//   return (
//     <div className={styles.xml}>
//       {boxes.map(({ x, y, width, height, text }, ii) => (
//         <div key={ii} className={ii === activeBox ? [styles.active, styles.line].join(' ') : styles.line} onClick={() => setActiveBox(ii)}>
//           <span className={styles.bracket}>&lt;w</span>
//           {' '}
//           <span className={styles.element}>
//             {`facs="urn:cite:perseus:miscellanyimgs.UWDkbqJfqQc@${format({ x, y, width, height })}"`}
//           </span>
//           <span className={styles.bracket}>&gt;</span>
//           {text ? <br /> : false}
//           {text ? <>&nbsp;&nbsp;</> : false}
//           {text}
//           {text ? <br /> : false}
//           <span className={styles.bracket}>&lt;/w&gt;</span>
//         </div>
//       ))}
//     </div>
//   );
// };

import AceEditor from 'react-ace';
import { parseString } from 'xml2js';

import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-chrome';

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

      boxes.push({ x, y, width, height });
    }

    if (node.$$) {
      Object.keys(node.$$).forEach((newKey) => {
        extractJson(newKey, node.$$[newKey], boxes);
      });
    }
  });
};

const Xml = ({ xml, setBoxes }) => {

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
    <AceEditor
      mode="xml"
      theme="chrome"
      tabSize="2"
      height="auto"
      width="auto"
      showPrintMargin={false}
      editorProps={{ $blockScrolling: true }}
      value={xml}
    />
  );
};

export default Xml
