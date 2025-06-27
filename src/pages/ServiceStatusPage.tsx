import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';
import { apiRequest } from '../api';

const { Paragraph } = Typography;

const ServiceStatusPage: React.FC = () => {
  const [health, setHealth] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const healthRes = await apiRequest<{ data: string }>('/feature-optimization-dataset/health');
      setHealth(healthRes.data);
      const statusRes = await apiRequest<{ data: any }>('/feature-optimization-dataset/status');
      setStatus(statusRes.data);
    } catch (e: any) {
      setHealth('查询失败: ' + e.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h2>特征优选服务健康/状态</h2>
      <Button type="primary" onClick={fetchStatus} loading={loading}>查询服务状态</Button>
      <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
        <Paragraph>健康检查：{health}</Paragraph>
        <Paragraph>服务状态：<pre style={{ background: '#f6f6f6', padding: 12 }}>{status ? JSON.stringify(status, null, 2) : ''}</pre></Paragraph>
      </Space>
    </div>
  );
};

export default ServiceStatusPage; 