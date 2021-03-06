import React, { useEffect, useState } from 'react';

import styles from './ScrollBox.module.css';

const max = (a, b) => (
  a > b ? a : b
);

const min = (a, b) => (
  a < b ? a : b
);

const generateStyle = (x, y, zoom, width, height, localWidth, localHeight, offsetLeft, offsetTop) => {
  // The way that CSS background images work is that the `width` is always
  // equivalent to 100% of the image (when `background-size` is `100%`) but the
  // height may be less.
  // To calculate what the size of the scrollbox should be, we can just use 100%
  // for the width (and adjust it based on zoom).
  // For the height, we can figure out the percentage of the height that make up
  // the width and multiply that by 100% (adjusted based on zoom).
  // We can calculate `x` and `y` by finding the ratio between the width and
  // localWidth and multiplying `x` and `y` by that value.

  if (!width) {
    return {};
  }

  return {
    left: x * (localWidth / width) + offsetLeft,
    top: y * (localWidth / width) + offsetTop,
    width: `${min(localWidth / zoom, localWidth)}px`,
    height: `${min(((height / zoom) / width) * localWidth, localHeight)}px`,
  };
};

const ScrollBox = ({
  x, y, zoom, width, height, localWidth, localHeight, offsetLeft, offsetTop, setX, setY,
}) => {
  const [drag, setDrag] = useState(false);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);

  const onMouseMove = ({ clientX, clientY }) => {
    if (drag) {
      const boxWidth = localWidth / zoom;
      const boxHeight = ((height / zoom) / width) * localWidth;

      const speedX = ((offsetLeft * 2) + localWidth) / localWidth;

      const newX = min(max(clientX * speedX - offsetX, 0), max((localWidth - boxWidth) * (width / localWidth), 0));
      const newY = min(max(clientY * speedX - offsetY, 0), max((localHeight - boxHeight) * (width / localWidth), 0));

      setX(newX);
      setY(newY);
    }
  };

  const onMouseDown = ({ clientX, clientY }) => {
    const speedX = ((offsetLeft * 2) + localWidth) / localWidth;

    setOffsetX(clientX * speedX - x);
    setOffsetY(clientY * speedX - y);

    setDrag(true);
  };

  useEffect(() => {
    const onMouseUp = () => setDrag(false);

    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [setDrag]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [drag]);

  useEffect(() => {
    const boxWidth = localWidth / zoom;
    const boxHeight = ((height / zoom) / width) * localWidth;

    const newX = min(max(x, 0), max((localWidth - boxWidth) * (width / localWidth), 0));
    const newY = min(max(y, 0), max((localHeight - boxHeight) * (width / localWidth), 0));

    if (newX !== x || newY !== y) {
      setX(newX);
      setY(newY);
    }
  }, [localHeight, localWidth, offsetLeft, offsetTop, zoom]);

  return (
    <div
      style={generateStyle(x, y, zoom, width, height, localWidth, localHeight, offsetLeft, offsetTop)}
      className={styles.scrollbox}
      onMouseDown={onMouseDown}
    />
  );
};

export default ScrollBox;
