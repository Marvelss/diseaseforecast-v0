import { useState } from 'react';
import { Tabs, Tree, Switch, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

import './MyDrawerLeft.css'; // 引入CSS文件

// 模拟文件树数据
const fileTreeData = [
  {
    title: 'Root Folder',
    key: '0',
    children: [
      {
        title: 'Subfolder 1',
        key: '0-1',
        children: [
          { title: 'File 1', key: '0-1-1' },
          { title: 'File 2', key: '0-1-2' },
        ],
      },
      {
        title: 'Subfolder 2',
        key: '0-2',
        children: [
          { title: 'File 3', key: '0-2-1' },
          { title: 'File 4', key: '0-2-2' },
        ],
      },
    ],
  },
];

// 模拟图层数据
const layerData = [
  { id: 1, name: 'Layer 1', visible: true },
  { id: 2, name: 'Layer 2', visible: false },
  { id: 3, name: 'Layer 3', visible: true },
];

function MyDrawerLeft() {
  // 定义一个状态来控制div的显示与隐藏
  const [isVisible, setIsVisible] = useState(false);
  // 定义图层数据的状态
  const [layers, setLayers] = useState(layerData);
  // 定义选中文件的状态
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // 点击按钮时切换状态
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  // 处理图层显隐切换
  const handleLayerVisibilityChange = (id: number, checked: boolean) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, visible: checked } : layer
      )
    );
  };

  // 处理图层删除
  const handleLayerDelete = (id: number) => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
  };

// 处理文件选择变化
const onSelectFile = (checked: { checked: string[]; halfChecked: string[] }) => {
  setSelectedFiles(checked.checked); // 只关心完全选中的文件
};

  return (
    <div className="MyDrawerLeftDiv">
      <div className={`sliding-div-left ${isVisible ? 'visible' : ''}`}>
        <button className="toggle-button-left" onClick={toggleDiv}>
          打开左侧边栏
        </button>
        <Tabs defaultActiveKey="1">
          <TabPane tab="文件选择" key="1">
          <Tree
            treeData={fileTreeData}
            checkable // 显示复选框
            multiple // 支持多选
            // onCheck={onSelectFile} // 处理选择变化
          />
          </TabPane>
          {/* <TabPane tab="图层控制" key="2">
            {layers.map((layer) => (
              <div key={layer.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <Switch checked={layer.visible} onChange={(checked) => handleLayerVisibilityChange(layer.id, checked)} />
                <span style={{ margin: '0 10px' }}>{layer.name}</span>
                <Button icon={<DeleteOutlined />} onClick={() => handleLayerDelete(layer.id)} />
              </div>
            ))}
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
}

export default MyDrawerLeft;