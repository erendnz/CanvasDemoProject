import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeTab } from '../../store/actions';
import CanvasView from '../../components/CanvasView';
import './index.scss';

const TabsLayout = () => {
  const tabs = useSelector(state => state.tabs);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleRemoveTab = (index) => {
    dispatch(removeTab(index));
    setSelectedTab((prev) => (prev >= index ? prev - 1 : prev));
  };

  return (
    <div className="tabs-layout">
      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index}>
              {tab.title}
              <button onClick={(e) => { e.stopPropagation(); handleRemoveTab(index); }}>x</button>
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <CanvasView canvasId={tab.id} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsLayout;
