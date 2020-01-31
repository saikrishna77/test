import React from 'react';
import './App.css';
import TokenConfig from './Components/Issuer/TokenCreationSteps/TokenConfiguration/TokenConfiguration';
import { Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import RegisterForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';
import ReserveToken from './Components/Issuer/TokenCreationSteps/ReserveToken/ReserveToken';
import TokenCreationSteps from './Components/Issuer/TokenCreationSteps/TokenCreationSteps';
// import UserSideBar from './Components/SideBar/SideBar';
import IssuerSuperAdmins from './Components/Admin/IssuerSuperAdmins/IssuerSuperAdmins';
import RegistrationRequest from './Components/Admin/RegistrationRequests/RegistrationRequests';
import Firebase, { FirebaseContext, withFirebase } from './utils/Firebase';
import SideBar from './Components/Admin/Sidebar/Sidebar';
import IssuerSideBar from './Components/Issuer/SideBar/SideBar';

function App() {
  const RegisterFormComp = () => {
    return (
      <div>
        <RegisterForm />
      </div>
    );
  };
  return (
    <div className='App'>
      {/* <div style={{ position: 'absolute', height: '100vh' }}>
        <SideBar />
      </div> */}
      <FirebaseContext.Provider value={new Firebase()}>
        <Switch>
          <Route exact path='/register' component={RegisterFormComp}></Route>
          <Route exact path='/login' component={LoginForm}></Route>
          {/* <Route exact path='/' component={TokenConfigComp}></Route> */}
          {/* <Route exact path='/reserveToken' component={ReserveToken}></Route> */}
          <Route
            exact
            path='/admin/issuerSuperAdmins'
            render={props => (
              <>
                <SideBar />
                <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                  <IssuerSuperAdmins />
                </div>
              </>
            )}
          ></Route>
          <Route
            exact
            path='/admin/registrationRequests'
            render={props => (
              <>
                <SideBar />
                <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                  <RegistrationRequest />
                </div>
              </>
            )}
          ></Route>
          <Route
            path='/issuer/tokenCreation/:stepType'
            render={props => (
              <>
                <IssuerSideBar />
                <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                  <TokenCreationSteps />
                </div>
              </>
            )}
          ></Route>
        </Switch>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
