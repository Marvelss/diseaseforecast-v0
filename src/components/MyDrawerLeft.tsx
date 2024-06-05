import { useState } from "react";

import './MyDrawerLeft.css'; // 引入CSS文件



function MyDrawerLeft() {
// 定义一个状态来控制div的显示与隐藏
const [isVisible, setIsVisible] = useState(false);

// 点击按钮时切换状态
const toggleDiv = () => {
  setIsVisible(!isVisible);
};


return (
  <div className="MyDrawerLeftDiv">
    <div className={`sliding-div-left ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button-left" onClick={toggleDiv}>
        打开左边侧边栏
      </button>
      <h2><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>显示各环节数据处理或模型参数</h2>
    </div>
  </div>
); 

}
  
export default MyDrawerLeft