import React, { useState } from 'react';

import styles from './ScrollBox.module.css';

const ScrollBox = ({ x, y, setX, setY }) => {
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

  return (
    <div
      style={{ top: y, left: x }}
      className={styles.scrollbox}
      onMouseDown={onMouseDown}
      onMouseUp={() => setDrag(false)}
      onMouseLeave={() => setDrag(false)}
      onMouseMove={onMouseMove}
    />
  );
};

export default ScrollBox;
