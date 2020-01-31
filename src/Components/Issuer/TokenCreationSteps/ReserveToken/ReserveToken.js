import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button, Modal } from 'antd';
import Reserve from './Reserve';
import Reserved from './Reserved';

const ReserveToken = () => {
  const [selectedWallet, setSelectedWallet] = React.useState('');
  const [tokenReserved, setTokenReserved] = React.useState(false);
  let ethereum = window['ethereum'];
  React.useEffect(() => {
    if (typeof window['ethereum'] === 'undefined') {
      console.log('install metamask');
      Modal.error({
        title: 'Metamask Extension not found',
        content: 'Install metamask!'
      });
    }
    const asyncEffect = async () => {
      const wallets = await ethereum.enable();
      setSelectedWallet(await wallets[0]);
    };
    asyncEffect();
  });
  const changeState = () => {
    setTokenReserved(!tokenReserved);
  };
  ethereum.on('accountsChanged', async accounts => {
    setSelectedWallet(accounts[0]);
  });
  return (
    <div style={{ marginTop: '7%' }}>
      {!tokenReserved ? <Reserve selectedWallet={selectedWallet} changeState={changeState}/> : null}
      {tokenReserved ? <Reserved selectedWallet={selectedWallet} /> : null}
      {/* <Button onClick={changeState}>ChangeState</Button> */}
    </div>
  );
};

export default withRouter(ReserveToken);
