
import { LineLayer, PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { useEffect } from 'react';
import data from '../assets/test.json';
import dataPoint from '../assets/test.json';

export default function IndexPage() {

  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'dark',
        pitch: 35.210526315789465,
        zoom: 4.4
      }),
    });

    const chinaPolygonLayer = new PolygonLayer({
      autoFit: true
    })
      .source(data)
      .color('name', [
        'rgb(239,243,255)',
        'rgb(189,215,231)',
        'rgb(107,174,214)',
        'rgb(49,130,189)',
        'rgb(8,81,156)'
      ]).shape("fill").style({
        opacity: 1
      })

    //  图层边界
    const layer2 = new LineLayer({
      zIndex: 2
    })
      .source(data)
      .color("rgb(93,112,146)")
      .size(0.6)
      .style({
        opacity: 1
      });
    scene.addLayer(chinaPolygonLayer)
    scene.addLayer(layer2);

    const labelLayer = new PointLayer({
      zIndex: 2
    })
      .source(dataPoint, {
        parser: {
          type: "json",
          coordinates: "center"
        }
      })
      .color("#fff")
      .shape("name", "text")
      .size(12)
      .style({
        opacity: 1,
        stroke: "#fff",
        strokeWidth: 0,
        padding: [5, 5],
        textAllowOverlap: false
      });

    scene.addLayer(labelLayer);

  }, [])

  return (
    <div className="map-china" style={{ margin: 20 }}>
      <div
        id='map'
        style={{ height: 500, width: 800, position: 'relative', justifyContent: 'center' }}
      >
      </div>
    </div>
  );
}

