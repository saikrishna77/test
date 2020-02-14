import React from 'react';
import { Result, Button } from 'antd';
import firebase from '../../../utils/firebase';
import { withRouter } from 'react-router-dom';

const ErrorPage = props => {
  return (
    <Result
      status='error'
      title='Metamask not installed or not in kovan test netowork.'
      extra={
        <>
          <p>
            Refresh after installing the metamask and changing the network to
            kovan.
          </p>
          <a href='/'>
            <Button type='primary' key='console'>
              refresh
            </Button>
          </a>
        </>
      }
    />
  );
};

export default withRouter(ErrorPage);
