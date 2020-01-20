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

const Vesting = props => {
  const [data, setData] = React.useState([]);
  const [setError, setSetError] = React.useState(false);
  const [vestingName, setVestingName] = React.useState();
  const [vestingMonths, setVestingMonths] = React.useState();
  const [totalVesting, setTotalVesting] = React.useState();
  const [displayVesting, setDisplayVesting] = React.useState();
  const [errMsg, setErrMsg] = React.useState('');
  const [setNextModal, setSetNextModal] = React.useState(false);

  const onSubmit = () => {
    if (displayVesting > 100) {
      setErrMsg('The total vesting value extended 100%');
      setSetError(true);
    } else if (displayVesting < 100) {
      setErrMsg('The toal vesting value is below 100%');
      setSetError(true);
    } else if (!vestingName) {
      setErrMsg('Give the vesting a name, dugh!');
      setSetError(true);
    } else if (!vestingMonths) {
      setErrMsg(`Don't your vesting have a duration, puh-leeze!`);
      setSetError(true);
    } else if (isNaN(displayVesting)) {
      setErrMsg(`Check all the vesting percentages are entered, pooh!`);
      setSetError(true);
    } else {
      setSetNextModal(true);
      // notification.info({
      //   message: `Pending`,
      //   description: 'Integration and verification pending',
      //   placement: 'topRight'
      // });
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
    tempData[0].EOD = value;
    if (value) setData(tempData);
    else setData([]);
    setVestingMonths(value);
    setTotalVesting(100);
    setDisplayVesting(100);
  };

  const onChangeEOD = (value, record) => {
    let tempData = [...data];
    tempData[record.key - 1].EOD = value;
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
    tempData[record.key - 1].vestPers = e.target.value;
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
        vestPers: 100 - totalPers,
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
    tempData[record.key - 1].LockPeriod = value;
    setData(tempData);
  };

  const clearToAddNewVest = () => {
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
      onOk() {
        setSetNextModal(false);
        props.NextTab('phase');
        console.log('Next');
      },
      onCancel() {
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
          min = start + 1;
        }
        return (
          <>
            {record.FD === 'DivideEqually' ? <>{start} - &ensp;</> : null}
            <InputNumber
              min={min}
              max={vestingMonths}
              onChange={e => onChangeEOD(e, record)}
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
          <Button type='primary' onClick={onSubmit}>
            Save the Vesting Schedule
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Vesting;
