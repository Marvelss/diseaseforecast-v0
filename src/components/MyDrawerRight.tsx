import { useState } from "react";
import { Tabs, Select, Input, Button, Table } from 'antd';
import './MyDrawerRight.css'; 
import { message } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

// 模拟任务清单数据，与数据库表结构匹配
const initialTaskListData: { 
  modelId: number; 
  modelMethod: string; 
  modelMethodParam: string; 
  features: string; 
  label: string; 
  evaluationMetrics: string; 
  datasetSplitRatio: string; 
  modelStructure: string; 
  trainingResult: string; 
  createTime: string; 
  modelStatus: number; 
}[] = [
  {
    modelId: 1,
    modelMethod: 'SVM',
    modelMethodParam: 'kernel=rbf, C=1.0, gamma=0.1',
    features: 'FPAR1, LAI, 降水',
    label: '病害发生情况',
    evaluationMetrics: 'accuracy, recall',
    datasetSplitRatio: '7:2:1',
    modelStructure: '2 hidden layers with 10 neurons each',
    trainingResult: '',
    createTime: new Date().toISOString(),
    modelStatus: 1 // 1: Pending
  },
  {
    modelId: 2,
    modelMethod: 'Random Forest',
    modelMethodParam: 'n_estimators=100, max_depth=10',
    features: '温度1, 降水1, 降水2',
    label: '病害发生等级',
    evaluationMetrics: 'precision, f1-score',
    datasetSplitRatio: '8:1:1',
    modelStructure: 'N/A',
    trainingResult: 'Accuracy: 0.85',
    createTime: new Date().toISOString(),
    modelStatus: 2 // 2: Completed
  }
];

// 预处理方法列表
const preprocessingMethods = ['Normalization', 'Standardization', 'Log Transformation'];

function MyDrawerRight() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [taskListData, setTaskListData] = useState(initialTaskListData);
  // const [newTaskName, setNewTaskName] = useState('');

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  // const handleParam1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParam1(e.target.value);
  // };

  // const handleParam2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParam2(e.target.value);
  // };

  // const addTask = () => {
  //   if (newTaskName) {
  //     const newTask = {
  //       modelId: taskListData.length + 1,
  //       modelMethod: 'New Method',
  //       modelMethodParam: `${param1}, ${param2}`,
  //       features: 'default features',
  //       label: 'default label',
  //       evaluationMetrics: 'default metrics',
  //       datasetSplitRatio: '7:2:1',
  //       modelStructure: 'default structure',
  //       trainingResult: '',
  //       createTime: new Date().toISOString(),
  //       modelStatus: 1 // 1: Pending
  //     };
  //     setTaskListData([...taskListData, newTask]);
  //     setNewTaskName('');
  //   }
  // };

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
          modelId: taskListData.length + 1,
          modelMethod: selectedMethod,
          modelMethodParam: paramString,
          features: 'default features',
          label: 'default label',
          evaluationMetrics: 'default metrics',
          datasetSplitRatio: '7:2:1',
          modelStructure: 'default structure',
          trainingResult: '',
          createTime: new Date().toISOString(),
          modelStatus: 1 // 1: Pending
        };
        setTaskListData([...taskListData, newTask]);
        setSelectedMethod(null);
        setParam1('');
        setParam2('');
      }
    }
  };

  // 转换 modelStatus 为文字描述
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Completed';
      case 3:
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const columns = [
    {
      title: '模型ID',
      dataIndex: 'modelId',
      key: 'modelId',
    },
    {
      title: '模型方法',
      dataIndex: 'modelMethod',
      key: 'modelMethod',
    },
    {
      title: '模型参数',
      dataIndex: 'modelMethodParam',
      key: 'modelMethodParam',
    },
    {
      title: '特征',
      dataIndex: 'features',
      key: 'features',
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '评估指标',
      dataIndex: 'evaluationMetrics',
      key: 'evaluationMetrics',
    },
    {
      title: '数据集划分比例',
      dataIndex: 'datasetSplitRatio',
      key: 'datasetSplitRatio',
    },
    {
      title: '模型结构',
      dataIndex: 'modelStructure',
      key: 'modelStructure',
    },
    {
      title: '训练结果',
      dataIndex: 'trainingResult',
      key: 'trainingResult',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      key: 'modelStatus',
      // render: (_, record) => getStatusText(record.modelStatus)
    },
  ];

  // 定义执行任务的函数
  const executeTasks = async () => {
    try {
      // 假设使用第一个任务的信息作为统一的模型信息
      if (taskListData.length === 0) {
        console.warn('任务列表为空，无法执行任务');
        return;
      }
      const firstTask = taskListData[0];
      // 将 modelId 转换为字符串类型
      const modelIds = taskListData.map(task => task.modelId.toString()); 
      const modelParams: Record<string, string> = {};
      firstTask.modelMethodParam.split(', ').forEach(param => {
        const [key, value] = param.split('=');
        modelParams[key] = value;
      });
  
      const requestBody = {
        modelIds: modelIds,
        model: firstTask.modelMethod,
        modelParams: modelParams,
        features: firstTask.features.split(', '),
        label: firstTask.label,
        evaluationMetrics: firstTask.evaluationMetrics.split(', '),
        datasetSplitRatio: firstTask.datasetSplitRatio,
        modelStructure: firstTask.modelStructure,
        // trainingResult: firstTask.trainingResult,
        // createTime: firstTask.createTime,
        modelStatus: 1
      };
  
      const apiUrl = 'http://localhost:8092/model-building-dataset/model-train';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.text();
      console.log('执行任务成功:', data);
      // 弹出成功提示框
      message.success('模型训练任务已成功提交');
    } catch (error) {
      console.error('执行任务失败:', error);
      // 弹出失败提示框
      message.error('执行任务失败，请稍后重试');
    }
  };

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
            {/* 设置 scroll.x 让表格支持横向滚动 */}
            <Table 
              dataSource={taskListData} 
              columns={columns} 
              style={{ marginTop: 20 }}
              scroll={{ x: 1500 }} // 根据实际情况调整 x 的值
            />
            {/* 添加执行按钮 */}
            <Button className="execute-button" onClick={executeTasks}>
              执行任务
            </Button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  ); 
}
  
export default MyDrawerRight;