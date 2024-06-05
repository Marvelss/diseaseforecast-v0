import 'leaflet/dist/leaflet.css';
import { HeatmapLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
// import data from '../assets/SpatiotemporalExtractionResult.json';
import data from '../assets/DayOfYear_ActiveAccumulatedTemperature.json';

const MyMap= ({children}:any) => {

  const scene = new Scene({
    id: 'map',
    map: new GaodeMap({
      style: 'dark',
      token: '260b817b6d70ad050c0771e725c321a4',
      center: [120.347, 29.265],
      zoom: 5.5,
    }),
  });
  scene.on('loaded', () => {
    // fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
    // .then((res) => res.json())
    // .then((data) => {

    const layer = new HeatmapLayer({})
      .source(data)
      .shape('heatmap')
      .size('mag', [0, 1.0]) // weight映射通道
      .style({
        // intensity: 2, 针对时空抽取
        // radius: 18,
        intensity: 1,
        radius: 10,
        rampColors: {
          colors: [
            '#FF4818',
            '#F7B74A',
            '#FFF598',
            '#91EABC',
            '#2EA9A1',
            '#206C7C',
          ].reverse(),
          positions: [22, 42, 62, 85, 100,110],
        },
      });
    scene.addLayer(layer);
  // });
  });
  
  return (
    <div  id="map"/>
  );
};

export default MyMap;