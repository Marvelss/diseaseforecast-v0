import MyLayout from "./components/MyLayout"
import MyMap from "./components/MyMap"
import MyCharts from './components/MyCharts'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import React, { useState } from 'react';
import './App.css'; // 引入CSS文件
import { Chart } from '@antv/g2';
import data1 from '../assets/Accumulated precipitation.json'

function App() {

  return (
    
  //   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  //   <TileLayer
  //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   />
  //   {/* <Marker position={[51.505, -0.09]}>
  //     <Popup>
  //       A pretty CSS3 popup. <br /> Easily customizable.
  //     </Popup>
  //   </Marker> */}
  // </MapContainer>

  // 主页
   <MyLayout>
   </MyLayout>

  // 地图
  // <MyMap>
    
  // </MyMap>
// 统计图
//  <MyCharts>
//  </MyCharts>


  /* <h1>HelloWorld</h1> */

  //  <IndexPage>

  //  </IndexPage>
  
  )
}


export default App
