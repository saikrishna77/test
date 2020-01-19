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
  Tooltip
} from 'antd';

const Vesting = () => {
  const dataStruct = [
    {
      key: 1,
      name: '1st Vesting',
      FD: 'DivideEqually',
      EOD: 0,
      vestPers: 0,
      LockPeriod: 0
    }
  ];

  const [data, setData] = React.useState([]);
  const [setError, setSetError] = React.useState(false);
  const [vestingName, setVestingName] = React.useState();
  const [vestingMonths, setVestingMonths] = React.useState(0);
  const [totalVesting, setTotalVesting] = React.useState(0);
  let errMsg;

  const onSubmit = () => {
    if (totalVesting > 100) {
      errMsg = 'The total vesting value extended 100%';
      setSetError(true);
    } else if (totalVesting < 100) {
      setSetError(true);
      errMsg = 'The toal vesting value is below 100%';
    }
    notification.info({
      message: `Pending`,
      description: 'Integration and verification pending',
      placement: 'topRight'
    });
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
  };

  const onChangeEOD = record => {
    console.log(record);
  };

  const onChangeFD = record => {
    console.log(record);
  };

  const calculateTotalPres = () => {
    let tempData = data;
    let totalPers;
    tempData.forEach(ele => {
      totalPers += parseFloat(ele.vestPers);
    });
    return totalPers;
  };

  const onChangeVestPres = (e, record) => {
    let tempData = data;
    tempData[record.key - 1].vestPers = e.target.value;
    let totalPers = 0;
    tempData.forEach(ele => {
      totalPers += parseFloat(ele.vestPers);
    });
    if (totalPers < 100) {
      const newData = {
        key: data.length + 1,
        name: `${data.length + 1}th Vesting`,
        FD: 'DivideEqually',
        EOD: 0,
        vestPers: 100 - totalPers,
        LockPeriod: 0
      };
      tempData.push(newData);
    }
    setData(tempData);
    setTotalVesting(totalPers);
  };

  const onChangeLockPeriod = record => {
    console.log(record);
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
            onChange={() => onChangeFD(record)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
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
        return (
          <InputNumber onChange={() => onChangeEOD(record)} value={text} />
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
      name: `${data.length + 1}th Vesting`,
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
    tempData.pop();
    setData(tempData);
  };

  return (
    <div>
      {setError ? DisplayError() : null}
      <b>Enter the Name for Vesting Schedule</b>
      <br />
      <Input
        placeholder='name'
        onChange={e => {
          setVestingName(e.target.value);
        }}
        style={{ width: '40%', textAlign: 'center' }}
      />
      <Card style={{ marginTop: '2%' }}>
        <b>Enter Total Duration for Vesting:</b>{' '}
        <InputNumber placeholder='months' onChange={onChangeMonths} />
        <br />
        <div style={{ textAlign: 'left' }}>
          {vestingMonths <= 0 ? (
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
          columns={columns}
          dataSource={data}
          style={{ marginTop: '2%' }}
          pagination={false}
        />
        <div style={{ marginTop: '20px' }}>
          <b>Total Percent Vesting: {totalVesting}%</b>
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