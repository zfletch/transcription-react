import React, { useEffect, useRef, useState } from 'react';
import { MousePointer, Maximize } from 'react-feather';

import styles from './Viewer.module.css';

const Viewer = ({
  image, x, y, width, height, zoom, boxes, ratio, setWidth, setHeight, setBoxes, activeBox, setActiveBox,
}) => {
  const [select, setSelect] = useState(false);
  const [selectX, setSelectX] = useState(null);
  const [selectY, setSelectY] = useState(null);
  const [selectWidth, setSelectWidth] = useState(0);
  const [selectHeight, setSelectHeight] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [mode, setMode] = useState('draw'); // draw, select
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const resize = () => {
      const height = element.clientHeight;
      const width = element.clientWidth;

      setHeight(height);
      setWidth(width);
      setOffsetX(element.offsetLeft);
      setOffsetY(element.offsetTop);
    };
    const observer = new ResizeObserver(resize);

    resize();
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const renderBox = ({
    x: boxX, y: boxY, width: boxWidth, height: boxHeight,
  }, index) => {
    const style = {
      top: `${boxY * ratio * width * zoom - y * zoom}px`,
      left: `${boxX * width * zoom - x * zoom}px`,
      width: `${boxWidth * width * zoom}px`,
      height: `${boxHeight * ratio * width * zoom}px`,
    };
    const classes = [styles.box];
    if (index === activeBox) {
      classes.push(styles.active);
    }
    if (mode === 'select' && index !== activeBox) {
      classes.push(styles.selectBox);
    }

    return (
      <div
        key={index}
        className={classes.join(' ')}
        onMouseDown={mode === 'select' ? () => { setActiveBox(index); } : null}
        style={style}
      />
    );
  };

  const onMouseUp = () => {
    if (!selectHeight || !selectWidth) {
      setSelect(false);
      return;
    }

    const selectTop = selectHeight < 0 ? selectY + selectHeight : selectY;
    const selectLeft = selectWidth < 0 ? selectX + selectWidth : selectX;

    const newBoxes = boxes.concat({
      y: (selectTop + y * zoom) / (width * ratio * zoom),
      x: (selectLeft + x * zoom) / (width * zoom),
      height: Math.abs(selectHeight) / (width * ratio * zoom),
      width: Math.abs(selectWidth) / (width * zoom),
    });

    setBoxes(newBoxes);
    setSelect(false);
    setSelectWidth(null);
    setSelectHeight(null);
    setActiveBox(newBoxes.length - 1);
  };

  const renderSelect = () => {
    if (!select) {
      return false;
    }

    const selectTop = selectHeight < 0 ? selectY + selectHeight : selectY;
    const selectLeft = selectWidth < 0 ? selectX + selectWidth : selectX;

    const style = {
      top: selectTop,
      left: selectLeft,
      height: `${Math.abs(selectHeight)}px`,
      width: `${Math.abs(selectWidth)}px`,
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
      setSelectWidth(clientX - selectX - offsetX);
      setSelectHeight(clientY - selectY - offsetY);
    }
  };

  const onMouseDown = ({ clientX, clientY }) => {
    setSelectX(clientX - offsetX);
    setSelectY(clientY - offsetY);

    setSelect(true);
  };

  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: `-${zoom * x}px -${zoom * y}px`,
    backgroundSize: `${zoom * 100}%`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div title="Select the active box" className={mode === 'select' ? styles.activeSelector : styles.selector} onMouseDown={mode === 'select' ? null : () => setMode('select')}>
          <MousePointer className={styles.icon} />
        </div>

        <div title="Draw a new box" className={mode === 'draw' ? styles.activeSelector : styles.selector} onMouseDown={mode === 'draw' ? null : () => setMode('draw')}>
          <Maximize className={styles.icon} />
        </div>
      </div>
      <div
        ref={ref}
        className={mode === 'draw' ? [styles.viewer, styles.draw].join(' ') : styles.viewer}
        style={style}
        onMouseDown={mode === 'draw' ? onMouseDown : null}
        onMouseMove={mode === 'draw' ? onMouseMove : null}
        onMouseUp={mode === 'draw' ? onMouseUp : null}
      >
        {renderSelect()}
        {boxes.map((b, i) => renderBox(b, i))}
      </div>
    </div>
  );
};

export default Viewer;
