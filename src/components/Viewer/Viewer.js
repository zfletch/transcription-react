import React, { useEffect, useRef } from 'react';

import styles from './Viewer.module.css';

const Viewer = ({ image, x, y, width, height, zoom, boxes, setWidth, setHeight, setBoxes }) => {
  const ref = useRef(null);

  useEffect(() => {
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    setHeight(height);
    setWidth(width);
  });

  const renderBox = ({ x: boxX, y: boxY, width: boxWidth, height: boxHeight }, key) => {
    // if (boxX < x
    //   || boxY < y
    //   || boxX > ((x + width) * zoom)
    //   || boxY > ((y + height) * zoom)) {
    //
    //   return false;
    // }

    const style = {
      top: (boxY - y) * zoom,
      left: (boxX - x) * zoom,
      width: `${boxWidth * zoom}px`,
      height: `${boxHeight * zoom}px`,
    };

    return (
      <div
        key={key}
        className={styles.box}
        style={style}
      />
    );
  };


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
    >
      {boxes.map((b, i) => renderBox(b, i))}
    </div>
  );
};

export default Viewer;
