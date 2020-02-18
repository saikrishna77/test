import React, { useState } from 'react';
import {
  Input,
  DatePicker,
  Table,
  InputNumber,
  Button,
  Popconfirm,
  Modal,
  message,
  Select,
  notification
} from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import firebase from '../../../../../utils/firebase';

const Phase = props => {
  const [setNextModal, setSetNextModal] = useState(false);
  const [phaseName, setPhaseName] = useState('');
  const [phaseStartDate, setPhaseStartDate] = useState();
  const [phaseEndDate, setPhaseEndDate] = useState();
  const [editMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState();
  const [editPhaseNames, setEditPhaseNames] = React.useState();
  const [data, setData] = useState([
    {
      key: '1',
      investmentAmount: 1000,
      bonus: 32
    }
  ]);

  React.useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    if (params.get('edit')) {
      setEditMode(true);
      firebase.analytics();
      const db = firebase.firestore();
      db.collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .get()
        .then(snapshot => {
          console.log(snapshot.data().phase);
          const arr = [];
          for (const key in snapshot.data().phase) {
            arr.push(<Select.Option value={key}>{key}</Select.Option>);
          }
          console.log(arr);
          setEditPhaseNames(arr);
          setEditData(snapshot.data().phase);
        });
    }
  }, [props.location.search]);

  const DisplayModal = () => {
    Modal.confirm({
      title: 'Add another phase?',
      content:
        'phase saved & Now you can choose to add another phase or you can go to the next section',
      okText: 'Next',
      cancelText: 'Add',
      // okButtonProps: { loading: loading },
      // cancelButtonProps: { loading: loading },
      onOk() {
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const symbol = params.get('symbol');
        console.log(symbol);
        firebase.analytics();
        const db = firebase.firestore();
        db.collection('reservedTokenSymbols')
          .doc(symbol + '-' + localStorage.getItem('uid'))
          .update({
            ['phase.' + phaseName]: {
              phaseStartDate: phaseStartDate.unix(),
              phaseEndDate: phaseEndDate.unix(),
              data: data,
              phaseNmae: phaseName
            }
          })
          .then(res => {
            notification.success({
              message: `Phase Added`,
              description: `Your phase with name ${phaseName} has been saved`,
              placement: 'topRight'
            });
            setSetNextModal(false);
            window.location.href = '/tokenDeploy?symbol=' + symbol;
          })
          .catch(err => {
            setSetNextModal(false);
            notification.error({
              message: 'saving failed',
              description: `Problem saving ${phaseName}`,
              placement: 'topRight'
            });
          });
      },
      onCancel() {
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const symbol = params.get('symbol');
        console.log(symbol);
        firebase.analytics();
        const db = firebase.firestore();
        if (editMode) {
          db.collection('reservedTokenSymbols')
            .doc(symbol + '-' + localStorage.getItem('uid'))
            .update({
              ['phase.' + phaseName]: {
                phaseStartDate: phaseStartDate.unix(),
                phaseEndDate: phaseEndDate.unix(),
                data: data,
                phaseNmae: phaseName
              }
            })
            .then(res => {
              notification.success({
                message: `Phase Added`,
                description: `Your Phase with name ${phaseName} has been saved`,
                placement: 'topRight'
              });
              props.NextTab('phase');
            })
            .catch(err => {
              notification.error({
                message: 'saving failed',
                description: `Problem saving ${phaseName}`,
                placement: 'topRight'
              });
            });
        } else {
          db.collection('reservedTokenSymbols')
            .doc(symbol + '-' + localStorage.getItem('uid'))
            .update({
              phase: {
                [phaseName]: {
                  phaseStartDate: phaseStartDate.unix(),
                  phaseEndDate: phaseEndDate.unix(),
                  data: data,
                  phaseNmae: phaseName
                }
              }
            })
            .then(res => {
              notification.success({
                message: `Phase Added`,
                description: `Your phase with name ${phaseName} has been saved`,
                placement: 'topRight'
              });
            })
            .catch(err => {
              notification.error({
                message: 'saving failed',
                description: `Problem saving ${phaseName}`,
                placement: 'topRight'
              });
            });
        }
        setSetNextModal(false);
        resetFields();
      }
    });
  };

  const resetFields = () => {
    setPhaseName();
    setPhaseEndDate();
    setPhaseStartDate();
    setData([
      {
        key: '1',
        investmentAmount: 1000,
        bonus: 32
      }
    ]);
  };

  const nameChangeHandle = e => {
    setPhaseName(e.target.value);
  };

  const startDateHandle = value => {
    setPhaseStartDate(value);
  };

  const endDateHandle = value => {
    setPhaseEndDate(value);
  };

  const InvAmtTableDataChange = (val, record) => {
    setData(
      data.map(e => {
        if (e.key === record.key) {
          e.investmentAmount = val;
        }
        return e;
      })
    );
  };

  const BonusTableDataChange = (val, record) => {
    setData(
      data.map(e => {
        if (e.key === record.key) {
          e.bonus = val;
        }
        return e;
      })
    );
  };

  const columns = [
    {
      title: 'Minimum Investment Amount',
      dataIndex: 'investmentAmount',
      key: 'investmentAmount',
      render: (value, record) => {
        return (
          <InputNumber
            value={value}
            onChange={e => InvAmtTableDataChange(e, record)}
          />
        );
      }
    },
    {
      title: '% Bonus',
      dataIndex: 'bonus',
      key: 'bonus',
      render: (value, record) => {
        return (
          <InputNumber
            value={value}
            onChange={e => BonusTableDataChange(e, record)}
            max={100}
          />
        );
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDeleteRow(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];

  const handleDeleteRow = key => {
    let tempdata = [...data];
    setData(tempdata.filter(item => item.key !== key));
  };

  const addRow = () => {
    setData([
      ...data,
      {
        key: data.length + 1,
        investmentAmount: 0,
        bonus: 0
      }
    ]);
  };

  const onSubmit = () => {
    let zeroFlag = false;

    data.forEach(e => {
      if (e.bonus <= 0 || e.investmentAmount <= 0) {
        zeroFlag = true;
      }
    });

    if (!phaseName) {
      message.error(`phase name missing`);
    } else if (
      phaseName.includes('~') ||
      phaseName.includes('*') ||
      phaseName.includes('/') ||
      phaseName.includes('[') ||
      phaseName.includes(']')
    ) {
      //'~', '*', '/', '[', or ']'
      message.error(`vesting name Shound not contain ~ * / [ or ]`);
    } else if (!phaseStartDate) {
      message.error('phase start date missing');
    } else if (!phaseEndDate) {
      message.error('phase end date missing');
    } else if (zeroFlag) {
      message.error('there is a zero in the table');
    } else {
      setSetNextModal(true);
    }
  };

  const editPhaseNameChange = e => {
    console.log(e);
    setData(editData[e].data);
    setPhaseName(editData[e].phaseName);
    setPhaseStartDate(editData[e].phaseStartDate);
    setPhaseEndDate(editData[e].phaseEndDate);
  };

  return (
    <>
      {setNextModal ? DisplayModal() : null}
      {/* {editMode ? (
        <>
          <b>Select a phase to edit</b>
          <Select style={{ width: '190px' }} onChange={editPhaseNameChange}>
            {editPhaseNames}
          </Select>
          <br />
        </>
      ) : null} */}
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          Enter the name of the phase:
          <div style={{ width: '200px' }}>
            <Input value={phaseName} onChange={nameChangeHandle} />
          </div>
        </div>
        <div>
          Start date of the phase:
          <DatePicker
            onChange={startDateHandle}
            // value={moment.unix(phaseStartDate).format('DD/MM/YYYY')}
            // format='DD/MM/YYYY'
            style={{ marginLeft: '10px', marginTop: '10px' }}
          />
        </div>
        <div>
          End date of the phase:
          <DatePicker
            // value={moment.unix(phaseEndDate).format('DD/MM/YYYY')}
            // format='DD/MM/YYYY'
            onChange={endDateHandle}
            style={{ marginLeft: '10px', marginTop: '10px' }}
          />
        </div>
        <br />
        <div>Offer Bonus</div>
        <Button onClick={addRow} style={{ marginLeft: 0 }}>
          Add Row
        </Button>
        <Table
          style={{ width: '60%', margin: 'auto' }}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        <div
          style={{
            textAlign: 'right',
            marginRight: '120px',
            marginTop: '50px'
          }}
        >
          <Button type={'primary'} onClick={onSubmit}>
            Submit Phase
          </Button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Phase);
