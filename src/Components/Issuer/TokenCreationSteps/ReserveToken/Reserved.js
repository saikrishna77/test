import React from 'react';
import { Card, Input, Button } from 'antd';
import Countdown from 'react-countdown';
import { withRouter } from 'react-router-dom';

const CountdownCompleted = () => (
  <div style={{ fontSize: '40px', color: '#db5e56' }}>Your Token Expired</div>
);

const Reserve = props => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      props.history.push('/issuer/tokenCreation/roles');
      return <CountdownCompleted />;
    } else {
      // Render a countdown
      return (
        // <div style={{fontSize: '40px'}}>{hours}</div>
        <div style={{ color: '#db5e56', fontSize: '40px' }}>
          <b>{hours}</b>:<b>{minutes}</b>:<b>{seconds}</b>
        </div>
      );
    }
  };

  return (
    <Card style={{ width: '80%', margin: 'auto' }}>
      <h1>Create your security token</h1>
      <h3>
        Create your security token before your token reservation expires. If you
        let your token reservation expire, the token symbol you selected will be
        available for others to claim.
      </h3>
      <Countdown date={Date.now() + 3000} renderer={renderer}></Countdown>
      <Card style={{ marginTop: '2%' }}>
        <h2>Reserved Token Symbol</h2>
        <h1 style={{ color: '#51c971' }}> TOK-23 </h1>
        <p style={{ marginTop: '20px', fontSize: '15px' }}>
          <b>Symbol Issuance Transaction:</b>
          <br /> <a>jiacnnavdnascnonadv</a>
          <br />
          <b>Symbol Issuance Date:</b> <br />
          10/08/2019
          <br />
          <b>Issuance Ethereum Address:</b> <br />
          0x4c1e9d26Ec8311f48Bc03662eE8108Bd23Edcb30
        </p>
      </Card>
    </Card>
  );
};

export default withRouter(Reserve);
