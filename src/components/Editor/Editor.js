import React from 'react';

import styles from './Editor.module.css';

const Editor = ({ boxes, zoom, setBoxes, setZoom }) => {
  const lastBox = boxes[boxes.length - 1];

  const updateField = (field, { target: { value }}, transform) => {
    const removedBoxes = boxes.slice(0, -1);
    const newBox = {
      x: lastBox.x,
      y: lastBox.y,
      height: lastBox.height,
      width: lastBox.width,
      text: lastBox.text,
    }
    newBox[field] = transform ? transform(value) : value;
    const newBoxes = removedBoxes.concat(newBox);

    setBoxes(newBoxes);
  };

  const updateZoom = ({ target: { value }}) => {
    setZoom(value);
  };

  return (
    <div className={styles.editor}>
      Text:
      <input type="text" onChange={(e) => updateField('text', e)} value={lastBox.text || ''} />
      <br />
      X:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('x', e, parseFloat)} value={lastBox.x.toFixed(4) || '0'} />
      <br />
      Y:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('y', e, parseFloat)} value={lastBox.y.toFixed(4) || '0'} />
      <br />
      Width:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('width', e, parseFloat)} value={lastBox.width.toFixed(4) || '0'} />
      <br />
      Y:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('height', e, parseFloat)} value={lastBox.height.toFixed(4) || '0'} />
      <br />
      Zoom ({zoom}):
      <input type="range" min="1" max="5" onChange={updateZoom} value={zoom} />
    </div>
  );
};

export default Editor;
