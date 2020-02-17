import React, { useState } from 'react';
import { Card, Table } from 'antd';

const TokenRoles = () => {
  const [show, setShow] = useState(false);

  const dataSource = [
    {
      key: '1',
      role: 'Employee',
      roleType: 'Manager',
      vestingSchedule: '36 months'
    },
    {
      key: '2',
      role: 'Affiliate',
      roleType: 'Developer',
      vestingSchedule: '12 months'
    }
  ];

  const columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Role Type',
      dataIndex: 'roleType',
      key: 'roleType'
    },
    {
      title: 'Vesting Schedule',
      dataIndex: 'vestingSchedule',
      key: 'vestingSchedule'
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
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Token Roles</div>
      </Card>
      {show ? (
        <Card style={{ width: '50%', margin: 'auto' }}>
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

export default TokenRoles;
