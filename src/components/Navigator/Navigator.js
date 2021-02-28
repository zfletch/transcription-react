import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut } from 'react-feather';

import Scrollbox from './ScrollBox';

import styles from './Navigator.module.css';

const Navigator = ({ image, x, y, zoom, width, height, setX, setY, setRatio, setZoom, setNaturalHeight, setNaturalWidth, boxes, activeBox }) => {
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
      const nh = element.naturalHeight;
      const nw = element.naturalWidth;
      const ol = element.offsetLeft;
      const ot = element.offsetTop;

      setLocalHeight(lh);
      setLocalWidth(lw);
      setNaturalHeight(nh);
      setNaturalWidth(nw);
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
  }, [setNaturalHeight, setNaturalWidth, setRatio]);

  const renderActiveBox = () => {
    const { x: boxX, y: boxY, width: boxWidth, height: boxHeight } = boxes[activeBox];

    const style = {
      top: `${boxY * localHeight + offsetTop}px`,
      left: `${boxX * localWidth + offsetLeft}px`,
      width: `${boxWidth * localWidth}px`,
      height: `${boxHeight * localHeight}px`,
    };

    return (
      <div
        className={styles.activeBox}
        style={style}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div title="Zoom in" className={zoom >= 9.99 ? styles.disabledSelector : styles.selector} onMouseDown={zoom >= 9.99 ? null : () => setZoom(zoom + 0.2)}>
          <ZoomIn className={styles.icon} />
        </div>

        <div title="Zoom out" className={zoom <= 1.01 ? styles.disabledSelector : styles.selector} onMouseDown={zoom <= 1.01 ? null : () => setZoom(zoom - 0.2)}>
          <ZoomOut className={styles.icon} />
        </div>
      </div>
      <div className={styles.navigator} ref={navigatorRef}>
        <img src={image} ref={imageRef} className={styles.image} alt="miniature used for navigation" />
        {(activeBox !== undefined && activeBox !== null) ? renderActiveBox() : false}
        <Scrollbox x={x} y={y} zoom={zoom} width={width} height={height} localHeight={localHeight} localWidth={localWidth} setX={setX} setY={setY} offsetLeft={offsetLeft} offsetTop={offsetTop} />
      </div>
    </div>
  );
};

export default Navigator;
