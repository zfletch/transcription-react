import React, { useEffect, useRef } from 'react';

const Viewer = ({ image, setRatio, x, y, width, height }) => {
  const ref = useRef(null);

  useEffect(() => {
    const ratio = ref.current.clientHeight / ref.current.clientWidth;

    if (setRatio) {
      setRatio(ratio);
    }
  });

  const style = {
    backgroundImage: `url(${image})`,
    backgroundPosition: `${x}px ${y}px`,
  }

  return (
    <div ref={ref}
      style={style}
    />
  );
};

export default Viewer;
