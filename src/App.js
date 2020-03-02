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
import ErrorPage from './Components/Issuer/ErrorPages/AdminPendingErrorPage';
import MetamaskErrorPage from './Components/Issuer/ErrorPages/metamaskErrors';
import IssuerReg from './Components/Issuer/IssuerReg/issuerReg';
import ComplianceForm from './Components/Compliance/ComplianceForm';
import TokenDeploy from './Components/Issuer/TokenCreationSteps/tokenDeploy';
import Web3 from 'web3';
import KYC_DashBoard from './Components/Compliance/KYC_DashBoard';

function App(props) {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        let ethereum = window['ethereum'];
        if (typeof ethereum === 'undefined') {
          props.history.push('/metamaskError');
        } else if (typeof ethereum !== 'undefined') {
          const web3 = new Web3(ethereum);
          const network = await web3.eth.net.getNetworkType();
          if (network.toString() !== 'kovan') {
            props.history.push('/metamaskError');
          } else {
            if (user.emailVerified) {
              firebase.analytics();
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
                  if (doc.data().role === 'issuer') {
                    if (doc.data().status.adminApproved !== 'approved') {
                      props.history.push('/pendingRegistrationError');
                    } else {
                      props.history.push('/issuer/tokens');
                    }
                  } else if (doc.data().role === 'admin') {
                    props.history.push('/admin/issuerSuperAdmins');
                  }
                } else {
                  const subRoute = window.location.pathname
                    .toString()
                    .split('/')[1];
                  if (subRoute === 'issuer') {
                    if (doc.data().role === 'issuer') {
                      if (doc.data().status.adminApproved !== 'approved') {
                        props.history.push('/pendingRegistrationError');
                      } else {
                        props.history.push(
                          window.location.pathname + props.location.search
                        );
                      }
                    } else {
                      props.history.push('/login');
                    }
                  } else if (subRoute === 'admin') {
                    if (doc.data().role === 'admin') {
                      props.history.push(
                        window.location.pathname + props.location.search
                      );
                    } else {
                      props.history.push('/login');
                    }
                  } else {
                    props.history.push(
                      window.location.pathname + props.location.search
                    );
                  }
                }
                console.log('Document data:', doc.data());
              }
            }
          }
        }
      } else {
        props.history.push('/login');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          path='/pendingRegistrationError'
          component={ErrorPage}
        ></Route>
        <Route
          exact
          path='/metamaskError'
          component={MetamaskErrorPage}
        ></Route>
        <Route
          exact
          path='/tokenDeploy'
          render={props => (
            <>
              <IssuerSideBar />
              <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                <TokenDeploy />
              </div>
            </>
          )}
        ></Route>
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
        <Route
          path='/issuer/issuerReg'
          render={props => (
            <>
              <IssuerSideBar />
              <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                <IssuerReg />
              </div>
            </>
          )}
        ></Route>
        <Route
          path='/issuer/Compliance'
          render={props => (
            <>
              <IssuerSideBar />
              <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                <ComplianceForm />
              </div>
            </>
          )}
        ></Route>
        <Route
          path='/issuer/kyc'
          render={props => (
            <>
              <IssuerSideBar />
              <div style={{ marginTop: '6%', marginLeft: '10%' }}>
                <KYC_DashBoard />
              </div>
            </>
          )}
        ></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
