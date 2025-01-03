import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';
import { setSelectedElement } from '../../store/actions';
import { updateElement } from '../../services/api';

const Properties = () => {
  const selectedElement = useSelector(state => state.selectedElement);
  const dispatch = useDispatch();

  const handleSave = async () => { 
    if (selectedElement) { 
      try { 
        const updatedElement = { 
          ...selectedElement, 
          positionX: selectedElement.x, 
          positionY: selectedElement.y, 
          value: selectedElement.value,
          startValue: selectedElement.startValue, 
          endValue: selectedElement.endValue,
          startTime: selectedElement.startTime, 
          endTime: selectedElement.endTime, 
          stepTime: selectedElement.stepTime, 
        }; 
        
        await updateElement(updatedElement);
        dispatch(setSelectedElement(updatedElement));
        alert('Element updated successfully!'); 
      } catch (error) { 
        console.error('Error updating element:', error); 
        alert('An error occurred while updating the element.'); 
      } 
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSelectedElement({ ...selectedElement, [name]: value }));
  };

  if (!selectedElement) {
    return <div className="properties">No element selected</div>;
  }

  const isStep = selectedElement.name === 'Step';
  const isValue = selectedElement.name === 'Value';
  const isRamp = selectedElement.name === 'Ramp';

  return (
    <div className="properties">
      <h3>Properties</h3>
      <div className="property">
        <label>Width:</label>
        <input
          type="number"
          name="width"
          value={selectedElement.width || ''}
          readOnly 
        />
      </div>
      <div className="property">
        <label>Height:</label>
        <input
          type="number"
          name="height"
          value={selectedElement.height || ''}
          readOnly 
        />
      </div>
      <div className="property">
        <label>Coordinat X:</label>
        <input
          type="number"
          name="x"
          value={selectedElement.x || ''}
          readOnly 
        />
      </div>
      <div className="property">
        <label>Coordinat Y:</label>
        <input
          type="number"
          name="y"
          value={selectedElement.y || ''}
          readOnly 
        />
      </div>
      {(isValue || isRamp || isStep) && (
        <>
          <div className="property">
            <label>Value:</label>
            <input
              type="number"
              name="value"
              value={selectedElement.value || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {(isRamp || isStep) && (
        <>
        <div className="property">
          <label>Start Value:</label>
          <input
            type="number"
            name="startValue"
            value={selectedElement.startValue || ''}
            onChange={handleChange}
          />
        </div>
        <div className="property">
          <label>End Value:</label>
          <input
            type="number"
            name="endValue"
            value={selectedElement.endValue || ''}
            onChange={handleChange}
          />
        </div>
      </>
      )}
      {(isRamp) && (
        <>
          <div className="property">
            <label>Start Time:</label>
            <input
              type="number"
              name="startTime"
              value={selectedElement.startTime || ''}
              onChange={handleChange}
            />
          </div>
          <div className="property">
            <label>End Time:</label>
            <input
              type="number"
              name="endTime"
              value={selectedElement.endTime || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {(isStep) && (
        <>
          <div className="property">
            <label>Step Time:</label>
            <input
              type="number"
              name="stepTime"
              value={selectedElement.stepTime || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Properties;
