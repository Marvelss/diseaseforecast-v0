import MyLayout from "./components/MyLayout"
import IndexPage from "./components/map"
import { MapContainer, TileLayer, useMap } from 'react-leaflet';


function App() {
  return (
    
  //   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  //   <TileLayer
  //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   />
  //   {/* <Marker position={[51.505, -0.09]}>
  //     <Popup>
  //       A pretty CSS3 popup. <br /> Easily customizable.
  //     </Popup>
  //   </Marker> */}
  // </MapContainer>
  //  <MyLayout>
  //  {/* <h1>HelloWorld</h1> */}
  //  </MyLayout>
  //  <IndexPage>

  //  </IndexPage>
  
  import { Button, Drawer } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div style{{ position: relative, overflow: hidden;}}>
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default App;

  )
}

export default App
