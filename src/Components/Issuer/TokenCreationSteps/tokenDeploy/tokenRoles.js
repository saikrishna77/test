import React, { useState } from 'react';
import { Card, Table } from 'antd';

const TokenRoles = props => {
  const [show, setShow] = useState(false);

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
      dataIndex: 'vesting',
      key: 'vesting'
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
            dataSource={props.data ? props.data : []}
            columns={columns}
            pagination={false}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default TokenRoles;
