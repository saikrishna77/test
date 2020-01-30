import React from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  Modal
} from 'antd';
import { Link } from 'react-router-dom';
import { MetamaskService } from '../../utils/metamask';

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    const DisplayErrorOkClicked = () => {
      this.setState({ setError: false });
    };
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let msg = await MetamaskService();
        if (msg === 'Install metamask') {
          return Modal.error({
            title: 'Metamask Extension not found',
            content: 'Install metamask!',
            onOk() {
              DisplayErrorOkClicked();
            }
          });
        }
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Card style={{ margin: '1% 0 0 15%', width: '70%' }}>
        <h2>Sign up!</h2>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: '2% 10% 0 10%', width: '60%' }}
        >
          <Form.Item label='FirstName'>
            {getFieldDecorator('firstname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your First Name!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='LastName'>
            {getFieldDecorator('lastname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Last Name!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='E-mail'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Password' hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label='Confirm Password' hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label='Phone'>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Phone Number!',
                  whitespace: true
                }
              ]
            })(<Input type='number' />)}
          </Form.Item>
          <Form.Item label='Token Phase'>
            {getFieldDecorator('token-phase', {
              rules: [
                {
                  required: true,
                  message: 'Please input token phase!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Amount to raise'>
            {getFieldDecorator('Amount', {
              rules: [
                {
                  required: true,
                  message: 'Please input amount to raise!',
                  whitespace: true
                }
              ]
            })(<Input type='number' />)}
          </Form.Item>
          <Form.Item label='Underlying Asset'>
            {getFieldDecorator('UnderAsset', {
              rules: [
                {
                  required: true,
                  message: 'Please input underlying asset!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Tentative Date'>
            {getFieldDecorator('UnderAsset', {
              rules: [
                {
                  required: true,
                  message: 'Please input tentative date!',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
            <br />
            Or <Link to='/login'>login now!</Link>
          </Form.Item>
        </Form>
        By clicking <i>Sign up</i> you agree to our <a>terms of service</a>
      </Card>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default WrappedRegistrationForm;
