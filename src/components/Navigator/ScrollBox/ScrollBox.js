import React, { useEffect, useState } from 'react';

import styles from './ScrollBox.module.css';

const ScrollBox = ({ x, y, zoom, width, height, localWidth, localHeight, setX, setY }) => {
  const [drag, setDrag] = useState(false);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);

  const onMouseMove = ({ screenX, screenY }) => {
    if (drag) {
      setX(screenX - offsetX);
      setY(screenY - offsetY);
    }
  };

  const onMouseDown = ({ screenX, screenY }) => {
    setOffsetX(screenX - x);
    setOffsetY(screenY - y);

    setDrag(true);
  };

  useEffect(() => {
    const onMouseUp = () => setDrag(false);

    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseUp)
    }
  }, [])

  const style = {
    top: y,
    left: x,
    // height: `${(height / zoom) * (height / localHeight)}px`,
    // width: `${(width / zoom) * (width / localWidth)}px`,
    height: `${height / zoom}px`,
    width: `${width / zoom}px`,
  };

  return (
    <div
      style={style}
      className={styles.scrollbox}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    />
  );
};

export default ScrollBox;
