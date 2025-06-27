import React, { useState } from 'react';
import { Select, Card, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

const tasks = [
  { label: '任务A', value: 'a', leftImg: '/src/assets/swipe_left.png', rightImg: '/src/assets/swipe_right.png', desc: '左图为2023年，右图为2024年，可通过滑块对比变化。' },
  { label: '任务B', value: 'b', leftImg: '/src/assets/swipe_left.png', rightImg: '/src/assets/swipe_right.png', desc: '左图为干旱前，右图为干旱后，变化明显。' },
];

const SwipeMap: React.FC = () => {
  const [selected, setSelected] = useState('a');
  const task = tasks.find(t => t.value === selected);
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <Title level={2}>卷帘看图</Title>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={selected}
          onChange={setSelected}
          options={tasks.map(t => ({ label: t.label, value: t.value }))}
          style={{ width: 240 }}
        />
      </div>
      <Card title="卷帘对比图" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={task?.leftImg} width={240} alt="左图" style={{ marginRight: 8 }} />
          <span style={{ fontSize: 32, color: '#aaa', margin: '0 8px' }}>|</span>
          <Image src={task?.rightImg} width={240} alt="右图" style={{ marginLeft: 8 }} />
        </div>
        <Paragraph style={{ marginTop: 16 }}>{task?.desc}（此处可实现滑动对比效果）</Paragraph>
      </Card>
    </div>
  );
};

export default SwipeMap; 