import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { Link } from 'react-router-dom';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ margin: '5% 0 0 15%', width: '70%' }}>
        <h2>Log In</h2>
        <Form
          onSubmit={this.handleSubmit}
          className='login-form'
          style={{
            margin: 'auto',
            marginTop: '3%',
            width: '60%',
            textAlign: 'center'
          }}
        >
          <Form.Item style={{ width: '40%', margin: 'auto' }}>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item style={{ width: '40%', margin: 'auto' }}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
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
            >
              Log in
            </Button>
            <br />
            Or <Link to='/register'>register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
