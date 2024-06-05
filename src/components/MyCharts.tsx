import  { useEffect } from 'react';
import { Chart } from '@antv/g2';

import data from '../assets/Accumulated precipitation.json'


const MyCharts = () => {
  useEffect(() => {
    // const data = [
    //   { letter: 'A', frequency: 0.08167 },
    //   { letter: 'B', frequency: 0.01492 },
    //   { letter: 'C', frequency: 0.02782 },
    //   { letter: 'D', frequency: 0.04253 },
    // ];
    
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });
    
    chart
      .interval()
      .data(data)
      .encode('x', '测报站点')
      .encode('y', '05-20_05-27_降水累积量')
      .encode('color', '年')
      .transform({ type: 'dodgeX' })
      .interaction('elementHighlight', { background: true });
    
    chart.title({title:'部分县市不同年份05-20至05-27降水累积量',align:'center' });
    // 图例位置
    chart.legend('color', {
      /** 让图例在水平和垂直方向上保持居中 */
      layout: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }});
    chart.render();

  }, []);

  return (
    <div id="container"></div>
  );
};

export default MyCharts;
