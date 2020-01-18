import { Menu } from 'antd';
import React from 'react';
import TokenType from '../TokenType/TokenType';
import { Row } from 'antd';

const TokenConfig = () => {
  const [current, setCurrent] = React.useState();
  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='tType'>Token Type and Details</Menu.Item>
        <Menu.Item key='vesting'>Vesting Schedule & lock period</Menu.Item>
        <Menu.Item key='phase'>Phase</Menu.Item>
        <Menu.Item key='dividend'>Dividend</Menu.Item>
        <Menu.Item key='capTable'>Cap Table</Menu.Item>
      </Menu>
      <Row type='flex' justify='center' style={{ minHeight: '100vh' }}>
        <TokenType />
      </Row>
    </>
  );
};

export default TokenConfig;
