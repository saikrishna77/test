import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        // inlineCollapsed={true}
        mode='inline'
      >
        <Menu.Item key='sub2'>
          <Icon type='appstore' />
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type='setting'/>
          <span>Token Creation</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
