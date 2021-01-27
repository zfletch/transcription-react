import React from 'react';

import styles from './Editor.module.css';

const Editor = ({ boxes, zoom, setBoxes, setZoom }) => {
  const lastBox = boxes[boxes.length - 1];

  const updateText = ({ target: { value }}) => {
    const removedBoxes = boxes.slice(0, -1);
    const newBoxes = removedBoxes.concat({
      x: lastBox.x,
      y: lastBox.y,
      height: lastBox.height,
      width: lastBox.width,
      text: value,
    });

    setBoxes(newBoxes);
  };

  const updateZoom = ({ target: { value }}) => {
    setZoom(value);
  };

  return (
    <div className={styles.editor}>
      Text:
      <input type="text" onChange={updateText} value={lastBox.text || ''} />
      Zoom:
      <input type="text" onChange={updateZoom} value={zoom} />
    </div>
  );
};

export default Editor;
