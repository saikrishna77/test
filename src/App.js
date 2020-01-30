import React from 'react';
import './App.css';
import TokenConfig from './Components/TokenConfiguration/TokenConfiguration';
import { Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import RegisterForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';
import ReserveToken from './Components/ReserveToken/ReserveToken';
import TokenCreationSteps from './Components/TokenCreationSteps/TokenCreationSteps';
import UserSideBar from './Components/UserSideBar/UserSideBar';

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
      <div style={{position:'absolute', height: '100vh'}}>
        <UserSideBar />
      </div>
      <Switch>
        <Route exact path='/register' component={RegisterFormComp}></Route>
        <Route exact path='/login' component={LoginForm}></Route>
        {/* <Route exact path='/' component={TokenConfigComp}></Route> */}
        <Route exact path='/reserveToken' component={ReserveToken}></Route>
        <Route
          path='/tokenCreation/:stepType'
          component={TokenCreationSteps}
        ></Route>
        <Route exact path='/token/list' component={ReserveToken}></Route>
      </Switch>
    </div>
  );
}

export default App;
