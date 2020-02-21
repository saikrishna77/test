/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Input,
  InputNumber,
  Card,
  Table,
  Select,
  Button,
  notification,
  Modal,
  Tooltip,
  Alert,
  Popconfirm,
  message
} from 'antd';
import firebase from '../../../../../utils/firebase';
import { withRouter } from 'react-router-dom';

const Vesting = props => {
  // console.log(props.TokenID);
  const [data, setData] = React.useState([]);
  const [setError, setSetError] = React.useState(false);
  const [vestingName, setVestingName] = React.useState();
  const [vestingMonths, setVestingMonths] = React.useState();
  const [totalVesting, setTotalVesting] = React.useState();
  const [displayVesting, setDisplayVesting] = React.useState();
  const [errMsg, setErrMsg] = React.useState('');
  const [setNextModal, setSetNextModal] = React.useState(false);
  const [scheduleNames, setScheduleNames] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editVestingNames, setEditVestingNames] = React.useState([]);
  const [editData, setEditData] = React.useState();

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
          console.log(snapshot.data().vestingSchedules);
          const arr = [];
          for (const key in snapshot.data().vestingSchedules) {
            arr.push(<Select.Option value={key}>{key}</Select.Option>);
          }
          console.log(arr);
          setEditVestingNames(arr);
          setEditData(snapshot.data().vestingSchedules);
        });
    }
  }, [props.location.search]);

  const onSubmit = () => {
    let flag = false;
    let lockFlag = false;
    data.forEach(e => {
      if (parseInt(e.vestPers) === 0) {
        flag = true;
      }
      if (parseInt(e.LockPeriod) <= 0) {
        lockFlag = true;
      }
    });
    let nameFlag = false;
    for (let i = 0; i < scheduleNames.length; i++) {
      if (scheduleNames[i].toString() === vestingName.toString()) {
        nameFlag = true;
      }
    }
    console.log(vestingName);
    console.log(new RegExp('^[~*/[]]*$').test(vestingName));
    if (data.length <= 0) {
      setErrMsg(`NO data to save!`);
      setSetError(true);
    } else if (lockFlag) {
      setErrMsg(`check the lock period for all entries.`);
      setSetError(true);
    } else if (nameFlag) {
      setErrMsg(`Dont use the same vesting name twice!`);
      setSetError(true);
    } else if (flag) {
      setErrMsg(`Theres a zero in the vesting percentage!`);
      setSetError(true);
    } else if (displayVesting > 100) {
      setErrMsg('The total vesting value extended 100%!');
      setSetError(true);
    } else if (displayVesting < 100) {
      setErrMsg('The toal vesting value is below 100%!');
      setSetError(true);
    } else if (!vestingName) {
      setErrMsg('Give the vesting a name!');
      setSetError(true);
    } else if (vestingName && vestingName.toString().length < 1) {
      setErrMsg('Give the vesting a name!');
      setSetError(true);
    } else if (
      vestingName.includes('~') ||
      vestingName.includes('*') ||
      vestingName.includes('/') ||
      vestingName.includes('[') ||
      vestingName.includes(']')
    ) {
      //'~', '*', '/', '[', or ']'
      setErrMsg(`vesting name Shound not contain ~ * / [ or ]`);
      setSetError(true);
    } else if (!vestingMonths) {
      setErrMsg(`vesting duration missing!`);
      setSetError(true);
    } else if (isNaN(displayVesting)) {
      setErrMsg(`Check all the vesting percentages are not filled!`);
      setSetError(true);
    } else if (data[data.length - 1].EOD !== vestingMonths) {
      setErrMsg('theres something wrong with the total end of vesting month!');
      setSetError(true);
    } else {
      setSetNextModal(true);
    }
  };

  const handleDeleteRow = key => {
    let tempdata = [...data];
    setDisplayVesting(displayVesting - tempdata[key - 1].vestPers);
    setData(tempdata.filter(item => item.key !== key));
  };

  const onChangeMonths = value => {
    let tempData = [
      {
        key: 1,
        name: '1st Vesting',
        FD: 'DivideEqually',
        EOD: 0,
        vestPers: 100,
        LockPeriod: 0
      }
    ];
    tempData[0].EOD = parseInt(value);
    if (value) setData(tempData);
    else setData([]);
    setVestingMonths(value);
    setTotalVesting(100);
    setDisplayVesting(100);
  };

  const onChangeEOD = (e, record) => {
    let tempData = [...data];
    tempData[record.key - 1].EOD = parseInt(e.target.value);
    // if (e.target.value < vestingMonths) {
    //   const newData = {
    //     key: data.length + 1,
    //     name: `${data.length + 1} Vesting`,
    //     FD: 'DivideEqually',
    //     EOD: parseInt(vestingMonths),
    //     vestPers: displayVesting < 100 ? 100 - displayVesting : 0,
    //     LockPeriod: 0
    //   };
    //   tempData.push(newData);
    // }
    // if (
    //   tempData[tempData.length - 1] &&
    //   tempData[tempData.length - 2] &&
    //   parseInt(tempData[tempData.length - 1].EOD) ===
    //     parseInt(tempData[tempData.length - 2].EOD)
    // ) {
    //   tempData.pop();
    //   setDisplayVesting(
    //     displayVesting - tempData[tempData.length - 1].vestPers
    //   );
    // }
    // for (let i = 2; i < tempData.length + 1; i++) {
    //   if (parseInt(tempData[i - 1].EOD) - 1 === parseInt(tempData[i - 2].EOD)) {
    //     tempData[i - 1].FD = 'Fixed';
    //   }
    // }
    setData(tempData);
  };

  const onChangeFD = (value, record) => {
    let tempData = [...data];
    tempData[record.key - 1].FD = value;
    setData(tempData);
  };

  const editVestingNameChange = e => {
    console.log(e);
    setData(editData[e].data);
    setVestingMonths(editData[e].totalVestingMonths);
    setVestingName(editData[e].vestingName);
  };

  const onChangeVestPres = (e, record) => {
    let tempData = data;
    let zeroFlag = false;
    tempData[record.key - 1].vestPers = parseInt(e.target.value);
    let totalPers = 0,
      tempVar = 0;
    tempData.forEach(ele => {
      if (ele.vestPers <= 0 || isNaN(ele.vestPers)) zeroFlag = true;
      totalPers += parseFloat(ele.vestPers);
    });
    tempVar = totalPers;
    if (
      totalPers < 100 &&
      !zeroFlag &&
      !(parseInt(tempData[tempData.length - 1].EOD) === parseInt(vestingMonths))
    ) {
      const newData = {
        key: data.length + 1,
        name: `${data.length + 1} Vesting`,
        FD: 'DivideEqually',
        EOD: vestingMonths,
        vestPers: parseInt(100 - totalPers),
        LockPeriod: 0
      };
      tempVar += 100 - totalPers;
      tempData.push(newData);
    }
    setData(tempData);
    setTotalVesting(totalPers);
    setDisplayVesting(tempVar);
  };

  const onChangeLockPeriod = (value, record) => {
    let tempData = [...data];
    tempData[record.key - 1].LockPeriod = parseInt(value);
    setData(tempData);
  };

  const clearToAddNewVest = () => {
    let temp = scheduleNames;
    temp.push(vestingName.toString());
    setScheduleNames(temp);
    setTotalVesting();
    setDisplayVesting();
    setVestingMonths();
    setVestingName();
    setData([]);
    setSetNextModal(false);
  };

  const DisplaySuccess = () => {
    Modal.confirm({
      title: 'Add another vesting schedule?',
      content:
        'Vesting schedule saved & Now you can choose to add another vesting schedule or you can go to the next section',
      okText: 'Next',
      cancelText: 'Add',
      okButtonProps: { loading: loading },
      cancelButtonProps: { loading: loading },
      onOk() {
        setSetNextModal(false);
        setLoading(true);
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const symbol = params.get('symbol');
        console.log(symbol);
        firebase.analytics();
        const db = firebase.firestore();
        db.collection('reservedTokenSymbols')
          .doc(symbol + '-' + localStorage.getItem('uid'))
          .update({
            ['vestingSchedules.' + vestingName]: {
              totalVestingMonths: vestingMonths,
              vestingName: vestingName,
              data: data
            }
          })
          .then(res => {
            notification.success({
              message: `Vesting Schedule Added`,
              description: `Your vesting schedule with name ${vestingName} has been saved`,
              placement: 'topRight'
            });
            setLoading(false);
            if (editMode) {
              props.NextTab('phase');
            } else {
              window.location.href =
                '/issuer/tokenCreation/roles?symbol=' + symbol + '&setVesting=true';
            }
          })
          .catch(err => {
            notification.error({
              message: 'saving failed',
              description: `Problem saving ${vestingName}`,
              placement: 'topRight'
            });
            setLoading(false);
          });
      },
      onCancel() {
        setLoading(true);
        console.log(data);
        console.log('vestingMonths: ' + vestingMonths);
        console.log('vestingName: ' + vestingName);
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
              ['vestingSchedules.' + vestingName]: {
                totalVestingMonths: vestingMonths,
                vestingName: vestingName,
                data: data
              }
            })
            .then(res => {
              notification.success({
                message: `Vesting Schedule Added`,
                description: `Your vesting schedule with name ${vestingName} has been saved`,
                placement: 'topRight'
              });
              setLoading(false);
              props.NextTab('phase');
            })
            .catch(err => {
              notification.error({
                message: 'saving failed',
                description: `Problem saving ${vestingName}`,
                placement: 'topRight'
              });
              setLoading(false);
            });
        } else {
          db.collection('reservedTokenSymbols')
            .doc(symbol + '-' + localStorage.getItem('uid'))
            .update({
              vestingSchedules: {
                [vestingName]: {
                  totalVestingMonths: vestingMonths,
                  vestingName: vestingName,
                  data: data
                }
              }
            })
            .then(res => {
              notification.success({
                message: `Vesting Schedule Added`,
                description: `Your vesting schedule with name ${vestingName} has been saved`,
                placement: 'topRight'
              });
              setLoading(false);
            })
            .catch(err => {
              notification.error({
                message: 'saving failed',
                description: `Problem saving ${vestingName}`,
                placement: 'topRight'
              });
              setLoading(false);
            });
        }
        clearToAddNewVest();
        console.log('Add');
      }
    });
  };

  const DisplayError = () => {
    Modal.error({
      title: 'Validation Failed',
      content: errMsg,
      onOk() {
        console.log('ok clicked');
        setSetError(false);
      }
    });
  };

  const columns = [
    {
      title: 'Vesting Schedule',
      dataIndex: 'name',
      key: 'name',
      render: text => {
        return <a>{text}</a>;
      }
    },
    {
      title: 'Fixed or Divide Equally',
      dataIndex: 'FD',
      key: 'FD',
      render: (text, record) => {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Select a type'
            optionFilterProp='children'
            value={
              data[record.key - 1] &&
              data[record.key - 2] &&
              parseInt(data[record.key - 1].EOD) - 1 ===
                parseInt(data[record.key - 2].EOD)
                ? 'Fixed'
                : text
            }
            onChange={e => onChangeFD(e, record)}
            disabled={
              data[record.key - 1] &&
              data[record.key - 2] &&
              parseInt(data[record.key - 1].EOD) - 1 ===
                parseInt(data[record.key - 2].EOD)
            }
          >
            <Select.Option value='Fixed'>Fixed</Select.Option>
            <Select.Option value='DivideEqually'>Divide Equally</Select.Option>
          </Select>
        );
      }
    },
    {
      title: 'End Of Vesting Month',
      dataIndex: 'EOD',
      key: 'EOD',
      render: (text, record) => {
        let start = 1,
          min = 1;
        if (record.key === 1) {
          start = 1;
          min = 1;
        } else {
          start = data[record.key - 2].EOD + 1;
          min = parseInt(start);
        }
        return (
          <>
            {record.FD === 'DivideEqually' &&
            parseInt(start) !== parseInt(record.EOD) ? (
              <>{start} - &ensp;</>
            ) : null}
            <InputNumber
              min={parseInt(min)}
              max={vestingMonths}
              onBlur={e => onChangeEOD(e, record)}
              style={{ width: '60px' }}
              value={text}
            />
          </>
        );
      }
    },
    {
      title: 'Vesting %',
      key: 'vestPers',
      dataIndex: 'vestPers',
      render: (text, record) => {
        return (
          <InputNumber onBlur={e => onChangeVestPres(e, record)} value={text} />
        );
      }
    },
    {
      title: 'Lock Period (months)',
      key: 'LockPeriod',
      dataIndex: 'LockPeriod',
      render: (text, record) => {
        return (
          <InputNumber
            onChange={e => onChangeLockPeriod(e, record)}
            value={text}
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

  const handleAdd = () => {
    const newData = {
      key: data.length + 1,
      name: `${data.length + 1} Vesting`,
      FD: 'DivideEqually',
      EOD: vestingMonths,
      vestPers: 0,
      LockPeriod: 0
    };
    let tempData = [...data];
    if (data.length > 0 && vestingMonths <= data[data.length - 1].EOD) {
      message.error(
        'total vesting months already fullfilled, change end of vesting period to add more rows'
      );
    } else if (!vestingMonths) {
      message.error('first enter total duration of vesting to add row');
    } else {
      tempData.push(newData);
      setData(tempData);
    }
  };

  const handleNextPhase = () => {
    props.NextTab('phase');
  };

  return (
    <div>
      {setError ? DisplayError() : null}
      {setNextModal ? DisplaySuccess() : null}
      {editMode ? (
        <>
          <b>Select a vesting to edit</b>
          <Select style={{ width: '190px' }} onChange={editVestingNameChange}>
            {editVestingNames}
          </Select>
          <br />
        </>
      ) : null}
      <b>* Enter the Name for Vesting Schedule</b>
      <br />
      <Input
        placeholder='name'
        value={vestingName}
        onChange={e => {
          setVestingName(e.target.value);
        }}
        style={{ width: '40%', textAlign: 'center' }}
      />
      <Card style={{ marginTop: '2%' }}>
        <b>* Enter Total Duration for Vesting:</b>{' '}
        <InputNumber
          placeholder='months'
          value={vestingMonths}
          onChange={onChangeMonths}
        />{' '}
        Months
        <br />
        <div style={{ textAlign: 'left' }}>
          {vestingMonths <= 0 ? (
            <>
              <div style={{ margin: '2%', textAlign: 'center' }}>
                <Alert
                  message='Enter total duration for vesting to be able to edit '
                  type='warning'
                />
              </div>
              <Tooltip placement='top' title={'Add number of months first'}>
                <Button
                  onClick={handleAdd}
                  type='primary'
                  disabled={vestingMonths <= 0}
                  style={{ marginBottom: 2 }}
                >
                  Add a row
                </Button>
              </Tooltip>
            </>
          ) : (
            <Button
              onClick={handleAdd}
              type='primary'
              style={{ marginBottom: 2 }}
            >
              Add a row
            </Button>
          )}
        </div>
        <Table
          tableLayout='auto'
          columns={columns}
          dataSource={data}
          style={{ marginTop: '2%' }}
          pagination={false}
        />
        <div style={{ marginTop: '20px' }}>
          {displayVesting > 100 ? (
            <div style={{ color: 'red' }}>
              The total vesting percentage exceded 100% fix that.
            </div>
          ) : (
            ''
          )}
          <b>Total Percent Vesting: {displayVesting}%</b>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' onClick={onSubmit} loading={loading}>
            Save the Vesting Schedule
          </Button>
          {scheduleNames.length > 0 || editMode ? (
            <Button
              type='primary'
              onClick={handleNextPhase}
              style={{ marginLeft: '30px' }}
            >
              Next
            </Button>
          ) : (
            <Tooltip title='Add atleast one to go to next page'>
              <Button type='primary' disabled style={{ marginLeft: '30px' }}>
                Next
              </Button>
            </Tooltip>
          )}
        </div>
      </Card>
    </div>
  );
};

export default withRouter(Vesting);
