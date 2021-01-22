import React, { useEffect, useState } from 'react';

import styles from './ScrollBox.module.css';

const max = (a, b) => (
  a > b ? a : b
);

const generateStyle = (x, y, zoom, width, height, localWidth, localHeight) => {
  // The way that CSS background images work is that the `width` is always
  // equivalent to 100% of the image (when `background-size` is `100%`) but the
  // height may be less.
  // To calculate what the size of the scrollbox should be, we can just use 100%
  // for the width (and adjust it based on zoom).
  // For the height, we can figure out the percentage of the height makes up the
  // width and multiply that by 100% (adjusted based on zoom).
  // We can calculate `x` and `y` by finding the ratio between the width and
  // localWidth and multiplying `x` and `y` by that value.

  return {
    left: (x / zoom) * (localWidth / width),
    top: (y / zoom) * (localWidth / width),
    // height: `${(height / zoom) * (height / localHeight)}px`,
    // width: `${(width / zoom) * (width / localWidth)}px`,
    width: `${100 / zoom}%`,
    height: `${(height / width) * localWidth}px`,
  };
};

const ScrollBox = ({ x, y, zoom, width, height, localWidth, localHeight, setX, setY }) => {
  const [drag, setDrag] = useState(false);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);

  const onMouseMove = ({ screenX, screenY }) => {
    if (drag && x >= 0 && y >= 0) {
      setX(max(screenX - offsetX, 0));
      setY(max(screenY - offsetY, 0));
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

  return (
    <div
      style={generateStyle(x, y, zoom, width, height, localWidth, localWidth)}
      className={styles.scrollbox}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    />
  );
};

export default ScrollBox;
