import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter } from 'react-router-dom'; // 使用HashRouter

import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    borderRadius: 2,
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            <HashRouter> {/* 这里使用HashRouter */}
                <App />
            </HashRouter>
        </ConfigProvider>
    </React.StrictMode>
);