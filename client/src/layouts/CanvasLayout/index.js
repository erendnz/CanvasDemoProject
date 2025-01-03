import React from 'react';
import TabsLayout from '../TabsLayout';
import Container from '../../components/Container';
import './index.scss';

const CanvasLayout = () => {
  return (
    <div className="canvas-layout">
      <TabsLayout />
      <Container />
    </div>
  );
};

export default CanvasLayout;
