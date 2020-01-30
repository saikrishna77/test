import React from 'react';
import { Table, Card } from 'antd';
import { withRouter } from 'react-router-dom';

const IssuerSuperAdmins = () => {
  const dataSource = [
    {
      key: '1',
      firstName: 'sree',
      lastName: 'teja',
      company: 'CCAP',
      email: 'sreet@ccap.com',
      phone: '9040040400',
      createdOn: '10/08/2020'
    },
    {
      key: '2',
      firstName: 'muth',
      lastName: 'yala',
      company: 'ello',
      email: 's@n.com',
      phone: '829932',
      createdOn: '10/02/1923'
    }
  ];

  const columns = [
    { title: '#', dataIndex: 'key', key: 'key' },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company'
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn'
    }
  ];
  return (
    <Card style={{ width: '70%', margin: 'auto', marginTop: '4%' }}>
      <div
        style={{
          textAlign: 'left',
          marginBottom: '20px',
          color: '#1890ff',
          fontSize: '30px',
          fontWeight: 'bold'
        }}
      >
        List Of All Issuer Super Admins
      </div>
      <Table
        dataSource={dataSource}
        pagination={false}
        columns={columns}
      ></Table>
    </Card>
  );
};

export default withRouter(IssuerSuperAdmins);
