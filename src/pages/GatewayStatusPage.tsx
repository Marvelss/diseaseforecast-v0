import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';
import { apiRequest } from '../api';

const { Paragraph } = Typography;

const GatewayStatusPage: React.FC = () => {
  const [services, setServices] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchGatewayInfo = async () => {
    setLoading(true);
    try {
      const servicesRes = await apiRequest<any>('/gateway/services');
      setServices(servicesRes);
      const statusRes = await apiRequest<any>('/gateway/status');
      setStatus(statusRes);
    } catch (e: any) {
      setServices('查询失败: ' + e.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h2>网关服务发现/状态</h2>
      <Button type="primary" onClick={fetchGatewayInfo} loading={loading}>查询网关信息</Button>
      <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
        <Paragraph>服务列表：<pre style={{ background: '#f6f6f6', padding: 12 }}>{services ? JSON.stringify(services, null, 2) : ''}</pre></Paragraph>
        <Paragraph>网关状态：<pre style={{ background: '#f6f6f6', padding: 12 }}>{status ? JSON.stringify(status, null, 2) : ''}</pre></Paragraph>
      </Space>
    </div>
  );
};

export default GatewayStatusPage; 