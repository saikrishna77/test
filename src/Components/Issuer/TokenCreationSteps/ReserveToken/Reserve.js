import React from 'react';
import { Card, Input, Button } from 'antd';

const Reserve = props => {
  const [symbol, setSymbol] = React.useState();
  const changeHandler = e => {
    setSymbol(e.target.value);
  };
  return (
    <Card style={{ width: '80%', margin: 'auto' }}>
      <h1>Reserve Your Token Symbol</h1>
      <h3>
        Your token symbol will be reserved for <b>15 days</b>, and is
        permanently yours once you create your Token. This reservation ensures
        that no other organization can create a token symbol identical to yours
        using CCAP platform.
      </h3>
      <Card style={{ marginTop: '5%' }}>
        <h2>Enter Token Symbol</h2>
        <Input onChange={changeHandler} />
        <h3 style={{ marginTop: '3%' }}>
          <b>Issuer ETH Address</b>
        </h3>
        <Input
          disabled
          value={props.selectedWallet}
          style={{ textAlign: 'center' }}
        />
        <Button
          type='primary'
          style={{ marginTop: '3%' }}
          onClick={() => props.changeState(symbol)}
        >
          Reserve Token Symbol
        </Button>
      </Card>
    </Card>
  );
};

export default Reserve;
