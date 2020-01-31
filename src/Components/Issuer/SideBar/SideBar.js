import { Layout, Menu, Icon, Typography, Input } from 'antd';
import React from 'react';
const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;
const UserSideBar = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          backgroundColor: '#062143'
        }}
      >
        <div className='logo' />
        <Text style={{ color: 'white', float: 'left', fontSize: '20px',marginLeft:'2%' }}>
          CCAP
        </Text>
        <Text style={{ color: 'white', float: 'right', fontSize: '15px' ,textOverflow:'ellipsis'}}>
         <Icon type="user"/> Hdsnc1234567fxcgfhgjhkj 
        </Text>
      </Header>
      <Sider
        style={{ height: '100vh', position: 'fixed', width: 256 }}
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className='logo' />
        <Menu
          style={{
            marginTop: '30%',
            display: 'flex',
            alignContent: 'start',
            flexDirection: 'column'
          }}
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key='1'>
            <Icon type='user' />
            <span className='nav-text'>DashBoard</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='setting' />
            <span className='nav-text'>Token Creation</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default UserSideBar;
