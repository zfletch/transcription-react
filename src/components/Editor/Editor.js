import React from 'react';

import styles from './Editor.module.css';

const Editor = ({ boxes, zoom, setBoxes, setZoom, activeBox, setActiveBox }) => {
  const selectedBox = activeBox === null ? null : boxes[activeBox];

  const updateField = (field, { target: { value }}, transform) => {
    const newBox = {
      x: selectedBox.x,
      y: selectedBox.y,
      height: selectedBox.height,
      width: selectedBox.width,
      text: selectedBox.text,
    }
    newBox[field] = transform ? transform(value) : value;
    const newBoxes = boxes.map((b, ii) => ii === activeBox ? newBox : b);

    setBoxes(newBoxes);
  };

  const updateZoom = ({ target: { value }}) => {
    setZoom(value);
  };

  const deleteBox = () => {
    const newBoxes = boxes.filter((b, ii) => ii === activeBox ? false : true);

    setBoxes(newBoxes);
    setActiveBox(null);
  };

  if (!selectedBox) {
    return (
      <div className={styles.editor}>
        Zoom ({zoom}):
        <input type="range" min="1" max="5" onChange={updateZoom} value={zoom} />
      </div>
    );
  }

  return (
    <div className={styles.editor}>
      Text:
      <input type="text" onChange={(e) => updateField('text', e)} value={selectedBox.text || ''} />
      <br />
      X:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('x', e, parseFloat)} value={selectedBox.x.toFixed(4) || '0'} />
      <br />
      Y:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('y', e, parseFloat)} value={selectedBox.y.toFixed(4) || '0'} />
      <br />
      Width:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('width', e, parseFloat)} value={selectedBox.width.toFixed(4) || '0'} />
      <br />
      Height:
      <input type="number" max="1" min="0" step="0.0001" onChange={(e) => updateField('height', e, parseFloat)} value={selectedBox.height.toFixed(4) || '0'} />
      <br />
      Delete:
      <input type="button" onClick={deleteBox} value="Delete" />
      <br />
      Zoom ({zoom}):
      <input type="range" min="1" max="5" onChange={updateZoom} value={zoom} />
    </div>
  );
};

export default Editor;
