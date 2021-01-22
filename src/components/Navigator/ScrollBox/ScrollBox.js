import React, { useEffect, useState } from 'react';

import styles from './ScrollBox.module.css';

const max = (a, b) => (
  a > b ? a : b
);

const min = (a, b) => (
  a < b ? a : b
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

  if (!width) {
    return {};
  }

  return {
    left: x * (localWidth / width),
    top: y * (localWidth / width),
    width: `${localWidth / zoom}px`,
    height: `${((height / zoom) / width) * localWidth}px`,
  };
};

const ScrollBox = ({ x, y, zoom, width, height, localWidth, localHeight, setX, setY }) => {
  const [drag, setDrag] = useState(false);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);

  const onMouseMove = ({ screenX, screenY }) => {
    if (drag) {
      const boxWidth = localWidth / zoom;
      const boxHeight = ((height / zoom) / width) * localWidth;

      const newX = min(max(screenX - offsetX, 0), localWidth - boxWidth);
      const newY = min(max(screenY - offsetY, 0), localHeight - boxHeight);

      setX(newX * (width / localWidth));
      setY(newY * (width / localWidth));
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
