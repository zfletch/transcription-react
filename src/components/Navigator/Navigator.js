import React, { useRef, useEffect, useState } from 'react';

import Scrollbox from './ScrollBox';

import styles from './Navigator.module.css';

const Navigator = ({ image, x, y, zoom, width, height, setX, setY, setRatio }) => {
  const ref = useRef(null);
  const [localHeight, setLocalHeight] = useState(null);
  const [localWidth, setLocalWidth] = useState(null);

  useEffect(() => {
    const element = ref.current;
    const resize = () => {
      const lh = element.clientHeight;
      const lw = element.clientWidth;

      setLocalHeight(lh);
      setLocalWidth(lw);
      setRatio(lh / lw);
    };
    const observer = new ResizeObserver(resize);

    resize();
    observer.observe(element);

    return () => {
      observer.unobserve(element)
    };
  }, []);

  return (
    <div>
      <div className={styles.container} ref={ref}>
        <img src={image} className={styles.image} />
        <Scrollbox x={x} y={y} zoom={zoom} width={width} height={height} localHeight={localHeight} localWidth={localWidth} setX={setX} setY={setY} />
      </div>
    </div>
  );
};

export default Navigator;
