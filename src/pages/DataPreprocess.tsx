import React, { useState } from 'react';
import { Tree, Checkbox, Button, Typography, Card } from 'antd';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const { Title } = Typography;

const templateTree = [
  {
    title: '模板选择',
    key: 'root',
    children: [
      { title: '裁剪模板', key: 'clip' },
      { title: '重采样模板', key: 'resample' },
      { title: 'MCD12Q1土地覆盖类型', key: 'mcd12q1' },
      { title: 'sentinel卫星影像', key: 'sentinel' },
    ],
  },
];

const preprocessMethods = [
  { label: '重采样', value: 'resample' },
  { label: '裁剪', value: 'clip' },
  { label: '空间插值', value: 'interpolation' },
];

const DataPreprocess: React.FC = () => {
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [checkedMethods, setCheckedMethods] = useState<string[]>([]);
  const navigate = useNavigate();

  // Tree onCheck 兼容类型
  const handleTreeCheck = (checked: any) => {
    if (Array.isArray(checked)) setCheckedKeys(checked);
    else if (checked && Array.isArray(checked.checked)) setCheckedKeys(checked.checked);
  };

  return (
    <div style={{ display: 'flex', height: '80vh', background: '#fff', borderRadius: 8 }}>
      {/* 左侧模板树（多选勾选框） */}
      <div style={{ width: 260, borderRight: '1px solid #eee', padding: 24, overflowY: 'auto' }}>
        <Title level={5}>模板选择</Title>
        <Tree
          checkable
          treeData={templateTree}
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={handleTreeCheck}
        />
      </div>
      {/* 中间地图/数据预览 */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto', position: 'relative' }}>
        <Button icon={<HomeOutlined />} style={{ position: 'absolute', right: 32, top: 24, zIndex: 10 }} onClick={() => navigate('/')}>返回主页</Button>
        <Title level={5}>原始数据</Title>
        <Card style={{ height: 400, marginBottom: 16 }}>
          <MapContainer center={[30.181594, 120.031156]} zoom={16} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; OpenStreetMap contributors"
            />
          </MapContainer>
        </Card>
      </div>
      {/* 右侧预处理方法选择 */}
      <div style={{ width: 320, borderLeft: '1px solid #eee', padding: 32, overflowY: 'auto' }}>
        <Title level={5}>预处理方法</Title>
        <Checkbox.Group
          options={preprocessMethods}
          value={checkedMethods}
          onChange={list => setCheckedMethods(list as string[])}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        />
        <Button type="primary" style={{ marginTop: 32 }} size="large">执行处理</Button>
      </div>
    </div>
  );
};

export default DataPreprocess; 