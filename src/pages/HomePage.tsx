import React from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, CircleMarker, Popup } from 'react-leaflet';
import MyDrawerLeft from '../components/MyDrawerLeft';
import MyDrawerRight from '../components/MyDrawerRight';
import MyFloatButton from '../components/MyFloatButton';
import type { LatLngTuple } from 'leaflet';

const center: LatLngTuple = [30.183594, 120.030156];
const range = 0.003;
const generateRandomPoints = (center: LatLngTuple, count: number, range: number) => {
  const points: { id: number; position: LatLngTuple; severity: number; description: string }[] = [];
  for (let i = 1; i <= count; i++) {
    const lat = center[0] + (Math.random() * 1 - 1) * range;
    const lng = center[1] + (Math.random() * 2 - 1) * range;
    const severity = Math.floor(Math.random() * 5) + 1;
    points.push({
      id: i,
      position: [lat, lng] as LatLngTuple,
      severity,
      description: `虫害等级${severity}`,
    });
  }
  return points;
};
const pestPoints = generateRandomPoints(center, 50, range);

const HomePage: React.FC = () => (
  <div
    style={{
      padding: 0,
      minHeight: 360,
      background: '#f5f5f5',
      borderRadius: 8,
      height: '100%',
      position: 'relative',
    }}
  >
    <MapContainer center={[30.181594, 120.031156]} zoom={17} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Esri 卫星图">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="MODIS Land Cover">
          <TileLayer
            url="https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_NDVI/default/2023-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png"
            attribution="NASA GIBS"
            opacity={0.6}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="病虫害监测点">
          {pestPoints.map(({ id, position, severity, description }) => (
            <React.Fragment key={id}>
              <Marker position={position}>
                <Popup>{description}</Popup>
              </Marker>
              <CircleMarker
                center={position}
                radius={severity * 4}
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.5 }}
              />
            </React.Fragment>
          ))}
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
    <MyDrawerLeft />
    <MyDrawerRight />
    <MyFloatButton />
  </div>
);

export default HomePage; 