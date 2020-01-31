import { Layout, Menu, Icon, Typography, Input } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
const { SubMenu } = Menu;
const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;
const AdminSideBar = props => {
  console.log(props);
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
        <Text
          style={{
            color: 'white',
            float: 'left',
            fontSize: '20px',
            marginLeft: '2%'
          }}
        >
          CCAP
        </Text>
        <Text
          style={{
            color: 'white',
            float: 'right',
            fontSize: '15px',
            textOverflow: 'ellipsis'
          }}
        >
          <Icon type='user' /> Hdsnc1234567fxcgfhgjhkj
        </Text>
      </Header>
      <Sider
        style={{ height: '100vh', position: 'fixed', width: '100px' }}
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
        <div>
          {' '}
          <Text style={{ color: 'white' }}>PLATFORM ISSUER ADMIN</Text>
        </div>
        <Menu
          style={{
            marginTop: '20%',
            display: 'flex',
            alignContent: 'start',
            flexDirection: 'column'
          }}
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
        >
          <Menu.Item
            key='1'
            onClick={() => props.history.push('/admin/issuerSuperAdmins')}
          >
            <Icon type='user' />
            <span className='profile'>Issuer Super Admins</span>
          </Menu.Item>{' '}
          <SubMenu
            key='sub1'
            title={
              <span>
                <Icon type='user' />
                <span>Approval Requests</span>
              </span>
            }
          >
            <Menu.Item
              key='2'
              onClick={() => props.history.push('/admin/registrationRequests')}
            >
              Registration Requests
            </Menu.Item>
            <Menu.Item key='3'>Verification Requests</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default withRouter(AdminSideBar);
