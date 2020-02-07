import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../utils/firebase';

const NormalLoginForm = props => {
  const [err, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          values.username = values.username.trim();
          setLoading(true);
          let res = await firebase
            .auth()
            .signInWithEmailAndPassword(values.username, values.password);
          console.log('Received values of form: ', values);
          console.log(res.user.uid);
          const db = firebase.firestore();
          const doc = await db
            .collection('users')
            .doc(res.user.uid)
            .get();
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            localStorage.setItem('uid', res.user.uid);
            localStorage.setItem('email', res.user.email);
            if (doc.data().role === 'issuer') {
              props.history.push('/issuer/tokens');
            } else {
              props.history.push('/admin/issuerSuperAdmins');
            }
            console.log('Document data:', doc.data());
          }
          setLoading(false);
        } catch (e) {
          setLoading(false);
          if (e.code === 'auth/user-not-found') {
            console.error(e);
            setError('User not found');
          } else if (e.code === 'auth/wrong-password') {
            console.error(e);
            setError('Wrong Credentials');
          } else {
            console.log(e.code);
          }
        }
      }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <Card
      style={{
        margin: '5% 0 0 15%',
        width: '70%'
      }}
    >
      <h2>Log In</h2>
      <Form
        onSubmit={handleSubmit}
        className='login-form'
        style={{
          margin: 'auto',
          marginTop: '3%',
          width: '60%',
          textAlign: 'center'
        }}
      >
        <Form.Item
          validateStatus={err ? 'error' : ''}
          style={{
            width: '40%',
            margin: 'auto'
          }}
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon
                  type='user'
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              placeholder='Username'
            />
          )}
        </Form.Item>
        <Form.Item
          style={{
            width: '40%',
            margin: 'auto'
          }}
          validateStatus={err ? 'error' : ''}
          help={err}
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon
                  type='lock'
                  style={{
                    color: 'rgba(0,0,0,.25)'
                  }}
                />
              }
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
          <br />
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={loading}
          >
            Log in
          </Button>
          <br />
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default withRouter(WrappedNormalLoginForm);
