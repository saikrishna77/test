import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/firebase';

import {
  Upload,
  Icon,
  Form,
  Input,
  Button,
  Select,
  Row,
  Card,
  Typography,
  DatePicker,
  Radio,
  Modal,
  InputNumber
} from 'antd';
import axios from 'axios';
const storage = firebase.storage();
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const Registration = props => {
  const [infoFlag, setInfoFlag] = useState(true);
  const [infoFlag2, setInfoFlag2] = useState(true);
  const [infoFlag3, setInfoFlag3] = useState(true);
  const [createFlag, setCreateFlag] = useState(false);
  const [zipFlag, setZipFlag] = useState(false);
  // const nodemailer = require('nodemailer');

  let [regulationFlag, setregulationFlag] = useState(false);

  //images
  const [company_reg_uploads, setcomapnay_reg_uploads] = useState('');
  const [tax_reg_uploads, settax_reg_uploads] = useState('');
  const [board_res_uploads, setboard_res_uploads] = useState('');
  const [sec_filing_doc, setsec_filing_doc] = useState('');

  //

  //inputs
  const [ComapanyName, setComapanyName] = useState('');
  const [zipCode, setzipCode] = useState();
  const [date, setDate] = useState('');
  const [taxID, settaxID] = useState('');
  const [radio, setradio] = useState('');
  const [text_area, settext_area] = useState('');
  const [text_board, settext_board] = useState('');
  const [ComapanyIssue, setComapanyIssue] = useState('');
  const [Regulation, setRegulation] = useState();
  const [issuer_radio, setissuer_radio] = useState();

  //

  //selects
  const [country, setCountry] = useState('');
  const [state, setStates] = useState('');
  //
  const [visible, setvisible] = useState(false);

  const showModal = () => {
    setvisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setvisible(false);
  };

  const handleCancel = e => {
    console.log(e);

    setvisible(false);
  };
  // Uncomment when merged
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(async function(user) {
  //     if (user) {
  //       if (user.emailVerified) {
  //         const db = firebase.firestore();
  //         const doc = await db
  //           .collection('users')
  //           .doc(user.uid)
  //           .get();
  //         if (!doc.exists) {
  //           console.log('No such document!');
  //         } else {
  //           console.log(window.location.pathname);
  //           if (window.location.pathname === '/') {
  //             // if (doc.data().role === 'issuer') {
  //             if (false) {
  //               props.history.push('/issuer/tokens');
  //             } else {
  //               props.history.push('/admin/issuerSuperAdmins');
  //             }
  //           } else {
  //             props.history.push(
  //               window.location.pathname + props.location.search
  //             );
  //           }
  //           console.log('Document data:', doc.data());
  //         }
  //       }
  //     } else {
  //       props.history.push('/login');
  //     }
  //   });
  // }, []);

  const onChangeHandler = (e, name) => {
    if (name === 'ComapanyName') {
      setComapanyName(e.target.value);
    }
    //images
    else if (name === 'company_reg_uploads') {
      const image = e.target.files[0];
      setcomapnay_reg_uploads(image);
    } else if (name === 'tax_reg_uploads') {
      const image = e.target.files[0];
      settax_reg_uploads(image);
    } else if (name === 'board_res_uploads') {
      const image = e.target.files[0];
      setboard_res_uploads(image);
    } else if (name === 'sec_filing_doc') {
      const image = e.target.files[0];
      setsec_filing_doc(image);
      //radios
    } else if (name === 'radio') {
      setradio(e.target.value);
      if (e.target.value === 'Create') {
        setCreateFlag(true);
      } else {
        setCreateFlag(false);
      }
      console.log(e.target.value);
      //
    } else if (name === 'country') {
      setCountry(e);
    } else if (name === 'state') {
      setStates(e);
      //
    } else if (name === 'zipCode') {
      let value = e.target.value;
      console.log(e.target.value);
      if (value > 9999 && value < 9999999) {
        setZipFlag(true);
      } else {
        setZipFlag(false);
      }
      setzipCode(e.target.value);
    } else if (name === 'date') {
      setDate(e.format('DD-MM-YYYY'));
    } else if (name === 'taxID') {
      settaxID(e.target.value);
    } else if (name === 'date') {
      setDate(e.target.value);
    } else if (name === 'text_area') {
      settext_area(e.target.value);
    } else if (name === 'text_board') {
      settext_board(e.target.value);
    } else if (name === 'ComapanyIssue') {
      setComapanyIssue(e.target.value);
    } else if (name === 'regulation') {
      setRegulation(e.target.value);
      setregulationFlag(true);
    } else if (name === 'issuer_radio') {
      setissuer_radio(e.target.value);
    }
  };

  // async function mailer() {
  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: 'KrishnaS@CryptoAssetRating.com',
  //       pass: 'CCAPisgr8'
  //     }
  //   });

  //   let info = await transporter.sendMail({
  //     from: 'KrishnaS@CryptoAssetRating.com',
  //     to: 'samalakrishna7@gmail.com',
  //     subject: 'Issuer Registration Reminder',
  //     text: 'saikrishna has requested for details',
  //     html: '<b>Issuer Reminder</b>'
  //   });

  //   console.log('Message sent: %s', info.messageId);

  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // }
  const save_boardData = async () => {
    console.log(
      company_reg_uploads,
      tax_reg_uploads,
      sec_filing_doc,
      board_res_uploads
    );
    const form = new FormData();
    form.set('companyName', ComapanyName);
    form.set('country', country);
    form.set('state', state);
    form.set('zipCode', zipCode);
    form.set('taxID', taxID);
    form.set('company_reg_uploads', company_reg_uploads);
    await fileUpload(company_reg_uploads);
    form.set('tax_reg_uploads', tax_reg_uploads);
    await fileUpload(tax_reg_uploads);
    form.set('radio', radio);
    if (radio === 'upload') {
      form.set('board_res_uploads', board_res_uploads);
      await fileUpload(board_res_uploads);
    } else {
      form.set('text_area', text_area);
      form.set('text_board', text_board);
    }
    form.set('ComapanyIssue', ComapanyIssue);
    form.set('Regulation', Regulation);
    form.set('issuer_radio', issuer_radio);
    form.set('sec_filing_doc', sec_filing_doc);
    await fileUpload(sec_filing_doc);

    firebase.analytics();
    const db = firebase.firestore();
    const ref = db.collection('issuer_register').doc();
    let res = await ref.set(form);
    console.log(res);
    // await mailer();
  };

  const fileUpload = fileName => {
    const uploadTask = storage
      .ref(`/issuer_registration_images/${fileName.name}`)
      .put(fileName);
    uploadTask.on(
      'state_changed',
      snapShot => {
        console.log(snapShot);
      },
      err => {
        console.log(err);
      },
      url => {
        console.log(url);
      }
    );
  };

  return (
    <>
      <div
        style={{
          color: '#186AB4',
          fontSize: '40px',
          padding: '2%',
          width: '80vw'
        }}
      >
        <Text>Issuer Registration</Text>
        <br></br>
      </div>{' '}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form style={{ width: '50vw' }}>
          <Card
            onClick={() => {
              setInfoFlag(!infoFlag);
            }}
          >
            <div>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon
                  size='large'
                  style={{ height: '5px', width: '10px' }}
                  type='plus'
                ></Icon>
                <Text
                  style={{
                    marginLeft: '20px',
                    fontSize: '30px',
                    color: '#186AB4'
                  }}
                >
                  ISSUER INFO
                </Text>
              </Row>
              <br></br>
            </div>
          </Card>
          <Card hidden={infoFlag}>
            <Card>
              <Form.Item label={`* Comapany Name Issuing Tokens`}>
                <Input
                  size='large'
                  id='ComapanyName'
                  value={ComapanyName}
                  placeholder='Enter Company Name'
                  onChange={e => onChangeHandler(e, 'ComapanyName')}
                  type='text'
                  required
                />
              </Form.Item>
              <Form.Item label='* Company Registered Country'>
                <Select
                  showSearch
                  id='country'
                  value={country}
                  onChange={e => {
                    onChangeHandler(e, 'country');
                  }}
                  defaultValue='please select a country'
                  style={{ width: '100%' }}
                >
                  <Option key='India'>India</Option>
                  <Option key='Afghanistan'>Afghanistan</Option>
                  <Option key='Bangladesh'> Bangladesh</Option>
                </Select>
              </Form.Item>
              <Form.Item label='* Company Registered State'>
                <Select
                  showSearch
                  id='state'
                  value={state}
                  onChange={e => {
                    onChangeHandler(e, 'state');
                  }}
                  defaultValue='please select a state'
                  style={{ width: '100%' }}
                >
                  <Option key='TG'>TG</Option>
                  <Option key='AP'>AP</Option>
                  <Option key='MP'> MP</Option>
                </Select>
              </Form.Item>
              <Form.Item label='* Zip Code'>
                <Input
                  id='zipCode'
                  type='number'
                  placeholder='Enter Zip Code'
                  onChange={e => onChangeHandler(e, 'zipCode')}
                  required
                ></Input>
                <br></br>
                {zipFlag ? (
                  <Text style={{ color: 'red' }}>
                    please make sure you enter a valid zipcode
                  </Text>
                ) : (
                  ''
                )}
              </Form.Item>
              <Form.Item label='* Date of Incorporate'>
                <DatePicker
                  format='DD-MM-YYYY'
                  id='date'
                  onChange={e => {
                    onChangeHandler(e, 'date');
                  }}
                />
              </Form.Item>
              <Form.Item label='* Government Tax ID Number'>
                <Input
                  value={taxID}
                  size='large'
                  id='taxID'
                  type='text'
                  placeholder='Enter Government Tax ID'
                  onChange={e => onChangeHandler(e, 'taxID')}
                  required
                />
              </Form.Item>
              Upload Documents ( upload only png files ){' '}
              <Form.Item>
                <Text>Comapany Registration Document</Text>
                <br></br>
                <Input
                  type='file'
                  id='company_reg_uploads'
                  onChange={e => {
                    onChangeHandler(e, 'company_reg_uploads');
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Text>Tax Number Registration Document</Text>
                <br></br>
                <Input
                  type='file'
                  id='tax-reg-doc'
                  onChange={e => {
                    onChangeHandler(e, 'tax-reg-uploads');
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Text>Board Resolution ontoken Creation</Text>
                <Row>
                  <Radio.Group
                    value={radio}
                    defaultValue='Upload'
                    onChange={e => onChangeHandler(e, 'radio')}
                  >
                    <Radio value={'Upload'}>Upload</Radio>
                    <Radio value={'Create'}>Create</Radio>
                  </Radio.Group>
                </Row>{' '}
              </Form.Item>
              {createFlag ? (
                <div>
                  <Form.Item>
                    <TextArea
                      value={text_area}
                      id='text_area'
                      placeholder='Text Area message'
                      allowClear
                      onChange={e => onChangeHandler(e, 'text_area')}
                    />
                    <TextArea
                      value={text_board}
                      id='text_board'
                      placeholder='<Board member Names><Board member email addresses'
                      allowClear
                      onChange={e => onChangeHandler(e, 'text_board')}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button type='danger'>Cancel</Button>
                      <Button
                        onClick={e => save_boardData()}
                        style={{ marginLeft: '10px' }}
                        type='primary'
                      >
                        Save
                      </Button>
                    </div>
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <Form.Item>
                    <Input
                      id='board_res_uploads'
                      type='file'
                      onChange={e => {
                        onChangeHandler(e, 'board_res_uploads');
                      }}
                    />
                  </Form.Item>
                </div>
              )}
              {/* <img height='50%' width='50%' alt={} src={}></img> */}
              <br></br>
            </Card>
          </Card>
        </Form>
      </div>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form style={{ width: '50vw' }}>
          <Card
            onClick={() => {
              setInfoFlag2(!infoFlag2);
            }}
          >
            <div>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon
                  size='large'
                  style={{ height: '5px', width: '10px' }}
                  type='plus'
                ></Icon>
                <Text
                  style={{
                    marginLeft: '20px',
                    fontSize: '30px',
                    color: '#186AB4'
                  }}
                >
                  ISSUER ADDITIONAL INFO
                </Text>
              </Row>
              <br></br>
            </div>
          </Card>
          <Card hidden={infoFlag2}>
            <Card>
              <Form.Item label={`* Comapany Name Issuing Tokens`}>
                <Input
                  value={ComapanyIssue}
                  size='large'
                  id='ComapanyIssue'
                  placeholder='Enter Comapany Name Issuing Tokens'
                  onChange={e => onChangeHandler(e, 'ComapanyIssue')}
                  type='text'
                  required
                />
              </Form.Item>
              <br></br>
            </Card>
          </Card>
        </Form>
      </div>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form style={{ width: '50vw' }}>
          <Card
            onClick={() => {
              setInfoFlag3(!infoFlag3);
            }}
          >
            <div>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon
                  size='large'
                  style={{ height: '5px', width: '10px' }}
                  type='plus'
                ></Icon>
                <Text
                  style={{
                    marginLeft: '20px',
                    fontSize: '30px',
                    color: '#186AB4'
                  }}
                >
                  LEGAL INFO
                </Text>
              </Row>
              <br></br>
            </div>
          </Card>
          <Card hidden={infoFlag3}>
            <Card>
              <Form.Item>
                <Text>Regulation</Text>
                <Row>
                  <Radio.Group onChange={e => onChangeHandler(e, 'regulation')}>
                    <Radio value={'Regulation-D'}>Regulation-D</Radio>

                    <Radio value={'Regulation-F'}>Regulation-F</Radio>
                    <Radio value={'Regulation-CF'}>Regulation-CF</Radio>
                  </Radio.Group>
                  <br></br>
                  {regulationFlag ? (
                    <div>
                      <Text>
                        Issuser filed for {Regulation} excemption with SEC
                      </Text>
                      <Radio.Group
                        id='issuer_radio'
                        style={{ marginRight: '3px' }}
                        onChange={e => onChangeHandler(e, 'issuer_radio')}
                      >
                        <Radio value={'Yes'}>Yes</Radio>
                        <Radio value={'No'}>No</Radio>
                        <br></br>
                      </Radio.Group>
                      <Form.Item>
                        <Text style={{ marginRight: '2px' }}>
                          SEC filing Document(Optional)
                        </Text>
                        <br></br>
                        <Input
                          id='sec_filing_doc'
                          type='file'
                          onChange={e => {
                            onChangeHandler(e, 'sec_filing_doc');
                          }}
                        />
                      </Form.Item>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Row>{' '}
              </Form.Item>
              <br></br>
            </Card>
          </Card>
        </Form>
      </div>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type='danger'>Cancel</Button>
        <div>
          <Button type='primary' onClick={e => showModal(e)}>
            Preview
          </Button>
          <Modal
            title='Preview'
            visible={visible}
            onOk={e => handleOk(e)}
            onCancel={e => handleCancel(e)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
              }}
            >
              <Text style={{ fontSize: '20px' }}>Issuer Info</Text>
              <Text>ComapanyName : {ComapanyName}</Text>
              <Text>Country :{country}</Text>
              <Text>Zip Code : {zipCode}</Text>
              <Text>State :{state}</Text>
              <Text>Date of Incorporate : {date}</Text>
              <Text>Government Tax ID Number:{taxID}</Text>
              <Text>
                Comapany Registration Document :{company_reg_uploads.name}
              </Text>
              <Text>
                Tax Number Registration Document :{tax_reg_uploads.name}
              </Text>
              <Text>Board Resolution ontoken Creation : {radio}</Text>
              {radio === 'Upload' ? (
                <Text>Upload Document :{board_res_uploads.name}</Text>
              ) : (
                <>
                  <Text>Text-Area : {text_area}</Text>

                  <Text>Board members List : {text_board}</Text>
                </>
              )}{' '}
              <br></br>
              <Text style={{ fontSize: '20px' }}>ISSUER ADDITIONAL INFO</Text>
              <Text>Comapny Name Issuing Tokens</Text>
              <br></br>
              <Text style={{ fontSize: '20px' }}>LEGAL INFO</Text>
              <Text>Regulation : {Regulation}</Text>
              <Text>
                Issuser filed for Regulation-CF excemption with SEC:{' '}
                {issuer_radio}
              </Text>
              <Text>SEC filing Document(Optional) :{sec_filing_doc.name}</Text>
              <Text></Text>
            </div>
          </Modal>
        </div>

        <Button
          style={{ marginLeft: '10px' }}
          type='primary'
          onClick={e => {
            save_boardData(e);
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default withRouter(Registration);
