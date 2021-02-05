import React, { useState, useEffect, useRef } from 'react';

import styles from './Editor.module.css';

const min = (a, b) => (
  a < b ? a : b
);

const Editor = ({ image, x, y, width, height, boxes, setBoxes, activeBox, setActiveBox, naturalHeight, naturalWidth }) => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    const container = containerRef.current;

    const resize = () => {
      const ch = container.clientHeight;
      const cw = container.clientWidth;

      setContainerHeight(ch);
      setContainerWidth(cw);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);

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

  const deleteBox = () => {
    const newBoxes = boxes.filter((b, ii) => ii === activeBox ? false : true);

    setBoxes(newBoxes);
    setActiveBox(null);
  };

  let zoomAmount;
  let maxHeight;
  let maxWidth;
  let style;

  if (selectedBox !== null && selectedBox !== undefined) {
    zoomAmount = min(containerWidth / (selectedBox.width * naturalWidth), containerHeight / (selectedBox.height * naturalHeight));
    maxHeight = containerWidth * selectedBox.height * naturalHeight / (selectedBox.width * naturalWidth);
    maxWidth = containerHeight * selectedBox.width * naturalWidth / (selectedBox.height * naturalHeight);

    style = {
      backgroundImage: `url(${image})`,
      backgroundPosition: `-${selectedBox.x *  naturalWidth * zoomAmount}px -${selectedBox.y * naturalHeight * zoomAmount}px`,
      backgroundSize: `${naturalWidth * zoomAmount}px`,
      maxHeight: `${maxHeight}px`,
      maxWidth: `${maxWidth}px`,
    }
  }

  return (
    <div className={styles.editor}>
      <div>
        Select box:
        <select value={activeBox === null ? '' : activeBox} onChange={({ target: { value }}) => setActiveBox(value === '' ? null : parseInt(value))}>
          <option value="">-</option>
          {boxes.map((box, ii) => <option key={ii} value={ii}>{ii + 1}{boxes[ii].text !== undefined ? ` - ${boxes[ii].text}` : ''}</option>)}
        </select>
        <br />
        {(selectedBox !== null) && (
          <>
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
          </>
        )}
      </div>
      <div className={styles.imageWrapper} ref={containerRef}>
        {(selectedBox !== null) && (
          <div style={style} className={styles.image} />
        )}
      </div>
    </div>
  );
};

export default Editor;
