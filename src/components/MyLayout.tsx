import React, { useState, PropsWithChildren } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BorderInnerOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  message,
  Layout,
  Menu,
  theme,
  Steps,
  Dropdown,
} from 'antd';
import logo from '../assets/HDU_LOGO.png';
import { SettingFilled } from '@ant-design/icons';
import { MapContainer, TileLayer, LayersControl, Marker, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import LayerControl from './LayerControl';
import MyDrawerLeft from './MyDrawerLeft';
import MyDrawerRight from './MyDrawerRight';
import MyFloatButton from './MyFloatButton';
import './MyLayout.css';

const { Header, Content } = Layout;

type Coordinate = [number, number];

const center: Coordinate = [30.183594, 120.030156];
const range = 0.003;

const generateRandomPoints = (center: Coordinate, count: number, range: number) => {
  const points = [];
  for (let i = 1; i <= count; i++) {
    const lat = center[0] + (Math.random() * 1 - 1) * range;
    const lng = center[1] + (Math.random() * 2 - 1) * range;
    const severity = Math.floor(Math.random() * 5) + 1;
    points.push({
      id: i,
      position: [lat, lng] as Coordinate,
      severity,
      description: `虫害等级${severity}`,
    });
  }
  return points;
};

const pestPoints = generateRandomPoints(center, 50, range);

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const leftMenuItems: MenuItem[] = [
  getItem('主页', '0', <BorderInnerOutlined />),
  getItem('作物病虫害建模', '1', <PieChartOutlined />, [
    getItem('原始数据上传', 'data-upload'),
    getItem('数据预处理', 'data-preprocess'),
  ]),
  getItem('模型应用', '2', <DesktopOutlined />),
  getItem('气象情景模拟与模型评价', '3', <UserOutlined />),
];

const rightMenuItems: MenuItem[] = [
  getItem('API接口服务', 'sub2', <TeamOutlined />, [
    getItem('Relief-F互相关性分析', '5'),
    getItem('t-检验', '6'),
    getItem('特征优选数据集管理', 'feature-dataset'),
    getItem('特征优选文件上传', 'feature-upload'),
    getItem('Pearson相关性分析', 'pearson'),
    getItem('模型训练', 'model-train'),
    getItem('服务状态', 'service-status'),
    getItem('网关状态', 'gateway-status'),
  ]),
  getItem('产品应用服务', 'sub3', <TeamOutlined />, [
    getItem('专题图制作', '7'),
    getItem('地图发布', '8'),
    getItem('数据下载中心', '9'),
    getItem('建模报告', '10'),
  ]),
  getItem('产品交互分析', 'sub4', <FileOutlined />, [
    getItem('热力图分析', '11'),
    getItem('病害发生路径分析', '12'),
    getItem('卷帘看图', '13'),
  ]),
  getItem('用户中心', '14', <PicRightOutlined />),
];

const items: MenuProps['items'] = [
  { label: '设置', key: '1' },
  { label: '退出', key: '2' },
  { label: '图层编辑', key: '3' },
  { label: '可视化编辑', key: '4' },
  { label: '记录', key: '5' },
];

const MyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const {
    token,
  } = theme.useToken();

  const steps = [
    { title: '原始建模数据上传', description: '进入系统主页' },
    { title: '预处理', description: '进行作物病虫害建模' },
    { title: '特征计算', description: '应用已建立的模型1' },
    { title: '特征优选', description: '应用已建立的模型2' },
    { title: '模型构建', description: '应用已建立的模型3' },
  ];

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
    if (key === '1') {
      navigate('/cropmodeling');
      setShowSteps(false);
      return;
    }
    if (key === '0') {
      navigate('/');
      setShowSteps(false);
      return;
    }
    if (key === '5') {
      navigate('/apirelieff');
      return;
    }
    if (key === '6') {
      navigate('/apitest');
      return;
    }
    setShowSteps(false);
    if (key === '14') {
      navigate('/usercenter');
    }
    if (key === '10') {
      navigate('/modelreport');
      return;
    }
    if (key === '11') {
      navigate('/heatmapanalysis');
      return;
    }
    if (key === '12') {
      navigate('/pathanalysis');
      return;
    }
    if (key === '13') {
      navigate('/swipemap');
      return;
    }
    if (key === 'feature-dataset') {
      navigate('/feature-dataset');
      return;
    }
    if (key === 'feature-upload') {
      navigate('/feature-upload');
      return;
    }
    if (key === 'pearson') {
      navigate('/pearson');
      return;
    }
    if (key === 'model-train') {
      navigate('/model-train');
      return;
    }
    if (key === 'service-status') {
      navigate('/service-status');
      return;
    }
    if (key === 'gateway-status') {
      navigate('/gateway-status');
      return;
    }
    if (key === 'data-upload') {
      navigate('/data-upload');
      setShowSteps(false);
      return;
    }
    if (key === 'data-preprocess') {
      navigate('/data-preprocess');
      setShowSteps(false);
      return;
    }
  };

  return (
      <Layout style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} id="components-layout-demo-custom-trigger">
        <Layout style={{ height: '100vh' }}>
          {!showSteps ? (
              <Header style={{
                padding: 0,
                background: '#001529',
                height: '59px',
                lineHeight: '59px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={leftMenuItems}
                    style={{
                      lineHeight: '59px',
                      width: '30%',
                      minWidth: '300px',
                      borderRight: '1px solid #063158'
                    }}
                    onClick={onClick}
                />

                <div style={{
                  flex: 1,
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '27px',
                  fontWeight: 'bold',
                  padding: '0 20px'
                }}>
                  多场景作物病虫害预测系统
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['sub2']}
                    items={rightMenuItems}
                    style={{
                      lineHeight: '59px',
                      width: '30%',
                      minWidth: '300px',
                      borderLeft: '1px solid #063158'
                    }}
                    onClick={onClick}
                />

                <Dropdown menu={{ items, onClick }}>
                  <a onClick={(e) => e.preventDefault()} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    height: '100%',
                    color: '#fff'
                  }}>
                    <SettingFilled style={{ fontSize: '16px' }} />
                  </a>
                </Dropdown>
              </Header>
          ) : (
              <div style={{ background: 'rgba(0, 21, 41, 0.9)', padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
                <Steps current={1} items={steps} style={{ color: '#fff', width: '80%' }} className="custom-steps" />
              </div>
          )}

          <Content style={{ margin: 0, padding: 0, height: 'calc(100vh - 59px)' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
  );
};

export default MyLayout;

// 必须放在文件底部
import { useNavigate } from 'react-router-dom';
