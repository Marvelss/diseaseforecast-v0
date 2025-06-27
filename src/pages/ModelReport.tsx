import React from 'react';
import { Card, Typography, Divider, Alert, Image } from 'antd';
import { InfoCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// 假设这些变量来自上游选择或接口
const sceneName = '水稻纹枯病SEIR机理模型';
const dataTypes = ['遥感数据', '气象数据', '植保数据'];
const method = 'SEIR机理模型';
const featureMethod = 'Pearson相关性分析';
const features = ['峰值', '温度', '移栽期', '降水'];
const r2 = 0.445;
const rmse = 10.753;

const today = new Date();
const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

const ModelReport: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 32, background: '#fff', minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto', paddingBottom: 100 }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: 0 }}>多场景作物病虫害快速预测建模报告</Title>
      <div style={{ textAlign: 'center', fontSize: 20, margin: '8px 0 0 0' }}>
        面状动态建模场景: {sceneName}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0 0 0' }}>
        <Text strong>编号: 1P12C1234O2M3W9</Text>
        <Text strong>日期: <span style={{ fontWeight: 700 }}>{dateStr}</span></Text>
      </div>
      <Divider style={{ borderColor: '#f5b800', margin: '16px 0' }} />
      <Alert
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        message={<b>摘要</b>}
        description={
          <div style={{ marginTop: 8 }}>
            <div>本次建模情况如下：</div>
            <div style={{ margin: '8px 0 0 32px', lineHeight: 2 }}>
              场景名称：{sceneName}<br />
              数据类型：{dataTypes.join('、')}<br />
              优选算法：{featureMethod}<br />
              优选特征：{features.join('、')}<br />
              建模方法：{method}<br />
              模型精度：R方={r2}，RMSE={rmse}
            </div>
          </div>
        }
        style={{ marginBottom: 32 }}
      />
      <Card title={<span><BarChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />原始数据</span>} bordered={false} style={{ marginBottom: 24, background: '#f6fcff' }} headStyle={{ fontSize: 20, background: '#e6f7ff' }}>
        <div style={{ marginBottom: 8 }}>原始数据集情况如下：</div>
        <div style={{ margin: '0 0 0 32px', lineHeight: 2 }}>
          数据类型：{dataTypes.join('、')}<br />
          上传字段：温度、降水<br />
          sentinel卫星影像、MCD12Q1土地覆盖类型<br />
          峰值、移栽期、水稻纹枯病株率调查数据
        </div>
      </Card>
      <Card title={<span><BarChartOutlined style={{ color: '#13c2c2', marginRight: 8 }} />预处理</span>} bordered={false} style={{ marginBottom: 24, background: '#f6fffa' }} headStyle={{ fontSize: 20, background: '#e6fffb' }}>
        <div style={{ marginBottom: 8 }}>预处理情况如下：</div>
        <div style={{ margin: '0 0 0 32px', lineHeight: 2 }}>
          预处理对象：移栽期<br />
          预处理内容：裁剪、重采样
        </div>
      </Card>
      <Card title={<span><BarChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />特征计算</span>} bordered={false} style={{ marginBottom: 24, background: '#f6fff6' }} headStyle={{ fontSize: 20, background: '#f6ffed' }}>
        <div style={{ marginBottom: 8 }}>特征计算情况如下：</div>
        <div style={{ margin: '0 0 0 32px', lineHeight: 2 }}>
          特征计算对象：sentinel卫星影像、MCD12Q1土地覆盖类型、降水、温度<br />
          特征计算内容：植被指数计算、景观指数计算、时空抽取<br />
          输出特征内容：NDVI、类别别LPI指数、降水、温度
        </div>
      </Card>
      <Card title={<span><BarChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />特征优选</span>} bordered={false} style={{ marginBottom: 24, background: '#faf6ff' }} headStyle={{ fontSize: 20, background: '#f9f0ff' }}>
        <div style={{ marginBottom: 8 }}>特征优选情况如下：</div>
        <div style={{ margin: '0 0 0 32px', lineHeight: 2 }}>
          优选算法：{featureMethod}<br />
          优选结果：{features.join('、')}
        </div>
        <div style={{ margin: '16px 0 0 32px' }}>
          <Image src="/src/assets/feature_corr_heatmap.png" width={400} alt="特征相关性热力图" />
        </div>
      </Card>
      <Card title={<span><BarChartOutlined style={{ color: '#f5222d', marginRight: 8 }} />模型构建</span>} bordered={false} style={{ marginBottom: 24, background: '#fff6f6' }} headStyle={{ fontSize: 20, background: '#fff1f0' }}>
        <div style={{ marginBottom: 8 }}>模型构建情况如下：</div>
        <div style={{ margin: '0 0 0 32px', lineHeight: 2 }}>
          建模方法：{method}<br />
          模型精度：R方={r2}，RMSE={rmse}
        </div>
        <div style={{ margin: '16px 0 0 32px' }}>
          <Image src="/src/assets/model_scatter.png" width={400} alt="模型散点图" />
        </div>
      </Card>
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.95)', zIndex: 100, padding: '16px 0', textAlign: 'center', boxShadow: '0 -2px 8px #eee' }}>
        <button onClick={() => navigate('/')} style={{ padding: '10px 36px', fontSize: 18, borderRadius: 6, border: '1px solid #1890ff', background: '#fff', color: '#1890ff', cursor: 'pointer', boxShadow: '0 2px 8px #e6f7ff' }}>返回主页</button>
      </div>
    </div>
  );
};

export default ModelReport; 