import {
  DatePicker,
  Button,
  notification,
  Card,
  Input,
  Select,
  Row,
  Typography
} from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import './compliance.css';
import firebase from '../../utils/firebase';
import countryArray from '../../newJSON';
const storage = firebase.storage();
const { Option } = Select;
const { Text } = Typography;
const cArray = countryArray;

export default class ComplianceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errFlag: '',
      current: 0,
      country: '',
      fName: '',
      lName: '',
      mName: '',
      dob: '',
      pstreet: '',
      pstreet2: '',
      pcity: '',
      pstate: '',
      postal: '',
      pcountry: '',
      perstreet: '',
      perstreet2: '',
      percity: '',
      perstate: '',
      perpostal: '',
      percountry: '',
      phone_area: '',
      phone_num: '',
      email: '',
      docType: '',
      docissuecon: '',
      docupload: '',
      docproofupload: '',
      faceUpload: '',
      loading: false
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

  async save_Data() {
    this.setState({ loading: true });
    if (
      this.docupload === ' ' ||
      this.docproofupload === ' ' ||
      this.faceUpload === ' ' ||
      this.dob === '' ||
      this.country === ' ' ||
      this.fName === ' ' ||
      this.mName === ' ' ||
      this.lName === ' '
    ) {
      this.setState({
        errFlag: 'Please make sure you enter all neccesary documents'
      });
      console.log('in');
      return;
    } else {
      try {
        console.log('in body  ');

        let data = this.state;
        delete data.current;
        delete data.loading;
        delete data.errFlag;
        await this.fileUpload(data.docproofupload, data.fName);
        await this.fileUpload(data.docupload, data.fName);
        await this.fileUpload(data.faceUpload, data.fName);
        data.docupload = data.docupload.name;
        data.faceUpload = data.faceUpload.name;
        data.docproofupload = data.docproofupload.name;
        const db = firebase.firestore();
        console.log(data);
        const ref = db.collection('issuer_complaince').doc();
        let res = await ref.set({ complaince_data: data });
        console.log(res);

        this.openNotificationWithIcon(
          'success',
          'data has been saved',
          `data has been saved`
        );
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

  async fileUpload(fileName, name) {
    const uploadTask = await storage
      .ref(`/issuer_complaince_images/${name}/${fileName.name}`)
      .put(fileName)
      .then(snapshot => {
        console.log(snapshot);
      });
  }

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
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Card>
        <br></br>
        <Card
          title={
            <Text style={{ fontSize: '20px', color: '#03396c' }}>
              Personal Information
            </Text>
          }
        >
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Full Name :
          </Text>
          <br></br>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              placeholder='First Name'
              onChange={e => this.setState({ fName: e.target.value })}
            />
            <Input
              placeholder='Middle Name'
              onChange={e => this.setState({ mName: e.target.value })}
            />
            <Input
              placeholder='Last Name'
              onChange={e => this.setState({ lName: e.target.value })}
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
            <Input
              placeholder='Street Address 2'
              onChange={e => this.setState({ pstreet2: e.target.value })}
            />
            <br></br>
            <br></br>
            <Row style={{ display: 'flex' }}>
              {' '}
              <Input
                placeholder='City '
                onChange={e => this.setState({ pcity: e.target.value })}
              />
              <br></br>
              <br></br>
              <Input
                placeholder='State '
                onChange={e => this.setState({ pstate: e.target.value })}
              />
            </Row>
            <br></br>
            <Row style={{ display: 'flex' }}>
              <Input
                type='number'
                placeholder='Postal/Zip Code'
                onChange={e => this.setState({ postal: e.target.value })}
              />

              <Select
                style={{ width: '102%' }}
                placeholder='please select a country'
                onChange={e => this.setState({ pcountry: e })}
              >
                {cArray.map(item => {
                  return (
                    <Option key={item} value={item}>
                      {item}
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
              <br></br>
              <Input
                add='*'
                placeholder='Street Address'
                onChange={e => this.setState({ perstreet: e.target.value })}
              />
              <br></br>
              <br></br>
              <Input
                add='*'
                placeholder='Street Address 2'
                onChange={e => this.setState({ perstreet2: e.target.value })}
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
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Row>
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
          <Row style={{ display: 'flex' }}>
            <Input
              type='number'
              add='*'
              placeholder='Area  Code'
              onChange={e => this.setState({ phone_area: e.target.value })}
            />
            -
            <Input
              type='number'
              add='*'
              placeholder='Phone Number'
              onChange={e => this.setState({ phone_num: e.target.value })}
            />
          </Row>
          <br></br>
          <Text style={{ float: 'left', fontWeight: 'bold' }}>
            * Email Address :
          </Text>
          <Input
            type='email'
            add='*'
            placeholder='Email Address '
            onChange={e => this.setState({ email: e.target.value })}
          />
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
            <Option key='Aadhar' value='Aadhar'>
              Aadhar
            </Option>
            <Option key='PAN Card' value='PAN Card'>
              PAN Card
            </Option>
            <Option key='Driving Liscense' value='Driving Liscense'>
              Driving Liscense
            </Option>
            <Option key='Passport' value='Passport'>
              Passport
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
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
          <br></br>
          <br></br>
          <Row>
            <Text style={{ float: 'left' }}>Upload Document :</Text>
            <Input
              type='file'
              onChange={e => {
                console.log(e.target.files[0]);
                this.setState({ docupload: e.target.files[0] });
              }}
            />
          </Row>

          <br></br>
          <Row>
            <Text style={{ float: 'left', fontWeight: 'bold' }}>
              * Proof of Address :
            </Text>
            <br></br>
            <Text style={{ float: 'left' }}>Upload Document :</Text>
            <Input
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
              onChange={e => {
                this.setState({ faceUpload: e.target.files[0] });
              }}
            />
          </Row>
          <Row>
            <Text>{this.errFlag}</Text>
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
              loading={this.loading}
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
