import React, { useEffect, useRef } from 'react';

import styles from './Viewer.module.css';

const Viewer = ({ image, x, y, zoom, setWidth, setHeight }) => {
  const ref = useRef(null);

  useEffect(() => {
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    setHeight(height);
    setWidth(width);
  });

  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: `-${zoom * x}px -${zoom * y}px`,
    backgroundSize: `${zoom * 100}%`,
  }

  return (
    <div
      ref={ref}
      className={styles.viewer}
      style={style}
    />
  );
};

export default Viewer;
