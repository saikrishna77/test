import React from 'react';
import { Result, Button } from 'antd';
import firebase from '../../../utils/firebase';
import { withRouter } from 'react-router-dom';

const ErrorPage = props => {
  const logout = () => {
    firebase.auth().signOut();
    props.history.push('/login');
  };
  return (
    <Result
      status='warning'
      title='Admin yet to process your registration.'
      extra={
        <Button type='primary' key='console' onClick={logout}>
          Log Out
        </Button>
      }
    />
  );
};

export default withRouter(ErrorPage);
