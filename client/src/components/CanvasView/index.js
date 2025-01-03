import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Rnd } from 'react-rnd';
import { useDispatch , useSelector } from 'react-redux';
import './index.scss';
import { saveElements, getCanvasElements } from '../../services/api';
import { removeElement , setSelectedElement } from '../../store/actions';

const CanvasView = ({ canvasId }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector(state => state.selectedElement);
  const [droppedElements, setDroppedElements] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const elements = await getCanvasElements(canvasId);
        setDroppedElements(elements.map(element => ({
          ...element,
          x: element.positionX,
          y: element.positionY,
          id: element.elementId,
          isTemporary: false, 
          name: element.elementType === 1 && element.operatorType === 1 ? 'Add' : element.elementType === 1 && element.operatorType === 2 ? 'Subtract' :
                element.elementType === 1 && element.operatorType === 3 ? 'Product' : element.elementType === 1 && element.operatorType === 4 ? 'Divide' :
                element.elementType === 2 && element.inputType === 1 ? 'Value' : element.elementType === 2 && element.inputType === 2 ? 'Step' :
                element.elementType === 2 && element.inputType === 3 ? 'Ramp' : 'SaveData',
          symbol: element.elementType === 1 && element.operatorType === 1 ? '+' : element.elementType === 1 && element.operatorType === 2 ? '-' :
                element.elementType === 1 && element.operatorType === 3 ? '×' : element.elementType === 1 && element.operatorType === 4 ? '÷' :
                element.elementType === 2 && element.inputType === 1 ? 'Value' : element.elementType === 2 && element.inputType === 2 ? 'Step' :
                element.elementType === 2 && element.inputType === 3 ? 'Ramp' : 'SaveData'
        })));
      } catch (error) {
        console.error('Error fetching canvas elements:', error);
      }
    };

    fetchElements();
  }, [canvasId]);

  const [, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      handleDrop(item, offset);
    },
  }));

  const handleDeleteElement = (id, isTemporary) => {
    if (!isTemporary) { 
      dispatch(removeElement(id));
    }
    setDroppedElements(prev => prev.filter(element => element.id !== id));
  };

  const handleDrop = (item, offset) => {
    console.log(item)
    const newElement = {
      ...item.element,
      x: offset.x,
      y: offset.y,
      width: 100,
      height: 100,
      isTemporary: true,
    };
    setDroppedElements(prev => [...prev, newElement]);
  };

  const handleDragStop = (index, e, d) => {
    const updatedElements = [...droppedElements];
    updatedElements[index].x = d.x;
    updatedElements[index].y = d.y;
    updatedElements[index].isTemporary = true;
    setDroppedElements(updatedElements);

    if (selectedElement && selectedElement.id === updatedElements[index].id) { 
        dispatch(setSelectedElement(updatedElements[index])); 
      }
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const updatedElements = [...droppedElements];
    updatedElements[index].width = ref.offsetWidth;
    updatedElements[index].height = ref.offsetHeight;
    updatedElements[index].x = position.x;
    updatedElements[index].y = position.y;
    updatedElements[index].isTemporary = true;
    setDroppedElements(updatedElements);

    if (selectedElement && selectedElement.id === updatedElements[index].id) { 
      dispatch(setSelectedElement(updatedElements[index])); 
    }
  };

  const handleSave = async () => {
    const elementsToSave = droppedElements.map((element) => {
      let elementType = 0;
      let operatorType = null;
      let inputType = null;
      let startValue = element.StartValue;
      let endValue = element.EndValue;
      let startTime = element.startTime;
      let endTime = element.endTime;
      let stepTime = element.stepTime;
      let value = element.value;

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
        CanvasId: canvasId,
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
        startTime: startTime,
        endTime: endTime,
        stepTime: stepTime,
        Value: value
      };
    });

    try {
      await saveElements(elementsToSave);
      const elements = await getCanvasElements(canvasId);
        setDroppedElements(elements.map(element => ({
          ...element,
          x: element.positionX,
          y: element.positionY,
          id: element.elementId,
          isTemporary: false, 
          name: element.elementType === 1 && element.operatorType === 1 ? 'Add' : element.elementType === 1 && element.operatorType === 2 ? 'Subtract' :
                element.elementType === 1 && element.operatorType === 3 ? 'Product' : element.elementType === 1 && element.operatorType === 4 ? 'Divide' :
                element.elementType === 2 && element.inputType === 1 ? 'Value' : element.elementType === 2 && element.inputType === 2 ? 'Step' :
                element.elementType === 2 && element.inputType === 3 ? 'Ramp' : 'SaveData',
          symbol: element.elementType === 1 && element.operatorType === 1 ? '+' : element.elementType === 1 && element.operatorType === 2 ? '-' :
                element.elementType === 1 && element.operatorType === 3 ? '×' : element.elementType === 1 && element.operatorType === 4 ? '÷' :
                element.elementType === 2 && element.inputType === 1 ? 'Value' : element.elementType === 2 && element.inputType === 2 ? 'Step' :
                element.elementType === 2 && element.inputType === 3 ? 'Ramp' : 'SaveData'
        })));
      alert('Canvas saved successfully!');
    } catch (error) {
      console.error('Error occurred while saving Canvas:', error);
      alert('An error occurred while saving Canvas.');
    }
  };

  return (
    <div ref={drop} className="canvas-view">
      <button className="save-button" onClick={handleSave}>Save</button>
      <div className="grid">
        {droppedElements.map((element, index) => (
          <Rnd
            key={index}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDragStop={(e, d) => handleDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
            onClick={() => dispatch(setSelectedElement(element))}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true
            }}
            bounds="parent"
          >
            <div className="dropped-element"> {element.symbol} 
              <button className="delete-button" onClick={() => handleDeleteElement(element.id, element.isTemporary)}>✖</button> 
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default CanvasView;
