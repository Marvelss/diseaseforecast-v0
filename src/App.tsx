import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 保持原有引用
import MyLayout from "./components/MyLayout";
import MyMap from "./components/MyMap";
import MyCharts from './components/MyCharts';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import './App.css'; // 引入CSS文件
import { Chart } from '@antv/g2';
import data1 from '../assets/Accumulated precipitation.json';

// 新增：用户中心页面
import UserCenter from './pages/UserCenter';

function App() {
    return (
        <Router>
            <Routes>
                {/* 主页 */}
                <Route path="/" element={<MyLayout />} />

                {/* 用户中心 */}
                <Route path="/usercenter" element={<UserCenter />} />

                {/* 默认 fallback */}
                <Route path="*" element={null} />
            </Routes>
        </Router>
    )
}

/*
 * 原有 JSX 已注释，仅供查看
 *
 * 使用方式：
 * - 如需恢复某部分功能，请将其放入路由或组件中
 */

// 原始 JSX 示例（仅供查看）
// return (
//   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={[51.505, -0.09]}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   </MapContainer>
// )

// 主页
// <MyLayout />

// 地图
// <MyMap />

// 统计图
// <MyCharts />

// HelloWorld
// <h1>HelloWorld</h1>

// 首页组件
// <IndexPage />
// </IndexPage>

export default App;
