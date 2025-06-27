import React, { useState } from 'react';
import { Select, Card, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const tasks = [
  { label: '任务A', value: 'a', heatmap: '/src/assets/heatmap_example.png', analysis: '任务A热力图分析结果：高风险区域集中在西南部，需重点关注。' },
  { label: '任务B', value: 'b', heatmap: '/src/assets/heatmap_example.png', analysis: '任务B热力图分析结果：整体风险较低，分布均匀。' },
];

const HeatmapAnalysis: React.FC = () => {
  const [selected, setSelected] = useState('a');
  const task = tasks.find(t => t.value === selected);
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <Title level={2}>热力分析</Title>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={selected}
          onChange={setSelected}
          options={tasks.map(t => ({ label: t.label, value: t.value }))}
          style={{ width: 240 }}
        />
      </div>
      <Card title="热力图" style={{ marginBottom: 24 }}>
        <Image src={task?.heatmap} width={500} alt="热力图" />
      </Card>
      <Card title="数据分析">
        <Paragraph>{task?.analysis}</Paragraph>
      </Card>
    </div>
  );
};

export default HeatmapAnalysis; 