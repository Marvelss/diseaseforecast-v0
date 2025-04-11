import { useState } from "react";
import { Tabs, Select, Input, Button, Table } from 'antd';
import './MyDrawerRight.css'; 

const { TabPane } = Tabs;
const { Option } = Select;

// 模拟任务清单数据
const initialTaskListData: { id: number; name: string; status: string }[] = [
  { id: 1, name: 'Task 1', status: 'In Progress' },
  { id: 2, name: 'Task 2', status: 'Completed' },
  { id: 3, name: 'Task 3', status: 'Pending' },
];

// 预处理方法列表
const preprocessingMethods = ['Normalization', 'Standardization', 'Log Transformation'];

function MyDrawerRight() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [taskListData, setTaskListData] = useState(initialTaskListData);
  const [newTaskName, setNewTaskName] = useState('');

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const handleParam1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam1(e.target.value);
  };

  const handleParam2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam2(e.target.value);
  };

  const addTask = () => {
    if (newTaskName) {
      const newTask = {
        id: taskListData.length + 1,
        name: newTaskName,
        status: 'Pending'
      };
      setTaskListData([...taskListData, newTask]);
      setNewTaskName('');
    }
  };

  const methodParamsMap: {
    [key: string]: { label: string; placeholder: string; stateKey: string }[];
  } = {
    Normalization: [
      { label: '最小值', placeholder: '请输入最小值', stateKey: 'param1' },
      { label: '最大值', placeholder: '请输入最大值', stateKey: 'param2' },
    ],
    Standardization: [
      { label: '均值', placeholder: '请输入均值', stateKey: 'param1' },
      { label: '标准差', placeholder: '请输入标准差', stateKey: 'param2' },
    ],
    'Log Transformation': [
      { label: '基数', placeholder: '请输入对数基数', stateKey: 'param1' },
    ],
  };
  

  const addTaskFromSettings = () => {
    if (selectedMethod) {
      const requiredParams = methodParamsMap[selectedMethod].map((p) =>
        p.stateKey === 'param1' ? param1 : param2
      );
  
      const hasEmpty = requiredParams.some((p) => !p.trim());
  
      if (!hasEmpty) {
        const paramString = requiredParams.join(', ');
        const newTask = {
          id: taskListData.length + 1,
          name: `Task with ${selectedMethod} (${paramString})`,
          status: 'Pending',
        };
        setTaskListData([...taskListData, newTask]);
        setSelectedMethod(null);
        setParam1('');
        setParam2('');
      }
    }
  };
  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="App">
      <div className={`sliding-div ${isVisible ? 'visible' : ''}`}>
        <button className="toggle-button" onClick={toggleDiv}>
          打开右侧边栏
        </button>
        <Tabs defaultActiveKey="1">
          <TabPane tab="处理方法及参数设置" key="1">
          <div className="setting-group">
          <span>预处理方法: </span>
          <Select
            value={selectedMethod}
            onChange={handleMethodChange}
            style={{ width: 200 }}
            placeholder="请选择方法"
          >
            {preprocessingMethods.map((method) => (
              <Option key={method} value={method}>
                {method}
              </Option>
            ))}
          </Select>
        </div>

        {/* 根据选择的预处理方法动态展示对应参数 */}
        {selectedMethod && (
          <>
            {methodParamsMap[selectedMethod].map((paramConfig, index) => (
              <div className="setting-group" key={index} style={{ marginTop: 10 }}>
                <label style={{ marginRight: 8, color: '#ecf0f1' }}>
                  {paramConfig.label}:
                </label>
                <Input
                  value={paramConfig.stateKey === 'param1' ? param1 : param2}
                  placeholder={paramConfig.placeholder}
                  style={{ width: 180 }}
                  onChange={(e) =>
                    paramConfig.stateKey === 'param1'
                      ? setParam1(e.target.value)
                      : setParam2(e.target.value)
                  }
                />
              </div>
            ))}
          </>
        )}

        <Button className="add-task-button" onClick={addTaskFromSettings}>
          添加任务
        </Button>
          </TabPane>
          <TabPane tab="任务清单" key="2">
            <Table dataSource={taskListData} columns={columns} style={{ marginTop: 20 }} />
          </TabPane>
          <TabPane tab="结果预览" key="3">
            <div>
              <span>结果概述: 这是结果的概述。</span>
            </div>
            <div>
              <span>详细结果: 这些是详细的结果...</span>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  ); 
}
  
export default MyDrawerRight;