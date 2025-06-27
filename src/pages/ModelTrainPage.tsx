import React, { useState } from 'react';
import { Input, Button, message, Typography } from 'antd';
import { apiRequest } from '../api';

const { Paragraph } = Typography;

const ModelTrainPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    if (!userId) return message.warning('请输入用户ID');
    setLoading(true);
    try {
      const res = await apiRequest<string>('/model-building-dataset/model-train', {
        method: 'POST',
        body: JSON.stringify({ userId: Number(userId) })
      });
      setResult(res || '提交成功');
      message.success('提交成功');
    } catch (e: any) {
      message.error('提交失败: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <h2>模型训练</h2>
      <Input
        placeholder="请输入用户ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleTrain} loading={loading}>提交训练任务</Button>
      {result && <Paragraph style={{ marginTop: 24 }}>结果：{result}</Paragraph>}
    </div>
  );
};

export default ModelTrainPage; 