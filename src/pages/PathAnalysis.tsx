import React, { useState } from 'react';
import { Select, Card, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const tasks = [
  { label: '任务A', value: 'a', pathImg: '/src/assets/path_example.png', analysis: '任务A路径分析：传播路径主要沿河谷分布，建议加强沿线监测。' },
  { label: '任务B', value: 'b', pathImg: '/src/assets/path_example.png', analysis: '任务B路径分析：无明显主路径，扩散较为分散。' },
];

const PathAnalysis: React.FC = () => {
  const [selected, setSelected] = useState('a');
  const task = tasks.find(t => t.value === selected);
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <Title level={2}>病虫害发生路径分析</Title>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={selected}
          onChange={setSelected}
          options={tasks.map(t => ({ label: t.label, value: t.value }))}
          style={{ width: 240 }}
        />
      </div>
      <Card title="路径图" style={{ marginBottom: 24 }}>
        <Image src={task?.pathImg} width={500} alt="路径图" />
      </Card>
      <Card title="分析结果">
        <Paragraph>{task?.analysis}</Paragraph>
      </Card>
    </div>
  );
};

export default PathAnalysis; 