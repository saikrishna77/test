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
  Alert
} from 'antd';
import axios from 'axios';
import api_url from '../../api_url';

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

  const onSubmit = () => {
    let flag = false;
    data.forEach(e => {
      if (parseInt(e.vestPers) === 0) {
        flag = true;
      }
    });
    let nameFlag = false;
    for (let i = 0; i < scheduleNames.length; i++) {
      if (scheduleNames[i].toString() === vestingName.toString()) {
        nameFlag = true;
      }
    }
    if (nameFlag) {
      setErrMsg(`Dont use the same vesting name twice bro!`);
      setSetError(true);
    } else if (flag) {
      setErrMsg(`Theres a zero in the vesting percentage, pooh!`);
      setSetError(true);
    } else if (displayVesting > 100) {
      setErrMsg('The total vesting value extended 100%, puh-leeze check nah!');
      setSetError(true);
    } else if (displayVesting < 100) {
      setErrMsg('The toal vesting value is below 100%, puh-leeze check nah!');
      setSetError(true);
    } else if (!vestingName) {
      setErrMsg('Give the vesting a name, dugh!');
      setSetError(true);
    } else if (!vestingMonths) {
      setErrMsg(`Don't your vesting have a duration, dugh!`);
      setSetError(true);
    } else if (isNaN(displayVesting)) {
      setErrMsg(
        `Check all the vesting percentages are entered, puh-leeze check nah!`
      );
      setSetError(true);
    } else if (data[data.length - 1].EOD !== vestingMonths) {
      setErrMsg(
        'theres something wrong with the total end of vesting month, puh-leeze check nah!'
      );
    } else {
      setSetNextModal(true);
    }
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
    if (e.target.value < vestingMonths) {
      const newData = {
        key: data.length + 1,
        name: `${data.length + 1} Vesting`,
        FD: 'DivideEqually',
        EOD: parseInt(vestingMonths),
        vestPers: 0,
        LockPeriod: 0
      };
      tempData.push(newData);
    }
    if (
      tempData[tempData.length - 1] &&
      tempData[tempData.length - 2] &&
      parseInt(tempData[tempData.length - 1].EOD) ===
        parseInt(tempData[tempData.length - 2].EOD)
    ) {
      tempData.pop();
    }
    setData(tempData);
  };

  const onChangeFD = (value, record) => {
    let tempData = [...data];
    tempData[record.key - 1].FD = value;
    setData(tempData);
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
    if (totalPers < 100 && !zeroFlag) {
      const newData = {
        key: data.length + 1,
        name: `${data.length + 1} Vesting`,
        FD: 'DivideEqually',
        EOD: 0,
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
        const payload = {
          totalVestingMonths: vestingMonths,
          vestingName: vestingName.toString().replace(/ +/g, ''),
          firebaseTokenID: props.TokenID,
          data: data
        };
        axios
          .post(api_url + 'vestingSchedule', payload)
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
      },
      onCancel() {
        setLoading(true);
        console.log(data);
        console.log('vestingMonths: ' + vestingMonths);
        console.log('vestingName: ' + vestingName);
        const payload = {
          totalVestingMonths: vestingMonths,
          vestingName: vestingName.toString().replace(/ +/g, ''),
          firebaseTokenID: props.TokenID,
          data: data
        };
        axios
          .post(api_url + 'vestingSchedule', payload)
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
            placeholder='Select a person'
            optionFilterProp='children'
            value={text}
            onChange={e => onChangeFD(e, record)}
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
          start = data[record.key - 2].EOD;
          min = parseInt(start) + 1;
        }
        return (
          <>
            {record.FD === 'DivideEqually' ? <>{start} - &ensp;</> : null}
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
            onChange={() => onChangeLockPeriod(record)}
            value={text}
          />
        );
      }
    }
  ];

  const handleAdd = () => {
    const newData = {
      key: data.length + 1,
      name: `${data.length + 1} Vesting`,
      FD: 'DivideEqually',
      EOD: 0,
      vestPers: 0,
      LockPeriod: 0
    };
    let tempData = [...data];
    tempData.push(newData);
    setData(tempData);
  };

  const handleDelete = () => {
    let tempData = [...data];
    const x = tempData.pop();
    setDisplayVesting(displayVesting - x.vestPers);
    setData(tempData);
  };

  const handleNextPhase = () => {
    props.NextTab('phase');
  };

  return (
    <div>
      {setError ? DisplayError() : null}
      {setNextModal ? DisplaySuccess() : null}
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
          <Button
            onClick={handleDelete}
            type='primary'
            disabled={data.length <= 1}
            style={{ marginBottom: 2, marginLeft: 8 }}
          >
            Delete row
          </Button>
        </div>
        <Table
          tableLayout='auto'
          columns={columns}
          dataSource={data}
          style={{ marginTop: '2%' }}
          pagination={false}
        />
        <div style={{ marginTop: '20px' }}>
          <b>Total Percent Vesting: {displayVesting}%</b>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' onClick={onSubmit} loading={loading}>
            Save the Vesting Schedule
          </Button>
          {scheduleNames.length > 0 ? (
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

export default Vesting;
