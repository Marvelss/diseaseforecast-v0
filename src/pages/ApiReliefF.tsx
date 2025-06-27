import React, { useState } from 'react';
import { Button, Select, Table, Checkbox, Tag, Input, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

const features = ['病株率', '降水', '移栽期', '峰值', '温度', 'DayOfYear', '经度', '纬度', '年'];
const selectionMethods = [
  { label: 'TopK', value: 'TopK' },
  { label: 'Threshold', value: 'Threshold' }
];

const mockData = [
  { key: 0, 经度: 109.871, 纬度: 22.0652, 年: 2019, DayOfYear: 237, 病株率: 2.1, 峰值: 100, 温度: 29.46, 降水: 24 },
  { key: 1, 经度: 109.871, 纬度: 22.0652, 年: 2019, DayOfYear: 243, 病株率: 8.6, 峰值: 100, 温度: 25.65, 降水: 258 },
  { key: 2, 经度: 109.871, 纬度: 22.0652, 年: 2019, DayOfYear: 248, 病株率: 25.6, 峰值: 100, 温度: 26.73, 降水: 93 },
  { key: 3, 经度: 109.871, 纬度: 22.0652, 年: 2019, DayOfYear: 253, 病株率: 34.8, 峰值: 100, 温度: 26.58, 降水: 316 },
  { key: 4, 经度: 109.871, 纬度: 22.0652, 年: 2019, DayOfYear: 258, 病株率: 44, 峰值: 100, 温度: 27.39, 降水: 4 },
];

const columns = [
  { title: '经度', dataIndex: '经度', key: '经度' },
  { title: '纬度', dataIndex: '纬度', key: '纬度' },
  { title: '年', dataIndex: '年', key: '年' },
  { title: 'DayOfYear', dataIndex: 'DayOfYear', key: 'DayOfYear' },
  { title: '病株率', dataIndex: '病株率', key: '病株率' },
  { title: '峰值', dataIndex: '峰值', key: '峰值' },
  { title: '温度', dataIndex: '温度', key: '温度' },
  { title: '降水', dataIndex: '降水', key: '降水' },
];

const ApiReliefF: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
    form.setFieldsValue({ featureVariables: e.target.checked ? features : [] });
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await apiRequest<{ data: any }>('/feature-optimization-dataset/relief-f', {
        method: 'POST',
        body: new URLSearchParams({
          targetVariable: values.targetVariable,
          featureVariables: values.featureVariables.join(','),
          selectionMethod: values.selectionMethod,
          selectionParam: values.selectionParam,
          filePath: values.filePath
        }) as any
      });
      setResult(res.data);
    } catch (e: any) {
      message.error('分析失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const featureVariables = Form.useWatch('featureVariables', form) || [];

  return (
    <div style={{ padding: 32, textAlign: 'left', maxWidth: 900, margin: '0 auto' }}>
      <h2>ReliefF特征优选</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginBottom: 24 }}>
        <Form.Item name="targetVariable" label="目标变量" rules={[{ required: true, message: '请输入目标变量' }]}> <Input /> </Form.Item>
        <Form.Item name="featureVariables" label="特征变量" rules={[{ required: true, message: '请选择特征变量' }]}> <Select mode="multiple" options={features.map(f => ({ label: f, value: f }))} /> </Form.Item>
        <Checkbox checked={selectAll} onChange={handleSelectAll} style={{ marginBottom: 8 }}>全选特征</Checkbox>
        <Form.Item name="selectionMethod" label="选择方法" rules={[{ required: true, message: '请选择方法' }]}> <Select options={selectionMethods} /> </Form.Item>
        <Form.Item name="selectionParam" label="参数" rules={[{ required: true, message: '请输入参数' }]}> <Input /> </Form.Item>
        <Form.Item name="filePath" label="文件路径" rules={[{ required: true, message: '请输入文件路径' }]}> <Input /> </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>开始分析</Button>
      </Form>
      <div style={{ marginBottom: 16 }}>
        {featureVariables.map((f: string) => (
          <Tag key={f} color="red" style={{ fontSize: 16, marginBottom: 4 }}>{f}</Tag>
        ))}
      </div>
      {result && (
        <Table
          dataSource={Object.entries(result).map(([key, value], i) => ({ key, value }))}
          columns={[{ title: '特征', dataIndex: 'key' }, { title: '分数/结果', dataIndex: 'value' }]}
          pagination={false}
        />
      )}
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button onClick={() => navigate('/')}>返回主页</Button>
      </div>
    </div>
  );
};

export default ApiReliefF; 