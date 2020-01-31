import React from 'react';
import './App.css';
import TokenConfig from './Components/Issuer/TokenCreationSteps/TokenConfiguration/TokenConfiguration';
import { Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import RegisterForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';
import ReserveToken from './Components/Issuer/TokenCreationSteps/ReserveToken/ReserveToken';
import TokenCreationSteps from './Components/Issuer/TokenCreationSteps/TokenCreationSteps';
import UserSideBar from './Components/SideBar/SideBar';
import IssuerSuperAdmins from './Components/Admin/IssuerSuperAdmins/IssuerSuperAdmins';
import RegistrationRequest from './Components/Admin/RegistrationRequests/RegistrationRequests';

function App() {
  const TokenConfigComp = () => {
    return (
      <Row>
        <TokenConfig></TokenConfig>
      </Row>
    );
  };
  const RegisterFormComp = () => {
    return (
      <div>
        <RegisterForm />
      </div>
    );
  };
  return (
    <div className='App'>
      <div style={{ position: 'absolute', height: '100vh' }}>
        {/* <UserSideBar /> */}
      </div>
      <Switch>
        <Route exact path='/register' component={RegisterFormComp}></Route>
        <Route exact path='/login' component={LoginForm}></Route>
        {/* <Route exact path='/' component={TokenConfigComp}></Route> */}
        {/* <Route exact path='/reserveToken' component={ReserveToken}></Route> */}
        <Route
          exact
          path='/issuerSuperAdmins'
          component={IssuerSuperAdmins}
        ></Route>
        <Route
          exact
          path='/registrationRequests'
          component={RegistrationRequest}
        ></Route>
        <Route
          path='/tokenCreation/:stepType'
          component={TokenCreationSteps}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
