import React from 'react';

import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  Card,
  Tooltip,
  Icon,
  notification
} from 'antd';
import axios from 'axios';
import api_url from '../../api_url';

const { TextArea } = Input;

class TokenType extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    EBS: false,
    EBSTYPE: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios
          .post(api_url + 'tokenTyp', values)
          .then(res => {
            notification.success({
              message: `Saved`,
              description: 'The Token Type and Details are saved.',
              placement: 'topRight'
            });
          })
          .catch(err => {
            notification.error({
              message: `Error`,
              description: 'Error Saving details',
              placement: 'topRight'
            });
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  onChangeTS = e => {
    if (e.target.value === 'EBS') {
      this.setState({ EBS: true });
    } else if (
      e.target.value === 'CSA' ||
      e.target.value === 'CSB' ||
      e.target.value === 'CSC'
    ) {
      this.setState({ EBSTYPE: e.target.value });
    } else if (
      e.target.value === 'IPS' ||
      e.target.value === 'Convertibles' ||
      e.target.value === 'warrants' ||
      e.target.value === 'DPS' ||
      e.target.value === 'PS' ||
      e.target.value === 'RET'
    ) {
      this.setState({ EBS: false, EBSTYPE: null });
    } else if (
      e.target.value === 'PSA' ||
      e.target.value === 'PSB' ||
      e.target.value === 'PSC'
    ) {
      this.setState({ EBSTYPE: null });
    }
    console.log(e.target.value);
  };

  VotingRights = type => {
    return (
      <Card>
        Voting Rights for Common Stock Equity Based Security
        <br />
        <Radio value={`${type}Y`}>Yes</Radio>
        <br />
        <Radio value={`${type}N`}>No</Radio>
        <br />
      </Card>
    );
  };

  EquityBasedSecurities = () => {
    return (
      <Card>
        Select one of the option for quity based securities
        <br />
        <Radio value={'CSA'}>Common Stock - Series A</Radio>
        <br />
        {this.state.EBSTYPE === 'CSA' ? this.VotingRights('CSA') : null}
        <Radio value={'CSB'}>Common Stock - Series B</Radio>
        <br />
        {this.state.EBSTYPE === 'CSB' ? this.VotingRights('CSB') : null}
        <Radio value={'CSC'}>Common Stock - Series C</Radio>
        <br />
        {this.state.EBSTYPE === 'CSC' ? this.VotingRights('CSC') : null}
        <Radio value={'PSA'}>Preferred Stock - Series A</Radio>
        <br />
        <Radio value={'PSB'}>Preferred Stock - Series B</Radio>
        <br />
        <Radio value={'PSC'}>Preferred Stock - Series C</Radio>
        <br />
      </Card>
    );
  };

  validateTypeOfSecurity = (rule, value, callback) => {
    if (
      value === 'EBS' ||
      value === 'CSA' ||
      value === 'CSB' ||
      value === 'CSC'
    ) {
      callback('Please Select Sub Menu Option!');
    } else {
      callback();
    }
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
        <Form.Item label='# Of Investors' style={{ textAlign: 'left' }}>
          {getFieldDecorator('NoOfInvestors', {
            rules: [
              {
                required: true,
                message: 'This field is required!'
              }
            ]
          })(<InputNumber min={1} placeholder='total number of investors' />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Lock Period&nbsp;
              <Tooltip title='Minimum Lock Period is 12 Months'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
          style={{ textAlign: 'left' }}
        >
          {getFieldDecorator('LPInvestor', {
            rules: [
              {
                required: true,
                message: 'This field is required'
              }
            ]
          })(<InputNumber min={12} placeholder='lock period for investor' />)}
        </Form.Item>
        <Form.Item label='SecurityToken' style={{ textAlign: 'left' }}>
          {getFieldDecorator('SecurityToken', {
            rules: [
              {
                required: true,
                message: 'This field is required'
              }
            ]
          })(
            <Radio.Group>
              <Radio value={'divisible'}>Divisible</Radio>
              <Radio value={'indivisible'}>Indivisible</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='TypeOfSecurity' validateStatus='error'>
          {getFieldDecorator('typeOfSecurity', {
            rules: [
              {
                required: true,
                message: 'This field is required'
              },
              {
                validator: this.validateTypeOfSecurity
              }
            ]
          })(
            <Radio.Group
              style={{ textAlign: 'left' }}
              onChange={this.onChangeTS}
            >
              <Radio value={'EBS'}>Equity Backed Securities</Radio>
              <br />
              {this.state.EBS ? this.EquityBasedSecurities() : null}
              <Radio value={'IPS'}>Interest Paying Securities</Radio>
              <br />
              <Radio value={'Convertibles'}>Convertibles</Radio>
              <br />
              <Radio value={'warrants'}>Warrants</Radio>
              <br />
              <Radio value={'DPS'}>Dividend Paying Securities</Radio>
              <br />
              <Radio value={'PS'}>Preferential Securities</Radio>
              <br />
              <Radio value={'RET'}>Real Estate Token</Radio>
              <br />
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Save My Token Type & Token Details
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTokenType = Form.create({ name: 'register' })(TokenType);

export default WrappedTokenType;
