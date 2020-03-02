import { Spin } from 'antd';
import React from 'react';

export default function Loader() {
  return (
    <div >
      <Spin size='large' style={{ width: '60px', height: '70px' }} />
    </div>
  );
}
