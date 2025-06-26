import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MyLayout from './components/MyLayout';
import MyMap from './components/MyMap';
import UserCenter from './pages/UserCenter';
import './App.css';

function App() {
    return (
        <Routes>
            {/* 主布局路由 */}
            <Route
                path="/"
                element={
                    <MyLayout>
                        {/* 添加路由出口 */}
                        <Outlet />
                    </MyLayout>
                }
            >
                {/* 默认主页 - 显示地图 */}
                <Route index element={<MyMap />} />

                {/* 用户中心页面 */}
                <Route path="usercenter" element={<UserCenter />} />
            </Route>

            {/* 404处理 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
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
