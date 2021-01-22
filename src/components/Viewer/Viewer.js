import React, { useEffect, useRef, useState } from 'react';

import styles from './Viewer.module.css';

const Viewer = ({ image, x, y, width, height, zoom, boxes, setWidth, setHeight, setBoxes }) => {
  const [select, setSelect] = useState(false);
  const [selectX, setSelectX] = useState(null);
  const [selectY, setSelectY] = useState(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const [selectHeight, setSelectHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const resize = () => {
      const height = element.clientHeight;
      const width = element.clientWidth;

      setHeight(height);
      setWidth(width);
    };
    const observer = new ResizeObserver(resize);

    resize();
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const renderBox = ({ x: boxX, y: boxY, width: boxWidth, height: boxHeight }, key) => {
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

  const onMouseUp = () => {
    const newBoxes = boxes.concat({
      x: x + selectX / zoom,
      y: y + selectY / zoom,
      width: selectWidth / zoom,
      height: selectHeight / zoom,
    });

    setBoxes(newBoxes);
    setSelect(false);
    setSelectWidth(null);
    setSelectHeight(null);
  };

  const renderSelect = () => {
    if (!select) {
      return false;
    }

    const style = {
      top: selectY,
      left: selectX,
      height: `${selectHeight}px`,
      width: `${selectWidth}px`,
    };

    return (
      <div
        style={style}
        className={styles.select}
      />
    );
  };

  const onMouseMove = ({ clientX, clientY }) => {
    if (select) {
      setSelectWidth(clientX - selectX - 10);
      setSelectHeight(clientY - selectY - 10);
    }
  };

  const onMouseDown = ({ clientX, clientY }) => {
    setSelectX(clientX - 10);
    setSelectY(clientY - 10);

    setSelect(true);
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
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {renderSelect()}
      {boxes.map((b, i) => renderBox(b, i))}
    </div>
  );
};

export default Viewer;
