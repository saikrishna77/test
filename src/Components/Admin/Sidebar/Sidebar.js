import { Layout, Menu, Icon, Typography } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/firebase';
const { SubMenu } = Menu;
const { Text } = Typography;

const { Header, Sider } = Layout;

const AdminSideBar = props => {
  const [defaultMenu, setDefaultMenu] = React.useState();

  React.useEffect(() => {
    if (window.location.pathname === '/admin/issuerSuperAdmins') {
      setDefaultMenu(['1']);
    } else if (window.location.pathname === '/admin/registrationRequests') {
      setDefaultMenu(['2']);
    }
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    props.history.push('/login');
  };

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
          selectedKeys={defaultMenu}
          // defaultSelectedKeys={defaultMenu}
        >
          <Menu.Item
            key='1'
            onClick={() => {
              setDefaultMenu(['1']);
              props.history.push('/admin/issuerSuperAdmins');
            }}
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
              onClick={() => {
                setDefaultMenu(['2']);
                props.history.push('/admin/registrationRequests');
              }}
            >
              Registration Requests
            </Menu.Item>
            <Menu.Item key='3'>Verification Requests</Menu.Item>
          </SubMenu>
          <Menu.Item
            key='4'
            onClick={() => {
              props.history.push('/issuer/issuerReg');
            }}
          ></Menu.Item>
          <Menu.Item
            key='5'
            style={{ position: 'absolute', marginTop: '86vh' }}
            onClick={logout}
          >
            <Icon type='logout' />
            <span className='nav-text'>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default withRouter(AdminSideBar);
