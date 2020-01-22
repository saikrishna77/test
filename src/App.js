import React from 'react';
import './App.css';
import TokenConfig from './Components/TokenConfiguration/TokenConfiguration';
import { Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import RegisterForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';

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
        <RegisterForm/>
      </div>
    )
  }
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/register' component={RegisterFormComp}></Route>
        <Route exact path='/login' component={LoginForm}></Route>
        <Route exact path='/' component={TokenConfigComp}></Route>
      </Switch>
    </div>
  );
}

export default App;
