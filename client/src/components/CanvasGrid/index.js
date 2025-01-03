import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Rnd } from 'react-rnd';
import './index.scss';
import { saveElements } from '../../services/api'; 

const CanvasGrid = () => {
  const [droppedElements, setDroppedElements] = useState([]);
  const [canvasId] = useState(1); // Örnek olarak bir canvas ID, gerektiğinde değiştirilebilir

  const [, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      handleDrop(item, offset);
    },
  }));

  const handleDrop = (item, offset) => {
    setDroppedElements((prev) => [
      ...prev,
      { ...item.element, x: offset.x, y: offset.y, width: 100, height: 100 },
    ]);
  };

  const handleDragStop = (index, e, d) => {
    const updatedElements = [...droppedElements];
    updatedElements[index].x = d.x;
    updatedElements[index].y = d.y;
    setDroppedElements(updatedElements);
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const updatedElements = [...droppedElements];
    updatedElements[index].width = ref.offsetWidth;
    updatedElements[index].height = ref.offsetHeight;
    updatedElements[index].x = position.x;
    updatedElements[index].y = position.y;
    setDroppedElements(updatedElements);
  };

  const handleSave = async () => {
    const elementsToSave = droppedElements.map((element) => {
      let elementType = 0;
      let operatorType = null;
      let inputType = null;
      let startValue = element.StartValue;
      let endValue = element.EndValue;

      if (['Add', 'Subtract', 'Product', 'Divide'].includes(element.name)) {
        elementType = 1;
        operatorType = element.name === 'Add' ? 1 : element.name === 'Subtract' ? 2 : element.name === 'Product' ? 3 : 4;
      } else if (['Value', 'Step', 'Ramp'].includes(element.name)) {
        elementType = 2;
        inputType = element.name === 'Value' ? 1 : element.name === 'Step' ? 2 : 3;
        if (inputType !== 2 && inputType !== 3) {
          startValue = null;
          endValue = null;
        }
      } else if (element.name === 'SaveData') {
        elementType = 3;
      }

      return {
        ElementId: element.id,
        CanvasId: CanvasId,
        ElementType: elementType,
        OperatorType: operatorType,
        InputType: inputType,
        PositionX: element.x,
        PositionY: element.y,
        Width: element.width,
        Height: element.height,
        Rotation: 0, 
        StartValue: startValue,
        EndValue: endValue,
      };
    });

    try {
      await saveElements(elementsToSave);
      alert('Canvas başarıyla kaydedildi!');
    } catch (error) {
      console.error('Canvas kaydedilirken hata oluştu:', error);
      alert('Canvas kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div ref={drop} className="canvas-layout">
      <button className="save-button" onClick={handleSave}>Kaydet</button>
      <div className="grid">
        {droppedElements.map((element, index) => (
          <Rnd
            key={index}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDragStop={(e, d) => handleDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(index, e, direction, ref, delta, position)
            }
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            bounds="parent"
          >
            <div className="dropped-element">
              {element.name}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default CanvasGrid;
