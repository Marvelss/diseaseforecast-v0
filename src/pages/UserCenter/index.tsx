// src/pages/UserCenter/index.tsx
import 'leaflet/dist/leaflet.css';
import React from 'react';
import './index.css';

const UserCenter: React.FC = () => {
    const user = {
        username: 'admin',
        email: 'admin@example.com',
        role: '管理员',
        lastLogin: '2025-04-05 10:30:00',
    };

    return (
        <div className="user-center-container">
            <h2>用户中心</h2>
            <div className="user-card">
                <h3>个人账户信息</h3>
                <div className="user-info">
                    <p><strong>用户名：</strong>{user.username}</p>
                    <p><strong>邮箱：</strong>{user.email}</p>
                    <p><strong>角色：</strong>{user.role}</p>
                    <p><strong>最近登录时间：</strong>{user.lastLogin}</p>
                </div>
            </div>
        </div>
    );
};

export default UserCenter;
