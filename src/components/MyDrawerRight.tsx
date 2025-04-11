import { useState } from "react";

import './MyDrawerRight.css'; // 引入CSS文件



function MyDrawerRight() {
// 定义一个状态来控制div的显示与隐藏
const [isVisible, setIsVisible] = useState(false);

// 点击按钮时切换状态
const toggleDiv = () => {
  setIsVisible(!isVisible);
};

return (
  <div className="App">
    <div className={`sliding-div ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button" onClick={toggleDiv}>
        打开右侧边栏
      </button>
      <h2><br/><br/>显示：任务清单|数据处理方法及其参数设置|结果概览</h2>

      
    </div>
  </div>
); 

}
  
export default MyDrawerRight