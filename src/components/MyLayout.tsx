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
import {message,Space,Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import  logo  from '../assets/HDU_LOGO.png';
import { SettingFilled,PicRightOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LayerControl from './LayerControl';
import MyDrawerLeft from './MyDrawerLeft';
import MyDrawerRight from './MyDrawerRight'
import MyFloatButton from './MyFloatButton'

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
  getItem('气象情景模拟与模型评价', 'sub1', <UserOutlined />, [
    getItem('时空抽取', '3'),
    getItem('降水累积量计算', '4'),
  ]),
];

const rightMenuItems: MenuItem[] = [

  getItem('API接口服务', 'sub2', <TeamOutlined />, [
    getItem('Relief-F互相关性分析', '5'),
     getItem('t-检验', '6')]),
  getItem('产品应用服务', 'sub5', <FileOutlined />),
  getItem('产品交互分析', '7', <FileOutlined />),
  getItem('用户中心', 'sub3', <PicRightOutlined />, [
    getItem('地图发布', '8'),
    getItem('各环节方法API', '9'),
    getItem('预览图', '10'),
  ]),
];




const MyLayout= ({children}:any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{width:'100vw', height:'100vh', overflow: 'hidden'}} // 添加 overflow: 'hidden' 防止溢出
     id='components-layout-demo-custom-trigger'>

      <Layout style={{ height: '100vh' }}> {/* 设置内部布局高度为 100vh */}
        {/* 顶部 */}
        <Header style={{ padding: 0, background: '#001529', height: '59px', lineHeight: '59px', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            {/* 左侧菜单 */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={leftMenuItems} style={{ lineHeight: '59px', flex: 1 }} />
            {/* 标题 */}
            <div style={{ flex: 2, textAlign: 'center', color: '#fff', fontSize: '35px', fontWeight: 'bold' }}>
              多场景作物病虫害预测系统
            </div>
            {/* 右侧菜单 */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={rightMenuItems} style={{ lineHeight: '59px', flex: 1 }} />

            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e)=>e.preventDefault()} style={{float:'right',margin:'0 50px 0 50px'}}>
                <SettingFilled style={{ fontSize: '16px', color: '#fff' }} /> {/* 修改图标颜色为白色 */}
              </a>
            </Dropdown>
          </div>
        </Header>
        {/* 中部内容 */}
        <Content style={{ margin: 0, padding: 0, height: 'calc(100vh - 59px - 48px)' }}> {/* 计算内容区域高度 */}
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%'
            }}
          >
            {/* Bill is a cat. */}
            {children}
            <MapContainer center={[30.315284, 120.338]} zoom={17} scrollWheelZoom={false} style={{ height: '100%' }}> {/* 设置地图容器高度为 100% */}
              {/* ArcGIS/ESRI 全球影像 */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </MapContainer>
          </div>
          {/* 左边侧边栏 */}
          <MyDrawerLeft />
          {/* 右边侧边栏  */}
          <MyDrawerRight />
          <MyFloatButton />
        </Content>
        {/* <Footer style={{ textAlign: 'center', height: '28px', lineHeight: '48px' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MyLayout;