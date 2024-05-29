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
import { Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import  logo  from '../assets/HDU_LOGO.png';
import { SettingFilled } from '@ant-design/icons';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const { Header, Content, Footer, Sider } = Layout;

//设置下拉框
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (<a>设置</a>),
    disabled: true,
  },
  {
    key: '2',
    label: (
      <a >退出</a>
    ),
  },
  {
  key: '3',
  label: (
    <a >图层编辑</a>
  ),
},
{
  key: '4',
  label: (
    <a >可视化编辑</a>
  ),
},
{
  key: '5',
  label: (
    <a >记录</a>
  ),
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

const menuItems: MenuItem[] = [
  getItem('主页', '0', <BorderInnerOutlined />),
  getItem('原始数据', '1', <PieChartOutlined />),
  getItem('数据预处理', '2', <DesktopOutlined />),
  getItem('特征计算', 'sub1', <UserOutlined />, [
    getItem('时空抽取', '3'),
    getItem('降水累积量计算', '4'),
  ]),
  getItem('特征优选', 'sub2', <TeamOutlined />, [
    getItem('Relief-F互相关性分析', '5'),
     getItem('t-检验', '6')]),
  getItem('模型构建', '7', <FileOutlined />),
];





const MyLayout= ({children}:any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{width:'100vw',height:'100vh'}}
     id='components-layout-demo-custom-trigger'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" ><img src={logo}/></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#001529',height: '49px',lineHeight:'46px' ,color: '#000' }} >
        <span className='titleDev'>多场景病虫害预测系统</span>

        <Dropdown menu={{ items }}>
        <a onClick={(e)=>e.preventDefault()} style={{float:'right',margin:'0 50px 0 0'}}>
        <SettingFilled style={{ fontSize: '16px', color: '#000' }} />
        </a>
        </Dropdown>
        </Header>

        <Content style={{ margin: '0 0px'}}>
          <Breadcrumb style={{ margin: '0px 0' }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              
            }}
          >
            {/* Bill is a cat. */}
            {children}
            <MapContainer center={[30.315284, 120.338]} zoom={17} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
</MapContainer>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;