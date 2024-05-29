import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
// import 'antd/dist/antd.compact.css'
import zhCN from 'antd/lib/locale/zh_CN'
import { HashRouter as Router } from 'react-router-dom'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
  <ConfigProvider locale={zhCN}
      theme={{
        token: {
          // Seed Token，影响范围大
          // colorPrimary: '#00b96b',
          borderRadius: 2,
  
          // 派生变量，影响范围小
          colorBgContainer: '#f6ffed',
        },
      }}
  >
    <App />
  </ConfigProvider>
  </Router>

)
