import React, { useState } from 'react';
import { Upload, Button, Radio, message, Alert, Typography } from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { apiRequest, uploadFile } from '../api';

const { Title } = Typography;

const methodOptions = [
  { label: '植被指数计算', value: 'ndvi' },
  { label: '空间点提取', value: 'spatial' },
];

const CropModeling: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('ndvi');
  // 文件状态
  const [ndviFile, setNdviFile] = useState<any[]>([]);
  const [spatialFiles, setSpatialFiles] = useState<{
    peak: any[];
    rain: any[];
    grow: any[];
    temp: any[];
    coord: any[];
  }>({
    peak: [],
    rain: [],
    grow: [],
    temp: [],
    coord: [],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  // 上传控件change
  const handleFileChange = (key: string, { fileList }: any) => {
    if (key === 'ndvi') setNdviFile(fileList.slice(-1));
    else setSpatialFiles(prev => ({ ...prev, [key]: fileList }));
  };

  // 提交
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (selectedMethod === 'ndvi') {
        if (ndviFile.length !== 1) {
          message.error('请上传一个.tif文件');
          setLoading(false);
          return;
        }
        // 假设后端支持单文件上传接口
        const res = await uploadFile('/api/feature-calc/ndvi', ndviFile[0].originFileObj);
        if (!res || typeof res !== 'object') {
          message.error('后端未返回有效JSON，请联系后端开发检查接口返回。');
          setLoading(false);
          return;
        }
        setResult(res.data || '计算成功');
      } else {
        // 校验必需项
        if (
          spatialFiles.peak.length !== 1 ||
          spatialFiles.rain.length < 1 ||
          spatialFiles.grow.length < 1 ||
          spatialFiles.temp.length < 1 ||
          spatialFiles.coord.length !== 1
        ) {
          message.error('请上传所有必需文件（峰值1、降水、温度、生育期、经纬度各1）');
          setLoading(false);
          return;
        }
        // 构造FormData
        const formData = new FormData();
        formData.append('peak', spatialFiles.peak[0].originFileObj);
        spatialFiles.rain.forEach((f: any) => formData.append('rain', f.originFileObj));
        spatialFiles.grow.forEach((f: any) => formData.append('grow', f.originFileObj));
        spatialFiles.temp.forEach((f: any) => formData.append('temp', f.originFileObj));
        formData.append('coord', spatialFiles.coord[0].originFileObj);
        // 假设后端支持多文件上传接口
        const res = await fetch('/api/feature-calc/spatial', {
          method: 'POST',
          body: formData,
        });
        let data = null;
        try {
          // 检查响应类型和内容
          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('application/json')) {
            data = await res.json();
          }
        } catch {}
        if (!data) {
          message.error('后端未返回有效JSON，请联系后端开发检查接口返回。');
          setLoading(false);
          return;
        }
        setResult(data.data || '计算成功');
      }
    } catch (e: any) {
      message.error('计算失败: ' + (e.message || e.toString()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto', textAlign: 'left', height: '80vh', overflowY: 'auto', background: '#fff', borderRadius: 8 }}>
      <Title level={3}>特征计算</Title>
      <Radio.Group
        options={methodOptions}
        value={selectedMethod}
        onChange={e => setSelectedMethod(e.target.value)}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: 24 }}
      />
      {selectedMethod === 'ndvi' && (
        <div style={{ marginBottom: 32 }}>
          <Alert
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            message={<b>方法介绍</b>}
            description={<div>上传一个遥感影像.tif文件，自动计算植被指数（如NDVI）。</div>}
            style={{ marginBottom: 16 }}
          />
          <Upload
            fileList={ndviFile}
            onChange={info => handleFileChange('ndvi', info)}
            beforeUpload={() => false}
            accept=".tif"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>上传.tif文件</Button>
          </Upload>
        </div>
      )}
      {selectedMethod === 'spatial' && (
        <div style={{ marginBottom: 32 }}>
          <Alert
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            message={<b>方法介绍</b>}
            description={<div>上传空间点提取所需的所有数据文件。</div>}
            style={{ marginBottom: 16 }}
          />
          <div style={{ marginBottom: 12 }}>
            峰值：<Upload fileList={spatialFiles.peak} onChange={info => handleFileChange('peak', info)} beforeUpload={() => false} accept=".tif" maxCount={1}><Button icon={<UploadOutlined />}>上传峰值.tif</Button></Upload>
          </div>
          <div style={{ marginBottom: 12 }}>
            降水：<Upload fileList={spatialFiles.rain} onChange={info => handleFileChange('rain', info)} beforeUpload={() => false} accept=".tif" multiple><Button icon={<UploadOutlined />}>上传降水.tif(可多选)</Button></Upload>
          </div>
          <div style={{ marginBottom: 12 }}>
            生育期：<Upload fileList={spatialFiles.grow} onChange={info => handleFileChange('grow', info)} beforeUpload={() => false} accept=".tif" multiple><Button icon={<UploadOutlined />}>上传生育期.tif(可多选)</Button></Upload>
          </div>
          <div style={{ marginBottom: 12 }}>
            温度：<Upload fileList={spatialFiles.temp} onChange={info => handleFileChange('temp', info)} beforeUpload={() => false} accept=".tif" multiple><Button icon={<UploadOutlined />}>上传温度.tif(可多选)</Button></Upload>
          </div>
          <div style={{ marginBottom: 12 }}>
            经纬度：<Upload fileList={spatialFiles.coord} onChange={info => handleFileChange('coord', info)} beforeUpload={() => false} accept=".xlsx" maxCount={1}><Button icon={<UploadOutlined />}>上传经纬度.xlsx</Button></Upload>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Button type="primary" loading={loading} onClick={handleSubmit}>提交特征计算任务</Button>
      </div>
      {result && (
        <Alert type="success" showIcon style={{ marginTop: 32 }} message={<span>计算结果：{result}</span>} />
      )}
    </div>
  );
};

export default CropModeling; 