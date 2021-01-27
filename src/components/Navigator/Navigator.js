import React, { useRef, useEffect, useState } from 'react';

import Scrollbox from './ScrollBox';

import styles from './Navigator.module.css';

const Navigator = ({ image, x, y, zoom, width, height, setX, setY, setRatio }) => {
  const navigatorRef = useRef(null);
  const imageRef = useRef(null);
  const [localHeight, setLocalHeight] = useState(null);
  const [localWidth, setLocalWidth] = useState(null);
  const [offsetLeft, setOffsetLeft] = useState(null);
  const [offsetTop, setOffsetTop] = useState(null);

  useEffect(() => {
    const navigator = navigatorRef.current;
    const element = imageRef.current;

    const resize = () => {
      const lh = element.clientHeight;
      const lw = element.clientWidth;
      const ol = element.offsetLeft;
      const ot = element.offsetTop;

      setLocalHeight(lh);
      setLocalWidth(lw);
      setOffsetLeft(ol);
      setOffsetTop(ot);
      setRatio(lh / lw);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(navigator);
    observer.observe(element);

    return () => {
      observer.unobserve(navigator);
      observer.unobserve(element);
    };
  }, []);

  return (
    <div>
      <div className={styles.navigator} ref={navigatorRef}>
        <img src={image} ref={imageRef} className={styles.image} />
        <Scrollbox x={x} y={y} zoom={zoom} width={width} height={height} localHeight={localHeight} localWidth={localWidth} setX={setX} setY={setY} offsetLeft={offsetLeft} offsetTop={offsetTop} />
      </div>
    </div>
  );
};

export default Navigator;
