import React from 'react';
import { Tabs, Icon, Card } from 'antd';
import PendingRequests from './Pending';
import AllRequest from './AllRequests';

const { TabPane } = Tabs;

const RegistrationRequest = props => {
  return (
    <div style={{ width: '75%', margin: 'auto' }}>
      <Card>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '20px',
            color: '#1890ff',
            fontSize: '30px',
            fontWeight: 'bold'
          }}
        >
          Issuer Registration Requests
        </div>
        <Tabs defaultActiveKey='1'>
          <TabPane
            tab={
              <span>
                <Icon type='play-square' />
                Pending Issuer Registration Requests
              </span>
            }
            key='1'
          >
            <PendingRequests />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type='project' />
                Approved/Rejected Issuer Registration Requests
              </span>
            }
            key='2'
          >
            <AllRequest />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default RegistrationRequest;
