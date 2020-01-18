import { Menu, Card } from 'antd';
import React from 'react';
import TokenType from '../TokenType/TokenType';
import { Row } from 'antd';

const TokenConfig = () => {
  const [current, setCurrent] = React.useState('tType');
  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <Card>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='tType'>Token Type and Details</Menu.Item>
        <Menu.Item key='vesting'>Vesting Schedule & lock period</Menu.Item>
        <Menu.Item key='phase'>Phase</Menu.Item>
        <Menu.Item key='dividend'>Dividend</Menu.Item>
        <Menu.Item key='capTable'>Cap Table</Menu.Item>
      </Menu>
      {current === 'tType' ? (
        <Row type='flex' justify='center' style={{ minHeight: '100vh', paddingTop: '7%' }}>
          <TokenType />
        </Row>
      ) : current === 'vesting' ? (
        <div>Vesting yet to be built</div>
      ) : current === 'phase' ? (
        <div>Phase yet to be built</div>
      ) : current === 'dividend' ? (
        <div>Dividend Yet to be built</div>
      ) : current === 'capTable' ? (
        <div>Cap table yet to be built</div>
      ) : null}
    </Card>
  );
};

export default TokenConfig;
