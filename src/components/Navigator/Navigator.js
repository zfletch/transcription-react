import React from 'react';

import Scrollbox from './ScrollBox';

import styles from './Navigator.module.css';

const Navigator = ({ image, ratio, x, y, setX, setY, setWidth, setHeight }) => {
  return (
    <div>
      <div className={styles.container}>
        <img src={image} className={styles.image} />
        <Scrollbox x={x} y={y} setX={setX} setY={setY} />
      </div>
    </div>
  );
};

export default Navigator;
