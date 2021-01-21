import React from 'react';

import styles from './Xml.module.css';

const Xml = ({ boxes }) => {
  return (
    <div className={styles.xml}>
      {boxes.map(({ x, y, width, height, text }, ii) => (
        <div key={ii}>
          <span className={styles.bracket}>&lt;w</span>
          {' '}
          <span className={styles.element}>
            {`facs="urn:cite:perseus:miscellanyimgs.UWDkbqJfqQc@${x},${y},${width},${height}"`}
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
