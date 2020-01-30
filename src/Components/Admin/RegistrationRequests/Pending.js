import React from 'react';
import { Table, Card, Divider } from 'antd';
import { withRouter } from 'react-router-dom';

const PendingRequests = () => {
  const { Column } = Table;
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

  return (
    <Card style={{ margin: 'auto', marginTop: '4%' }}>
      <Table dataSource={dataSource} pagination={false}>
        <Column title='#' dataIndex='key' key='key' />
        <Column title='First Name' dataIndex='firstName' key='firstName' />
        <Column title='Last Name' dataIndex='lastName' key='lastName' />
        <Column title='Company' dataIndex='company' key='company' />
        <Column title='Email Address' dataIndex='email' key='email' />
        <Column title='Phone' dataIndex='phone' key='phone' />
        <Column title='Created On' dataIndex='createdOn' key='createdOn' />
        <Column
          title='Action'
          key='action'
          render={(text, record) => (
            <span>
              <a>Accept</a>
              <Divider type='vertical' />
              <a>Reject</a>
            </span>
          )}
        />
      </Table>
    </Card>
  );
};

export default withRouter(PendingRequests);
