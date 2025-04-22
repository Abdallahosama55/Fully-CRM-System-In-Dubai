import React from 'react';
import { Button, Space } from 'antd';

const BottomNavigation = ({onSave,isLoading=""}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px',
      borderTop: '1px solid #f0f0f0',
      background: '#fff',
      marginTop:"24px"
    }}>
      <Space>
        <Button>Cancel</Button>
        <Button disabled>Previous</Button>
      </Space>
      <Button type="primary" loading={isLoading} onClick={onSave}>Save </Button>
    </div>
  );
};

export default BottomNavigation;
