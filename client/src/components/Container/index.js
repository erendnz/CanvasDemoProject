import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Rnd } from 'react-rnd';
import './index.scss';

const elements = [
  { id: 1, name: 'Add', symbol: '+' },
  { id: 2, name: 'Subtract', symbol: '−' },
  { id: 3, name: 'Product', symbol: '×' },
  { id: 4, name: 'Divide', symbol: '÷' },
  { id: 5, name: 'Value', symbol: 'Value' },
  { id: 6, name: 'Step', symbol: 'Step' },
  { id: 7, name: 'Ramp', symbol: 'Ramp' },
  { id: 8, name: 'SaveData', symbol: 'SaveData' },
];

const Container = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Rnd
      className="container"
      default={{
        x: 20,
        y: 100
      }}
      bounds="parent"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
        topRight: true,
        topLeft: true,
        right: true,
        left: true,
        bottom: true,
        top: true,
      }}
      disableDragging={isOpen} 
    >
      <div className="container-header" onClick={() => setIsOpen(!isOpen)}>
        Container
      </div>
      <div className={`elements ${isOpen ? 'open' : 'closed'}`}>
        {elements.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </div>
    </Rnd>
  );
};

const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { element },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="element"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {element.symbol}
    </div>
  );
};

export default Container;
