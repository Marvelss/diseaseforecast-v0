import React from 'react';
import {  FullscreenExitOutlined, ToolOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const MyFloatButton: React.FC = () => (
 
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 25 , zIndex:999 }}
      icon={<ToolOutlined />}
    >
      <FloatButton icon={<FullscreenExitOutlined />} />
      <FloatButton icon={<ZoomOutOutlined />} />
    </FloatButton.Group>
    

);

export default MyFloatButton;