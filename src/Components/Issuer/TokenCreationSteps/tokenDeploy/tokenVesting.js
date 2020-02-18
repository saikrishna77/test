import React, { useState, useEffect } from 'react';
import { Card, Select, Table } from 'antd';

const TokenVesting = props => {
  const [show, setShow] = useState(false);
  const [allVestingNames, setAllVestingNames] = useState();
  const [vestingName, setVestingName] = useState('');
  const [vestingPeriod, setVestingPeriod] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(props.data);
    const arr = [];
    for (const key in props.data) {
      arr.push(
        <Select.Option key={key} value={key}>
          {key}
        </Select.Option>
      );
    }
    setAllVestingNames(arr);
  }, [props.data]);

  const onChangeVestingName = value => {
    setVestingName(value);
    setVestingPeriod(props.data[value].totalVestingMonths);
    setData(props.data[value].data);
  };

  const columns = [
    {
      title: 'Vesting Type',
      dataIndex: 'FD',
      key: 'FD'
    },
    {
      title: 'End Of vesting month',
      dataIndex: 'EOD',
      key: 'EOD'
    },
    {
      title: 'Vesting Percentage',
      dataIndex: 'vestPers',
      key: 'vestPers'
    },
    {
      title: 'Lock Period',
      dataIndex: 'LockPeriod',
      key: 'LockPeriod'
    }
  ];

  return (
    <div>
      <Card
        onClick={() => {
          setShow(!show);
        }}
        style={{ width: '50%', margin: 'auto', marginTop: '30px' }}
        hoverable
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Token Vesting
        </div>
      </Card>
      {show ? (
        <Card style={{ width: '50%', margin: 'auto' }}>
          <Select style={{ width: '200px' }} onChange={onChangeVestingName}>
            {allVestingNames}
          </Select>
          <div>
            <b>Vesting Name:</b>
            {vestingName}
          </div>
          <div>
            <b>Vesting Period:</b>
            {vestingPeriod} months
          </div>
          <Table
            size='small'
            ellipsis={false}
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default TokenVesting;
