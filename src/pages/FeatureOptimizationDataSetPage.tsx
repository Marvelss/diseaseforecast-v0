import React, { useState } from 'react';
import { Input, Button, Table, Form, message } from 'antd';
import { apiRequest } from '../api';

interface DataSet {
  id: number;
  name: string;
  description: string;
  // 可根据后端返回补充字段
}

const FeatureOptimizationDataSetPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchDataSets = async () => {
    if (!userId) return message.warning('请输入用户ID');
    setLoading(true);
    try {
      const res = await apiRequest<{ data: DataSet[] }>(`/feature-optimization-dataset/user/${userId}`);
      setDataSets(res.data || []);
    } catch (e: any) {
      message.error('获取数据集失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values: any) => {
    try {
      await apiRequest('/feature-optimization-dataset', {
        method: 'POST',
        body: JSON.stringify({ ...values, userId: Number(userId) })
      });
      message.success('新建成功');
      fetchDataSets();
      form.resetFields();
    } catch (e: any) {
      message.error('新建失败: ' + e.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h2>特征优选数据集管理</h2>
      <Input.Search
        placeholder="请输入用户ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        onSearch={fetchDataSets}
        enterButton="查询"
        style={{ width: 300, marginBottom: 24 }}
      />
      <Table
        dataSource={dataSets}
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: '名称', dataIndex: 'name', key: 'name' },
          { title: '描述', dataIndex: 'description', key: 'description' },
        ]}
        rowKey="id"
        loading={loading}
        style={{ marginBottom: 32 }}
      />
      <h3>新建数据集</h3>
      <Form form={form} layout="inline" onFinish={handleCreate}>
        <Form.Item name="name" rules={[{ required: true, message: '请输入名称' }]}> <Input placeholder="名称" /> </Form.Item>
        <Form.Item name="description"> <Input placeholder="描述" /> </Form.Item>
        <Form.Item> <Button type="primary" htmlType="submit">新建</Button> </Form.Item>
      </Form>
    </div>
  );
};

export default FeatureOptimizationDataSetPage; 