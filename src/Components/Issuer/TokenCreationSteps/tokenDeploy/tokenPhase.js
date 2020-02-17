import React, { useState } from 'react';
import { Card, Select, Table } from 'antd';

const TokenPhase = () => {
  const [show, setShow] = useState(false);
  const dataSource = [
    {
      key: '1',
      minInvAmt: '1000',
      bonus: '12'
    },
    {
      key: '2',
      minInvAmt: '20000',
      bonus: '36'
    }
  ];

  const columns = [
    {
      title: 'Minimum Investment Amount',
      dataIndex: 'minInvAmt',
      key: 'minInvAmt'
    },
    {
      title: '% Bonus',
      dataIndex: 'bonus',
      key: 'bonus'
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
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Token Phase</div>
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
            <b>Phase Name:</b>XYZ
          </div>
          <div>
            <b>Phase Start Date:</b>30/01/2020
          </div>
          <div>
            <b>Phase End Date:</b>1/02/2020
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

export default TokenPhase;
