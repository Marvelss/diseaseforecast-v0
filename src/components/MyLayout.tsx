import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {message,Space,Breadcrumb, Dropdown, Layout, Menu, theme, Steps } from 'antd'; 
import  logo  from '../assets/HDU_LOGO.png';
import { SettingFilled,PicRightOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LayerControl from './LayerControl';
import MyDrawerLeft from './MyDrawerLeft';
import MyDrawerRight from './MyDrawerRight'
import MyFloatButton from './MyFloatButton'
// 引入 CSS 文件
import './MyLayout.css'; 

const { Header, Content, Footer, Sider } = Layout;


const onClick: MenuProps['onClick'] = ({ key }) => {

  message.info(`Click on item ${key}`);
};
// //设置下拉框
const items: MenuProps['items'] = [
  {
    label: '设置',
    key: '1',
  },
  {
    label: '退出',
    key: '2',
  },
  {
    label: '图层编辑',
    key: '3',
  },
  {
    label:'可视化编辑',
    key: '4'
  },
  {
    label:'记录',
    key: '5'
  },
];


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
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
  getItem('作物病虫害建模', '1', <PieChartOutlined />),
  getItem('模型应用', '2', <DesktopOutlined />),
  getItem('气象情景模拟与模型评价', '3', <UserOutlined />),
];

const rightMenuItems: MenuItem[] = [

  getItem('API接口服务', 'sub2', <TeamOutlined />, [
    getItem('Relief-F互相关性分析', '5'),
     getItem('t-检验', '6')]),
  getItem('产品应用服务', 'sub3', <TeamOutlined />, [
    getItem('专题图制作', '7'),
    getItem('地图发布', '8'),
    getItem('数据下载中心', '9'),
    getItem('建模报告', '10'),
  ]),
  getItem('产品交互分析', 'sub4', <FileOutlined />, [
    getItem('热力图分析', '11'),
    getItem('病害发生路径分析', '12'),
    getItem('卷帘看图', '13')]),
  getItem('用户中心', '14', <PicRightOutlined />)
];




const MyLayout= ({children}:any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSteps, setShowSteps] = useState(false); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const steps = [
    {
      title: '原始建模数据上传',
      description: '进入系统主页',
    },
    {
      title: '预处理',
      description: '进行作物病虫害建模',
    },
    {
      title: '特征计算',
      description: '应用已建立的模型1',
    },
    {
      title: '特征优选',
      description: '应用已建立的模型2',
    },
    {
      title: '模型构建',
      description: '应用已建立的模型3',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
    if (key === '1') { 
      setShowSteps(true);
    } else {
      setShowSteps(false);
    }
  };

  return (
    <Layout style={{width:'100vw', height:'100vh', overflow: 'hidden'}} 
     id='components-layout-demo-custom-trigger'>

      <Layout style={{ height: '100vh' }}> 
        {/* 根据 showSteps 状态控制 Header 和步骤条的显示 */}
        {!showSteps ? (
          <Header style={{ padding: 0, background: '#001529', height: '59px', lineHeight: '59px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={leftMenuItems} style={{ lineHeight: '59px', flex: 1 }} onClick={onClick} />
              <div style={{ flex: 2, textAlign: 'center', color: '#fff', fontSize: '27px', fontWeight: 'bold' }}>
                多场景作物病虫害预测系统
              </div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={rightMenuItems} style={{ lineHeight: '59px', flex: 1 }} />
              <Dropdown menu={{ items, onClick }}>
                <a onClick={(e)=>e.preventDefault()} style={{float:'right',margin:'0 50px 0 50px'}}>
                  <SettingFilled style={{ fontSize: '16px', color: '#fff' }} /> 
                </a>
              </Dropdown>
            </div>
          </Header>
        ) : (
          <div 
            style={{ 
              background: 'rgba(0, 21, 41, 0.9)', 
              padding: '10px 0', 
              display: 'flex', 
              justifyContent: 'center' 
            }}
          >
            <Steps 
              current={1} 
              items={steps} 
              style={{ 
                color: '#fff', 
                width: '80%' 
              }}
              // 自定义步骤条的样式类
              className="custom-steps" 
            />
          </div>
        )}
        {/* 中部内容 */}
        <Content style={{ margin: 0, padding: 0, height: 'calc(100vh - 59px - 48px)' }}> 
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%'
            }}
          >
            {children}
            <MapContainer center={[30.177794, 120.031156]} zoom={17} scrollWheelZoom={false} style={{ height: '100%' }}> 
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </MapContainer>
          </div>
          <MyDrawerLeft />
          <MyDrawerRight />
          <MyFloatButton />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;