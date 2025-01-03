import React, { useState, useEffect } from 'react';
import './index.scss';
import { getCanvases } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCanvases, addTab, removeCanvas } from '../../store/actions'; 

const ActivityBar = () => {
  const dispatch = useDispatch();
  const canvases = useSelector(state => state.canvases);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchCanvases = async () => {
    try {
      const canvasList = await getCanvases();
      dispatch(setCanvases(canvasList));
    } catch (error) {
      console.error('Error fetching canvases:', error);
    }
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  const handleNewCanvas = () => {
    dispatch(addTab());
  };

  const handleCanvasClick = (canvas) => {
    dispatch({ type: 'ADD_TAB_SUCCESS', payload: { id: canvas.canvasId, title: canvas.canvasName } });
  };

  const handleDeleteCanvas = (canvas) => {
    dispatch(removeCanvas(canvas)); 
  };

  return (
    <aside className={`activity-bar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? '❮' : '❯'}
      </button>
      {isSidebarOpen && (
        <nav>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Canvases {isDropdownOpen ? '▲' : '▼'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown">
              {canvases.map((canvas) => (
                <div key={canvas.CanvasId} className="dropdown-item">
                  <span onClick={() => handleCanvasClick(canvas)}>{canvas.canvasName}</span>
                  <button className="delete-button" onClick={() => handleDeleteCanvas(canvas)}>✖</button>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleNewCanvas}>
            New Canvas
            <span className="plus-icon">+</span>
          </button>

        </nav>
      )}
    </aside>
  );
};

export default ActivityBar;
