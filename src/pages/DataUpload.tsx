import React, { useState } from 'react';
import { Tree, Upload, Button, Tabs, message, List, Typography, Pagination, Card } from 'antd';
import { UploadOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;

// 数据类型树结构
const treeData = [
  {
    title: '原始数据集',
    key: 'root',
    children: [
      {
        title: '气象数据',
        key: 'weather',
        children: [
          { title: '降水', key: 'rain' },
          { title: '温度', key: 'temp' },
        ],
      },
      {
        title: '植保数据',
        key: 'plant',
        children: [
          { title: '峰值', key: 'peak' },
          { title: '移栽期', key: 'transplant' },
          { title: '热病病害调查数据', key: 'disease' },
        ],
      },
      {
        title: '遥感数据',
        key: 'remote',
        children: [
          { title: '其他', key: 'other' },
          { title: 'MCD12Q1土地覆盖类型', key: 'mcd12q1' },
          {
            title: 'sentinel卫星影像',
            key: 'sentinel',
          },
        ],
      },
    ],
  },
];

const DATASET_TABS = [
  { key: 'weather', label: '气象数据' },
  { key: 'plant', label: '植保数据' },
  { key: 'remote', label: '遥感数据' },
];

const DATASET_LABELS: Record<string, string> = {
  weather: '气象数据',
  plant: '植保数据',
  remote: '遥感数据',
};

const PAGE_SIZE = 10;

const DataUpload: React.FC = () => {
  const [checkedKeys, setCheckedKeys] = useState<any[]>(['weather', 'plant', 'remote']);
  const [selectedTab, setSelectedTab] = useState<string>('weather');
  const [fileLists, setFileLists] = useState<Record<string, any[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Tree onCheck 兼容类型
  const handleTreeCheck = (checked: any) => {
    if (Array.isArray(checked)) setCheckedKeys(checked);
    else if (checked && Array.isArray(checked.checked)) setCheckedKeys(checked.checked);
  };

  // 文件上传
  const handleChange = (info: any) => {
    const files = info.fileList;
    setFileLists(prev => ({ ...prev, [selectedTab]: files }));
  };

  // 文件删除
  const handleRemove = (file: any) => {
    setFileLists(prev => ({
      ...prev,
      [selectedTab]: (prev[selectedTab] || []).filter((f: any) => f.uid !== file.uid),
    }));
  };

  // 分页
  const pagedFiles = (fileLists[selectedTab] || []).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div style={{ display: 'flex', height: '80vh', background: '#fff', borderRadius: 8 }}>
      {/* 左侧树状结构（多选勾选框） */}
      <div style={{ width: 260, borderRight: '1px solid #eee', padding: 24, overflowY: 'auto' }}>
        <Title level={5}>数据与特征</Title>
        <Tree
          checkable
          treeData={treeData}
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={handleTreeCheck}
        />
      </div>
      {/* 右侧上传区 */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto', position: 'relative' }}>
        <Button icon={<HomeOutlined />} style={{ position: 'absolute', right: 32, top: 24, zIndex: 10 }} onClick={() => navigate('/')}>返回主页</Button>
        <Title level={5}>上传数据集</Title>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontWeight: 500 }}>选择数据集：</span>
          {DATASET_TABS.map(tab => (
            <Button
              key={tab.key}
              type={selectedTab === tab.key ? 'primary' : 'default'}
              style={{ marginRight: 8 }}
              onClick={() => { setSelectedTab(tab.key); setCurrentPage(1); }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <Card style={{ marginBottom: 16 }}>
          <Upload.Dragger
            fileList={fileLists[selectedTab] || []}
            onChange={handleChange}
            onRemove={handleRemove}
            multiple
            beforeUpload={() => false}
            accept=".tif,.shp,.txt,.cpg,.dbf,.prj,.xml,.shx,.xlsx,.xls,.tiff"
            style={{ width: '100%' }}
          >
            <p>Drag and drop files here or <Button icon={<UploadOutlined />}>Browse files</Button></p>
            <p style={{ color: '#888', fontSize: 12 }}>Limit 200MB per file • TIF, SHP, TXT, CPG, DBF, PRJ, XML, SHX, XLSX, XLS, TIFF</p>
          </Upload.Dragger>
        </Card>
        <List
          header={<div>已上传文件</div>}
          dataSource={pagedFiles}
          renderItem={item => (
            <List.Item
              actions={[
                <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleRemove(item)} />,
              ]}
            >
              <span>{item.name}</span>
            </List.Item>
          )}
          locale={{ emptyText: '暂无文件' }}
        />
        <Pagination
          style={{ marginTop: 16, textAlign: 'right' }}
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={fileLists[selectedTab]?.length || 0}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
        <div style={{ marginTop: 24, background: '#fffbe6', padding: 16, borderRadius: 6, color: '#ad8b00' }}>
          <b>数据上传注意事项</b>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>文件命名格式应包含特征名称、年份、DOY等信息</li>
            <li>支持多种数据格式，单文件最大200MB</li>
            <li>请确保上传数据与所选数据类型一致</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataUpload; 