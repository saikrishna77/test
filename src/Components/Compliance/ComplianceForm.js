import {
  DatePicker,
  Button,
  notification,
  Card,
  Input,
  Select,
  Row,
  Tooltip,
  Icon,
  Typography,
  InputNumber
} from 'antd';
import React from 'react';
import { Base64 } from '../../utils/Base64';
import './compliance.css';
import firebase from '../../utils/firebase';
import countryArray from '../../newJSON';
import Axios from 'axios';
import StringValidators from '../../utils/StringValidators';
import api_url from '../../api_url';
const ipCon = require('ip');
const ipNum = ipCon.address();
const storage = firebase.storage();
const { Option } = Select;
const { Text } = Typography;
const cArray = countryArray;
const { TextArea } = Input;

export default class ComplianceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFlag: '',
      errFlag: '',
      current: 0,
      /////////////////////////////////////////////////
      AccountName: '',
      email: '',
      ip: ipNum,
      country: '',
      fName: '',
      lName: '',
      mName: '',
      pstreet: '',
      pcountry: '',
      pcity: '',
      pstate: '',
      postal: '',
      perstreet: '',
      percountry: '',
      percity: '',
      perstate: '',
      perpostal: '',
      clong: '',
      clat: '',
      phone_area: 0,
      phone_num: 0,
      phone_work: 0,
      phone_primary: 0,
      timestamp: '',
      memo: '',
      timezone: '',
      tags: '',
      docType: '',
      docissuecon: '',
      docupload: '',
      docproofupload: '',
      faceUpload: [],
      stage: 1,
      dob: '',
      assn: '',
      assnl4: '',
      assnPrefix: '',
      loading: false,
      date: '',
      uidField: localStorage.getItem('uid'),
      UserEmail: localStorage.getItem('email'),
      title: ''
    };
  }
  openNotificationWithIcon(type, message, description) {
    notification[type]({
      message,
      description
    });
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  changeHandler = (item, name) => {
    if (name === 'username') {
      this.setState({ username: item });
    } else if (name === 'password') {
      this.setState({ password: item });
    }
  };
  getLatLon = position => {
    // this.setState({ clat: position.coords.latitude });\
    this.setState({ clong: position.coords.longitude });
    this.setState({ clat: position.coords.latitude });
    // this.setState({ clong: position.coords.longitude });
  };
  componentDidMount() {
    const dates = new Date();
    const timestamps = dates.getTime();
    var offset = -dates.getTimezoneOffset();
    const timezones =
      (offset >= 0 ? '+' : '-') + parseInt(offset / 60) + ':' + (offset % 60);
    this.setState({
      timestamp: timestamps,
      timezone: timezones,
      date: dates
    });
    let nac = navigator.geolocation.getCurrentPosition(this.getLatLon);
  }
  async save_Data() {
    this.setState({ loading: true });
    if (
      (this.state.emailFlag === false,
      this.state.docupload === ' ' ||
        this.state.docproofupload === ' ' ||
        this.state.faceUpload === 0 ||
        this.state.dob === '' ||
        this.state.country === ' ' ||
        this.state.fName === ' ' ||
        this.state.mName === ' ' ||
        this.state.lName === ' ')
    ) {
      this.setState({
        errFlag: 'Please make sure you enter all neccesary documents'
      });
      console.log('in');
      return;
    } else {
      try {
        console.log('in body');

        let data = this.state;
        delete data.current;
        delete data.loading;
        delete data.errFlag;
        data.assn = this.state.assnPrefix + ':' + this.state.assn;
        setTimeout(() => {
          console.log(this.state);
        }, 1000);
        let file1 = await this.fileUpload(
          data.docproofupload,
          data.fName,
          'docproofupload'
        );
        let file2 = await this.fileUpload(
          data.docupload,
          data.fName,
          'docupload'
        );
        let file3 = await this.fileUpload(
          data.faceUpload[0],
          data.fName,
          'faceUpload'
        );
        let sample = [data.docupload, data.faceUpload, data.docproofupload];
        data.docupload = file2;
        data.faceUpload = file3;
        data.docproofupload = file1;
        const db = firebase.firestore();
        console.log(data);
        console.log(this.state);

        const ref = db.collection('issuer_complaince').doc();
        let res = await ref.set({ complaince_data: data }).then(snapshot => {});
        console.log(res);
        console.log(this.state);

        this.openNotificationWithIcon(
          'success',
          'data has been updated to firebase ',
          `data has been updated to firebase `
        );
        let body = {
          data: {
            man: this.state.AccountName,
            tea: this.state.email,
            ip: this.state.ip,
            bfn: this.state.fName,
            bmn: this.state.mName,
            bln: this.state.lName,
            bsn: this.state.pstreet,
            bco: this.state.country,
            bz: this.state.postal,
            bc: this.state.pcity,
            bs: this.state.pstate,
            clog: `${this.state.clong}`,
            clat: `${this.state.clong}`,
            phn: this.state.phone_primary,
            pm: this.state.phone_num,
            pw: this.state.phone_work,
            tti: `${this.state.timestamp}`,
            memo: this.state.memo,
            timezone: this.state.timezone,
            tags: this.state.tags.split(','),
            scanData: await Base64(sample[0]),
            backsideImageData: await Base64(sample[1]),
            faceImages: [await Base64(sample[2])],
            croppedImage: false,
            stage: 1,
            title: this.state.title,
            docCountry: this.state.docissuecon,
            docType: this.state.docType,
            dob: this.state.dob,
            assn: this.state.assnPrefix + ':' + this.state.assn,
            assnl4: this.state.assnl4
          }
        };
        let response = await Axios.post(api_url + 'consumer/kyc', body, {
          headers: {
            'Content-Type': 'application/json',
            email: localStorage.getItem('email')
          }
        });
        let resData = response.data.data;
        if (resData.mtid) {
          let ref = firebase
            .firestore()
            .collection('issuer_complaince')
            .where('complaince_data.uidField', '==', this.state.uidField)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(async function(doc) {
                console.log(doc.id, ' => ', doc.data());
                firebase
                  .firestore()
                  .collection('issuer_complaince')
                  .doc(doc.id)
                  .update({
                    latestResults: resData,
                    latestDate: new Date()
                  });
              });
            });
        } else {
          this.openNotificationWithIcon(
            'success',
            'data  updation  to IM was unsuccesfull ',
            `data  updation  to IM was unsuccesfull `
          );
        }

        this.setState({ loading: false });
      } catch (e) {
        console.log(e);
        this.openNotificationWithIcon(
          'error',
          'data has been not been saved',
          `data has been not been saved`
        );
      }
    }
  }

  fileUpload = async (fileName, name, dum) => {
    return new Promise(async (resolve, reject) => {
      await storage
        .ref(`/issuer_complaince_images/${name}/${fileName.name}`)
        .put(fileName);
      let fireBaseUrl = await storage
        .ref(`/issuer_complaince_images/${name}`)
        .child(`${fileName.name}`)
        .getDownloadURL();
      if (fireBaseUrl === '') {
        reject();
      }
      setTimeout(() => {
        resolve(fireBaseUrl);
      }, 1000);
    });
  };

  render() {
    return (
      <div style={{ width: '70vw', marginLeft: '10vw' }}>
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Country Information
            </Text>
          }
        >
          <Select
            style={{ width: '80%' }}
            placeholder='please select a country'
            onChange={e => this.setState({ country: e })}
          >
            {cArray.map(item => {
              return (
                <Option key={item.name} value={item.code}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <br></br>
        </Card>
        <br></br>
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Personal Information
            </Text>
          }
        >
          <Text style={{ float: 'left', fontWeight: 'bold' }}>* Title :</Text>
          <br></br>
          <Input
            value={this.state.title}
            placeholder='Title Name'
            onChange={e =>
              StringValidators.hasNumeric(e.target.value, 1)
                ? ''
                : this.setState({ title: e.target.value })
            }
          />
          <br></br>
          <br></br>
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Account Name :
          </Text>
          <br></br>
          <Input
            value={this.state.AccountName}
            placeholder='Account Name'
            onChange={e =>
              StringValidators.hasNumeric(e.target.value, 1)
                ? ''
                : this.setState({ AccountName: e.target.value })
            }
          />
          <br></br>
          <br></br>
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Full Name :
          </Text>
          <br></br>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              value={this.state.fName}
              placeholder='First Name'
              onChange={e =>
                StringValidators.hasNumeric(e.target.value, 1)
                  ? ''
                  : this.setState({ fName: e.target.value })
              }
            />
            <Input
              placeholder='Middle Name'
              onChange={e =>
                StringValidators.hasNumeric(e.target.value, 1)
                  ? ''
                  : this.setState({ mName: e.target.value })
              }
            />
            <Input
              value={this.state.lName}
              placeholder='Last Name'
              onChange={e =>
                StringValidators.hasNumeric(e.target.value, 1)
                  ? ''
                  : this.setState({ lName: e.target.value })
              }
            />
            <br></br>
          </Row>
          <br></br>
          <Row>
            <Text style={{ float: 'left', fontWeight: 'bold' }}>
              * Date Of Birth :
            </Text>
            <br></br>
            <DatePicker
              style={{ float: 'left' }}
              format='DD-MM-YYYY'
              id='date'
              onChange={e => {
                this.setState({ dob: e.format('DD-MM-YYYY') });
              }}
            />
          </Row>
          <br></br>
          <Row>
            <Text style={{ float: 'left', fontWeight: 'bold' }}>
              * Present Address :
            </Text>
            <br></br>
            <Input
              placeholder='Street Address'
              onChange={e => this.setState({ pstreet: e.target.value })}
            />
            <br></br>
            <br></br>
            <Row style={{ display: 'flex' }}>
              {' '}
              <Input
                value={this.state.pstate}
                placeholder='City '
                onChange={e =>
                  StringValidators.hasNumeric(e.target.value, 1)
                    ? ''
                    : this.setState({ pcity: e.target.value })
                }
              />
              <br></br>
              <br></br>
              <Input
                value={this.state.pstate}
                placeholder='State '
                onChange={e =>
                  StringValidators.hasNumeric(e.target.value, 1)
                    ? ''
                    : this.setState({ pstate: e.target.value })
                }
              />
            </Row>
            <br></br>
            <Row style={{ display: 'flex' }}>
              <Input
                type='number'
                placeholder='Postal/Zip Code'
                onChange={e =>
                  StringValidators.hasNumeric(e.target.value, 1)
                    ? this.setState({ postal: e.target.value })
                    : ''
                }
              />

              <Select
                style={{ width: '102%' }}
                placeholder='please select a country'
                onChange={e => this.setState({ pcountry: e })}
              >
                {cArray.map(item => {
                  return (
                    <Option key={item.name} value={item.code}>
                      {item.code}
                    </Option>
                  );
                })}
              </Select>
            </Row>
            <br></br>
            <Row>
              <Text style={{ float: 'left', fontWeight: 'bold' }}>
                * Permanent Address :
              </Text>
              <br></br>

              <Input
                add='*'
                placeholder='Street Address'
                onChange={e => this.setState({ perstreet: e.target.value })}
              />
              <br></br>
              <br></br>
              <Row style={{ display: 'flex' }}>
                <Input
                  add='*'
                  placeholder='City '
                  onChange={e => this.setState({ percity: e.target.value })}
                />
                <Input
                  add='*'
                  placeholder='State '
                  onChange={e => this.setState({ perstate: e.target.value })}
                />
              </Row>
              <br></br>
              <Row style={{ display: 'flex' }}>
                {' '}
                <Input
                  add='*'
                  type='number'
                  placeholder='Postal/Zip Code'
                  onChange={e => this.setState({ perpostal: e.target.value })}
                />
                <Select
                  style={{ width: '102%' }}
                  placeholder='please select a country'
                  onChange={e => this.setState({ percountry: e })}
                >
                  {cArray.map(item => {
                    return (
                      <Option key={item.name} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Row>
              <br></br>
              <Text style={{ float: 'left', fontWeight: 'bold' }}>
                Memo Area :
              </Text>
              <br></br>
              <TextArea
                value={this.state.memo}
                id='text_area'
                placeholder='Memo Area '
                allowClear
                onChange={e => this.setState({ memo: e.target.value })}
              />
              <br></br>
              <br></br>
              <Text style={{ float: 'left', fontWeight: 'bold' }}>Tags :</Text>
              <Input
                placeholder='Please seperate each tag with a comma(,) '
                onChange={e => this.setState({ tags: e.target.value })}
              />
              <br></br>
              <br></br>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  style={{ width: '80%' }}
                  placeholder='please select a country as prefix for assn'
                  onChange={e => this.setState({ assnPrefix: e })}
                >
                  {cArray.map(item => {
                    return (
                      <Option key={item.name} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
                <Input
                  placeholder='Social security Number'
                  onChange={e => this.setState({ assn: e.target.value })}
                />
                <Tooltip
                  title={
                    'The social security number or national identification number. For example "US:123456789" represents a United States Social Security Number. For backwards compatibility if no country code is provided then the identifier is assumed to be a US SSN'
                  }
                >
                  <Icon
                    style={{ marginLeft: '10px' }}
                    type='info-circle'
                  ></Icon>
                </Tooltip>
              </div>
              <br></br>
              <br></br>
              <InputNumber
                minLength={4}
                maxLength={4}
                style={{ width: '100%' }}
                placeholder='Last 4 digits of Social Security Number'
                onChange={e => this.setState({ assnl4: e })}
              />
            </Row>
          </Row>
        </Card>
        <br></br>
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Contact Information
            </Text>
          }
        >
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Phone Number :
          </Text>
          <br></br>
          <Row style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <InputNumber
              style={{ width: '100%' }}
              min={9}
              max={999}
              add='*'
              placeholder='Area  Code'
              onChange={e => this.setState({ phone_area: e })}
            />
            -
            <InputNumber
              style={{ width: '100%' }}
              min={99999}
              max={9999999999}
              add='*'
              placeholder='Phone Number'
              onChange={e => this.setState({ phone_num: e })}
            />
          </Row>

          <br></br>
          <InputNumber
            style={{ width: '100%' }}
            min={99999}
            max={9999999999}
            add='*'
            placeholder='Customer primary Number'
            onChange={e => this.setState({ phone_primary: e })}
          />
          <br></br>
          <br></br>
          <InputNumber
            style={{ width: '100%' }}
            min={99999}
            max={9999999999}
            add='*'
            placeholder='Customer work phone'
            onChange={e => this.setState({ phone_work: e })}
          />
          <br></br>
          <br></br>
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Email Address :
          </Text>
          <Input
            type='email'
            add='*'
            placeholder='Email Address '
            onChange={e =>
              StringValidators.ValidateEmail(e.target.value)
                ? this.setState({ emailFlag: true })
                : this.setState({ emailFlag: false })
            }
          />
          <br></br>
          {this.state.emailFlag ? (
            ''
          ) : (
            <Text
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red'
              }}
            >
              Enter a valid email address
            </Text>
          )}
        </Card>
        <br></br>
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Document Upload
            </Text>
          }
        >
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Government Issued photoID :
          </Text>
          <Select
            style={{ width: '100%' }}
            placeholder='please Document type'
            onChange={e => this.setState({ docType: e })}
          >
            <Option key='PP' value='PP'>
              Passport (PP)
            </Option>
            <Option key='DL' value='DL'>
              Driver's Licence (DL)
            </Option>
            <Option key='ID' value='ID'>
              Government issued Identity Card (ID)
            </Option>
            <Option key='RP' value='RP'>
              Residence Permit (RP)
            </Option>
            <Option key='UB' value='UB'>
              Utility Bill (RP)
            </Option>
          </Select>
          <br></br>
          <br></br>
          <Select
            style={{ width: '100%' }}
            placeholder='please Document issue Country'
            onChange={e => this.setState({ docissuecon: e })}
          >
            {cArray.map(item => {
              return (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <br></br>
          <br></br>
          <Row>
            <Text style={{ float: 'left' }}>Upload Document :</Text>
            <Input
              style={{ border: 'hidden' }}
              type='file'
              onChange={e => {
                console.log(e.target.files[0]);
                this.setState({ docupload: e.target.files[0] });
              }}
            />
          </Row>

          <br></br>
          <Row>
            <Text style={{ float: 'left' }}>Upload Back side Document :</Text>
            <Input
              style={{ border: 'hidden' }}
              type='file'
              onChange={e => {
                console.log(e);
                this.setState({ docproofupload: e.target.files[0] });
              }}
            />
          </Row>
        </Card>
        <br></br>{' '}
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Face Image Upload
            </Text>
          }
        >
          <Row>
            <Text style={{ float: 'left' }}>* Upload Face/Selfie File :</Text>
            <Input
              type='file'
              style={{ border: 'hidden' }}
              onChange={e => {
                this.setState({ faceUpload: [e.target.files[0]] });
              }}
            />
          </Row>
          <Row>
            <Text>{this.state.errFlag}</Text>
            <br></br>
            <Button
              style={{ marginLeft: '10px' }}
              type='danger'
              onClick={e => {
                this.cancel_Data(e);
              }}
            >
              Cancel
            </Button>
            <Button
              loading={this.state.loading}
              style={{ marginLeft: '10px' }}
              type='primary'
              onClick={e => {
                this.save_Data(e);
              }}
            >
              Submit
            </Button>
          </Row>
        </Card>
      </div>
    );
  }
}
