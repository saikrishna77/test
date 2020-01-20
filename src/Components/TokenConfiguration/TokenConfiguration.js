import { Menu, Card } from 'antd';
import React from 'react';
import TokenType from '../TokenType/TokenType';
import { Row, Icon } from 'antd';
import Vesting from '../Vesting/Vesting';

const TokenConfig = () => {
  const [current, setCurrent] = React.useState('tType');
  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const handleNextClick = next => {
    console.log('called');
    setCurrent(next);
  };
  return (
    <Card>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='tType' disabled={current !== 'tType'}>
          Token Type and Details &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='vesting' disabled={current !== 'vesting'}>
          Vesting Schedule & lock period &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='phase' disabled={current !== 'phase'}>
          Phase &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='dividend' disabled={current !== 'dividend'}>
          Dividend &nbsp;
          <Icon type='right' />
        </Menu.Item>
        <Menu.Item key='capTable' disabled={current !== 'capTable'}>
          Cap Table &nbsp;
        </Menu.Item>
      </Menu>
      {current === 'tType' ? (
        <Row justify='center' style={{ minHeight: '100vh', paddingTop: '2%' }}>
          <b>
            Define Your Token Type, Number Of Investors, Lock Period For
            Investors
          </b>
          <div style={{ paddingLeft: '20%', paddingTop: '3%' }}>
            <TokenType NextTab={handleNextClick} />
          </div>
        </Row>
      ) : current === 'vesting' ? (
        <Row justify='center' style={{ minHeight: '100vh', paddingTop: '2%' }}>
          <b>Vesting Schedule</b>
          <div style={{ marginTop: '1%' }}>
            <Vesting NextTab={handleNextClick} />
          </div>
        </Row>
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
