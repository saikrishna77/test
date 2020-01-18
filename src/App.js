import React from 'react';
import './App.css';
import TokenConfig from './Components/TokenConfiguration/TokenConfiguration';
import { Row } from 'antd';

function App() {
  return (
    <div className='App'>
      <Row style={{ padding: '0 20% 0 20%' }}>
        <TokenConfig></TokenConfig>
      </Row>
    </div>
  );
}

export default App;
