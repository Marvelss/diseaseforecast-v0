import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MyLayout from './components/MyLayout';
import MyMap from './components/MyMap';
import UserCenter from './pages/UserCenter';
import ApiReliefF from './pages/ApiReliefF';
import ApiTTest from './pages/ApiTTest';
import HomePage from './pages/HomePage';
import CropModeling from './pages/CropModeling';
import ModelReport from './pages/ModelReport';
import HeatmapAnalysis from './pages/HeatmapAnalysis';
import PathAnalysis from './pages/PathAnalysis';
import SwipeMap from './pages/SwipeMap';
import FeatureOptimizationDataSetPage from './pages/FeatureOptimizationDataSetPage';
import FeatureOptimizationUpload from './pages/FeatureOptimizationUpload';
import ApiPearson from './pages/ApiPearson';
import ModelTrainPage from './pages/ModelTrainPage';
import ServiceStatusPage from './pages/ServiceStatusPage';
import GatewayStatusPage from './pages/GatewayStatusPage';
import DataUpload from './pages/DataUpload';
import DataPreprocess from './pages/DataPreprocess';
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
                <Route index element={<HomePage />} />

                {/* 用户中心页面 */}
                <Route path="usercenter" element={<UserCenter />} />
                {/* API接口服务子页面 */}
                <Route path="apirelieff" element={<ApiReliefF />} />
                <Route path="apitest" element={<ApiTTest />} />
                {/* 作物病虫害建模页面 */}
                <Route path="cropmodeling" element={<CropModeling />} />
                {/* 建模报告页面 */}
                <Route path="modelreport" element={<ModelReport />} />
                {/* 产品交互分析子页面 */}
                <Route path="heatmapanalysis" element={<HeatmapAnalysis />} />
                <Route path="pathanalysis" element={<PathAnalysis />} />
                <Route path="swipemap" element={<SwipeMap />} />
                <Route path="feature-dataset" element={<FeatureOptimizationDataSetPage />} />
                <Route path="feature-upload" element={<FeatureOptimizationUpload />} />
                <Route path="pearson" element={<ApiPearson />} />
                <Route path="model-train" element={<ModelTrainPage />} />
                <Route path="service-status" element={<ServiceStatusPage />} />
                <Route path="gateway-status" element={<GatewayStatusPage />} />
                <Route path="data-upload" element={<DataUpload />} />
                <Route path="data-preprocess" element={<DataPreprocess />} />
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
