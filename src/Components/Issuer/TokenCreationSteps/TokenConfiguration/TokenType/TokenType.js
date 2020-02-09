import React from 'react';

import {
  Form,
  Button,
  Radio,
  InputNumber,
  Card,
  Tooltip,
  Icon,
  notification,
  Popconfirm
} from 'antd';
import firebase from '../../../../../utils/firebase';
import { withRouter } from 'react-router-dom';

class TokenType extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    EBS: false,
    EBSTYPE: null,
    SetLoading: false,
    symbol: '',
    lockPeriod: null,
    NoOfInvestors: null,
    SecurityToken: null,
    typeOfSecurity: null,
    typeOfSecuritysub: null,
    typeOfSecuritysubsub: null
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    this.setState({ symbol: symbol });
    if (params.get('edit')) {
      firebase.analytics();
      const db = firebase.firestore();
      db.collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .get()
        .then(snapshot => {
          if (snapshot.data().TokenType) {
            this.setState({
              lockPeriod: snapshot.data().TokenType.LPInvestor,
              NoOfInvestors: snapshot.data().TokenType.NoOfInvestors,
              SecurityToken: snapshot.data().TokenType.SecurityToken,
              typeOfSecurity: snapshot.data().TokenType.typeOfSecurity,
              typeOfSecuritysub: snapshot.data().TokenType.typeOfSecuritysub,
              typeOfSecuritysubsub: snapshot.data().TokenType
                .typeOfSecuritysubsub
            });
            if (this.state.typeOfSecurity === 'EBS') {
              this.setState({ EBS: true });
            }
            if (
              this.state.typeOfSecuritysub === 'CSA' ||
              this.state.typeOfSecuritysub === 'CSB' ||
              this.state.typeOfSecuritysub === 'CSC'
            ) {
              this.setState({ EBSTYPE: this.state.typeOfSecuritysub });
            }
          }
        });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    // this.props.form.validateFields(
    //   ['TypeOfSecurity'],
    //   (err, values, callback) => {}
    // );
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      console.log(values);
      if (!err) {
        this.setState({ SetLoading: true });
        try {
          const search = this.props.location.search; // could be '?foo=bar'
          const params = new URLSearchParams(search);
          const symbol = params.get('symbol'); // bar
          firebase.analytics();
          const db = firebase.firestore();
          await db
            .collection('reservedTokenSymbols')
            .doc(symbol + '-' + localStorage.getItem('uid'))
            .update({
              TokenType: values
            });
          notification.success({
            message: `Saved`,
            description: 'The Token Type and Details are saved.',
            placement: 'topRight'
          });
          this.props.NextTab('vesting');
        } catch (e) {
          console.log(e);
          notification.error({
            message: `Error`,
            description: 'Error Saving details',
            placement: 'topRight'
          });
        }
        this.setState({ SetLoading: false });
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        Voting Rights for Common Stock Equity Based Security
        <Form.Item style={{ textAlign: 'left', marginTop: '-10px' }}>
          {getFieldDecorator(`typeOfSecuritysubsub`, {
            rules: [
              {
                required: true,
                message: 'This field is required'
              }
            ],
            initialValue: this.state.typeOfSecuritysubsub
          })(
            <Radio.Group
              style={{ textAlign: 'left' }}
              onChange={this.onChangeTS}
            >
              <Radio value={`${type}Y`}>Yes</Radio>
              <Radio value={`${type}N`}>No</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </div>
    );
  };

  EquityBasedSecurities = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginLeft: '10px', marginTop: '10px' }}>
        Select one of the option for Equity Based Securities
        <Form.Item style={{ textAlign: 'left', marginTop: '-10px' }}>
          {getFieldDecorator(`typeOfSecuritysub`, {
            rules: [
              {
                required: true,
                message: 'This field is required'
              }
            ],
            initialValue: this.state.typeOfSecuritysub
          })(
            <Radio.Group
              style={{ textAlign: 'left' }}
              onChange={this.onChangeTS}
            >
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
            </Radio.Group>
          )}
        </Form.Item>
      </div>
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
      <>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label='Total Number Of Investors'
            style={{ textAlign: 'left' }}
          >
            {getFieldDecorator('NoOfInvestors', {
              rules: [
                {
                  required: true,
                  message: 'This field is required!'
                }
              ],
              initialValue: this.state.NoOfInvestors
            })(<InputNumber min={1} placeholder='total number of investors' />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Lock Period For Investor&nbsp;
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
              ],
              initialValue: this.state.lockPeriod
            })(<InputNumber min={12} placeholder='lock period for investor' />)}
          </Form.Item>
          <Form.Item
            label={
              <span style={{ whiteSpace: 'normal' }}>
                Security Token must be&nbsp;
                <Tooltip title='So when we say Divisible or Indivisible means "Fractional" or "Whole Number"'>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
            style={{ textAlign: 'left' }}
          >
            {getFieldDecorator('SecurityToken', {
              rules: [
                {
                  required: true,
                  message: 'This field is required'
                }
              ],
              initialValue: this.state.SecurityToken
            })(
              <Radio.Group style={{ marginRight: '200px' }}>
                <Radio value={'divisible'}>Divisible</Radio>
                <Radio value={'indivisible'}>Indivisible</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label='Type Of Security'
            validateStatus='error'
            style={{ textAlign: 'left' }}
          >
            {getFieldDecorator('typeOfSecurity', {
              rules: [
                {
                  required: true,
                  message: 'This field is required'
                }
              ],
              initialValue: this.state.typeOfSecurity
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
            <Button
              type='primary'
              htmlType='submit'
              loading={this.state.SetLoading}
            >
              Save My Token Type & Token Details
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '-50px', marginRight: '-60px' }}>
          <Popconfirm
            title='Sure to go back to roles without saving?'
            onConfirm={() => {
              this.props.history.push(
                '/issuer/tokenCreation/roles?symbol=' +
                  this.state.symbol +
                  '&edit=true'
              );
            }}
          >
            <Button>Back To Roles</Button>
          </Popconfirm>
        </div>
      </>
    );
  }
}

const WrappedTokenType = Form.create({ name: 'register' })(TokenType);

export default withRouter(WrappedTokenType);
