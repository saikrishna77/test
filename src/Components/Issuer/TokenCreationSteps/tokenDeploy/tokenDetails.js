import React, { useState } from 'react';
import { Card } from 'antd';

const TokenDetails = () => {
  const [show, setShow] = useState(false);
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
          Token Details
        </div>
      </Card>
      {show ? (
        <Card style={{ width: '50%', margin: 'auto' }}>
          <div>
            <b>Total Number of Investors</b>: 11
          </div>
          <div>
            <b>Lock Period for Investors</b>: 15
          </div>
          <div>
            <b>Type of Security</b>: Warrants
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default TokenDetails;
