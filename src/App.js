import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import RegisterForm from './Components/Register/Register';
import LoginForm from './Components/Login/Login';
import TokenCreationSteps from './Components/Issuer/TokenCreationSteps/TokenCreationSteps';
import IssuerSuperAdmins from './Components/Admin/IssuerSuperAdmins/IssuerSuperAdmins';
import RegistrationRequest from './Components/Admin/RegistrationRequests/RegistrationRequests';
import SideBar from './Components/Admin/Sidebar/Sidebar';
import IssuerSideBar from './Components/Issuer/SideBar/SideBar';
import Tokens from './Components/Issuer/Tokens/Tokens';
import firebase from './utils/firebase';

function App(props) {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        if (user.emailVerified) {
          const db = firebase.firestore();
          const doc = await db
            .collection('users')
            .doc(user.uid)
            .get();
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log(window.location.pathname);
            if (window.location.pathname === '/') {
              // if (doc.data().role === 'issuer') {
              if (false) {
                props.history.push('/issuer/tokens');
              } else {
                props.history.push('/admin/registrationRequests');
              }
            } else {
              props.history.push(
                window.location.pathname + props.location.search
              );
            }
            console.log('Document data:', doc.data());
          }
        }
      } else {
        props.history.push('/login');
      }
    });
  }, []);
  const RegisterFormComp = () => {
    return (
      <div>
        <RegisterForm />
      </div>
    );
  };
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/register' component={RegisterFormComp}></Route>
        <Route exact path='/login' component={LoginForm}></Route>
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
        <Route
          path='/issuer/tokens'
          render={props => (
            <>
              <IssuerSideBar />
              <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                <Tokens />
              </div>
            </>
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
