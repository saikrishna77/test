import React from 'react';
import { Table, Card, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import Details from './Details';

const AllRequests = () => {
  const { Column } = Table;
  const dataSource = [
    {
      key: '1',
      firstName: 'sree',
      lastName: 'teja',
      company: 'CCAP',
      email: 'sreet@ccap.com',
      status: 'approved'
    },
    {
      key: '2',
      firstName: 'muth',
      lastName: 'yala',
      company: 'ello',
      email: 's@n.com',
      status: 'rejected'
    }
  ];

  const showDetails = record => {
    Details();
  };

  return (
    <Card style={{ margin: 'auto', marginTop: '4%' }}>
      <Table dataSource={dataSource} pagination={false}>
        <Column title='#' dataIndex='key' key='key' />
        <Column title='First Name' dataIndex='firstName' key='firstName' />
        <Column title='Last Name' dataIndex='lastName' key='lastName' />
        <Column title='Company' dataIndex='company' key='company' />
        <Column title='Email Address' dataIndex='email' key='email' />
        <Column title='Status' dataIndex='status' key='status' />
        <Column
          title='Action'
          key='action'
          render={(text, record) => (
            <span onClick={() => showDetails(record)}>
              <a>Details</a>
            </span>
          )}
        />
      </Table>
    </Card>
  );
};

export default withRouter(AllRequests);
