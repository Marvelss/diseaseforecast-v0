import React, { useState } from 'react';
import { Button, Upload, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from '../api';

const { Paragraph } = Typography;

const FeatureOptimizationUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return message.warning('请先选择文件');
    setUploading(true);
    try {
      const res = await uploadFile('/feature-optimization-dataset/upload', file);
      setUploadResult(res.data || '上传成功');
      message.success('上传成功');
    } catch (e: any) {
      message.error('上传失败: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <h2>特征优选数据文件上传</h2>
      <Upload
        beforeUpload={file => { setFile(file); return false; }}
        showUploadList={!!file}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      {file && <div style={{ marginTop: 8 }}>已选择文件：{file.name}</div>}
      <Button type="primary" onClick={handleUpload} loading={uploading} style={{ marginTop: 16 }}>上传</Button>
      {uploadResult && (
        <Paragraph copyable style={{ marginTop: 24 }}>
          上传结果：{uploadResult}
        </Paragraph>
      )}
    </div>
  );
};

export default FeatureOptimizationUpload; 