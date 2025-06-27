import React, { useState } from 'react';
import { Input, Button, Select, message, Table, Form } from 'antd';
import { apiRequest } from '../api';

const features = ['病株率', '降水', '移栽期', '峰值', '温度', 'DayOfYear', '经度', '纬度', '年'];

const ApiPearson: React.FC = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await apiRequest<{ data: any }>('/feature-optimization-dataset/pearson', {
        method: 'POST',
        body: new URLSearchParams({
          targetVariable: values.targetVariable,
          featureVariables: values.featureVariables.join(','),
          threshold: values.threshold,
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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h2>Pearson相关性分析</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginBottom: 24 }}>
        <Form.Item name="targetVariable" label="目标变量" rules={[{ required: true, message: '请输入目标变量' }]}> <Input /> </Form.Item>
        <Form.Item name="featureVariables" label="特征变量" rules={[{ required: true, message: '请选择特征变量' }]}> <Select mode="multiple" options={features.map(f => ({ label: f, value: f }))} /> </Form.Item>
        <Form.Item name="threshold" label="阈值" rules={[{ required: true, message: '请输入阈值' }]}> <Input type="number" /> </Form.Item>
        <Form.Item name="filePath" label="文件路径" rules={[{ required: true, message: '请输入文件路径' }]}> <Input /> </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>分析</Button>
      </Form>
      {result && (
        <Table
          dataSource={Object.entries(result).map(([key, value], i) => ({ key, value }))}
          columns={[{ title: '特征', dataIndex: 'key' }, { title: '相关性', dataIndex: 'value' }]}
          pagination={false}
        />
      )}
    </div>
  );
};

export default ApiPearson; 