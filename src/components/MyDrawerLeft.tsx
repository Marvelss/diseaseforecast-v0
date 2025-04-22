import { useState } from 'react';
import { Tabs, Tree, Switch, Button, Select, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

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

// 预处理方法列表
const preprocessingMethods = ['Normalization', 'Standardization', 'Log Transformation'];

const methodParamsMap: {
  [key: string]: { label: string; placeholder: string; stateKey: string }[];
} = {
  Normalization: [
    { label: '最小值', placeholder: '请输入最小值', stateKey: 'param1' },
    { label: '最大值', placeholder: '请输入最大值', stateKey: 'param2' },
  ],
  Standardization: [
    { label: '均值', placeholder: '请输入均值', stateKey: 'param1' },
    { label: '标准差', placeholder: '请输入标准差', stateKey: 'param2' },
  ],
  'Log Transformation': [
    { label: '基数', placeholder: '请输入对数基数', stateKey: 'param1' },
  ],
};

function MyDrawerLeft() {
  // 定义一个状态来控制div的显示与隐藏
  const [isVisible, setIsVisible] = useState(false);
  // 定义图层数据的状态
  const [layers, setLayers] = useState(layerData);
  // 定义选中文件的状态
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

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

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const handleParam1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam1(e.target.value);
  };

  const handleParam2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam2(e.target.value);
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
              onCheck={(checkedKeys: { checked: React.Key[]; halfChecked: React.Key[] } | React.Key[], info: any) => {
                const checked: string[] = [];
                if (Array.isArray(checkedKeys)) {
                  checkedKeys.forEach((key) => {
                    if (typeof key === 'string') {
                      checked.push(key);
                    }
                  });
                } else {
                  checkedKeys.checked.forEach((key) => {
                    if (typeof key === 'string') {
                      checked.push(key);
                    }
                  });
                }
                onSelectFile({ checked, halfChecked: [] });
              }} // 处理选择变化
            />
          </TabPane>
          
        </Tabs>
      </div>
    </div>
  );
}

export default MyDrawerLeft;