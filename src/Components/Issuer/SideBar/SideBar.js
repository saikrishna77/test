import { Layout, Menu, Icon, Typography } from 'antd';
import React from 'react';
import firebase from '../../../utils/firebase';
import { withRouter } from 'react-router-dom';
const { Text } = Typography;

const { Header, Sider } = Layout;

const UserSideBar = props => {
  const [defaultMenu, setDefaultMenu] = React.useState();

  React.useEffect(() => {
    if (window.location.pathname === '/issuer/tokens') {
      setDefaultMenu(['1']);
    } else {
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
          <Icon type='user' /> {localStorage.getItem('email')}
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
            flexDirection: 'column',
            textAlign: 'left'
          }}
          theme='dark'
          mode='inline'
          selectedKeys={defaultMenu}
        >
          <Menu.Item
            key='1'
            onClick={() => {
              setDefaultMenu(['1']);
              props.history.push('/issuer/tokens');
            }}
          >
            <Icon type='setting' />
            <span className='nav-text'>Tokens</span>
          </Menu.Item>
          <Menu.Item
            key='2'
            onClick={() => {
              setDefaultMenu(['2']);
              props.history.push('/issuer/tokenCreation/reserve');
            }}
          >
            <Icon type='setting' />
            <span className='nav-text'>Token Creation</span>
          </Menu.Item>
          <Menu.Item
            key='3'
            onClick={() => {
              setDefaultMenu(['3']);
              props.history.push('/issuer/issuerReg');
            }}
          >
            <Icon type='user' />
            <span className='nav-text'>Issuer Registration</span>
          </Menu.Item>
          <Menu.Item
            key='3'
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
export default withRouter(UserSideBar);
