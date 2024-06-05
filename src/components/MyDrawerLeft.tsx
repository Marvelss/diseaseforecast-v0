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
    <div className={`sliding-div ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button" onClick={toggleDiv}>
        Toggle Div
      </button>
      This is a sliding div.
    </div>
  </div>
); 

}
  
export default MyDrawerLeft