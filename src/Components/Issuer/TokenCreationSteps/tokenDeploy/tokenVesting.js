import React, { useState } from 'react';
import { Card, Select, Table } from 'antd';

const TokenVesting = () => {
  const [show, setShow] = useState(false);

  const dataSource = [
    {
      key: '1',
      vestingType: 'Fixed',
      EOD: '12',
      vestingPer: '36 months',
      lockPeriod: '23'
    },
    {
      key: '2',
      vestingType: 'Divide equally',
      EOD: '36',
      vestingPer: '12 months',
      lockPeriod: '25'
    }
  ];

  const columns = [
    {
      title: 'Vesting Type',
      dataIndex: 'vestingType',
      key: 'vestingType'
    },
    {
      title: 'End Of vesting month',
      dataIndex: 'EOD',
      key: 'EOD'
    },
    {
      title: 'Vesting Percentage',
      dataIndex: 'vestingPer',
      key: 'vestingPer'
    },
    {
      title: 'Lock Period',
      dataIndex: 'lockPeriod',
      key: 'lockPeriod'
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
          <Select value='36'>
            <Select.Option key='2' value='36'>
              {' '}
              36 months{' '}
            </Select.Option>
            <Select.Option key='3' value='36'>
              {' '}
              26 months{' '}
            </Select.Option>
          </Select>
          <div>
            <b>Vesting Name:</b>36 months
          </div>
          <div>
            <b>Vesting Period:</b>36
          </div>
          <Table
            size='small'
            ellipsis={false}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default TokenVesting;
