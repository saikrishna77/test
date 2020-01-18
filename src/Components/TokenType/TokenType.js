import React from 'react';

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

class TokenType extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='Description'>
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'This field is required!'
              }
            ]
          })(<TextArea autoSize={{ minRows: 2, maxRows: 6 }} allowClear />)}
        </Form.Item>
        <Form.Item label='# Of Investors' >
          {getFieldDecorator('NoOfInvestors', {
            rules: [
              {
                required: true,
                message: 'This field is required!'
              }
            ]
          })(<Input placeholder='total number of investors'/>)}
        </Form.Item>
        <Form.Item label='Lock Period'>
          {getFieldDecorator('LPInvestor', {
            rules: [
              {
                required: true,
                message: 'This field is required'
              }
            ]
          })(<Input placeholder='lock period for investor'/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTokenType = Form.create({ name: 'register' })(TokenType);

export default WrappedTokenType;
