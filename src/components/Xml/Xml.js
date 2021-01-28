import React from 'react';

import styles from './Xml.module.css';

const format = ({ x, y, width, height }) => (
  [x, y, width, height].map(n => n.toFixed(4)).join(',')
);

const Xml = ({ boxes, activeBox, setActiveBox }) => {
  return (
    <div className={styles.xml}>
      {boxes.map(({ x, y, width, height, text }, ii) => (
        <div key={ii} className={ii === activeBox ? [styles.active, styles.line].join(' ') : styles.line} onClick={() => setActiveBox(ii)}>
          <span className={styles.bracket}>&lt;w</span>
          {' '}
          <span className={styles.element}>
            {`facs="urn:cite:perseus:miscellanyimgs.UWDkbqJfqQc@${format({ x, y, width, height })}"`}
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
  );
};

export default Xml
