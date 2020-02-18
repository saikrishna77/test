import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const TokenDetails = props => {
  const [show, setShow] = useState(false);
  const [securityType, setSecurityType] = useState('');

  useEffect(() => {
    if (props.data) {
      const type = props.data.typeOfSecurity;
      if (type === 'EBS') {
        const sub = props.data.typeOfSecuritysub;
        if (sub === 'CSA') {
          const subSub = props.data.typeOfSecuritysubsub;
          if (subSub === 'CSAY') {
            setSecurityType(
              'Common stock series-A with voting rights for common stock equity based security'
            );
          } else {
            setSecurityType(
              'Common stock series-A without voting rights for common stock equity based security'
            );
          }
        } else if (sub === 'CSB') {
          const subSub = props.data.typeOfSecuritysubsub;
          if (subSub === 'CSBY') {
            setSecurityType(
              'Common stock series-B with voting rights for common stock equity based security'
            );
          } else {
            setSecurityType(
              'Common stock series-B without voting rights for common stock equity based security'
            );
          }
        } else if (sub === 'CSC') {
          const subSub = props.data.typeOfSecuritysubsub;
          if (subSub === 'CSCY') {
            setSecurityType(
              'Common stock series-C with voting rights for common stock equity based security'
            );
          } else {
            setSecurityType(
              'Common stock series-C without voting rights for common stock equity based security'
            );
          }
        } else if (sub === 'PSA') {
          setSecurityType('Preferred stock series-A');
        } else if (sub === 'PSB') {
          setSecurityType('Preferred stock series-B');
        } else if (sub === 'PSC') {
          setSecurityType('Preferred stock series-C');
        } else {
          setSecurityType(type);
        }
      }
    }
  }, [props.data]);

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
            <b>Total Number of Investors</b>:{' '}
            {props.data ? props.data.LPInvestor : ''}
          </div>
          <div>
            <b>Lock Period for Investors</b>:{' '}
            {props.data ? props.data.NoOfInvestors : ''}
          </div>
          <div>
            <b>Type of Security</b>: {props.data ? securityType : ''}
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default TokenDetails;
