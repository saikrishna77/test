import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import Reserve from './Reserve';
import Reserved from './Reserved';
import firebase from '../../../../utils/firebase';

const ReserveToken = props => {
  const [selectedWallet, setSelectedWallet] = React.useState('');
  const [tokenReserved, ] = React.useState(false);
  const [ethereum, ] = React.useState(window['ethereum']);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window['ethereum'] === 'undefined') {
      console.log('install metamask');
      Modal.error({
        title: 'Metamask Extension not found',
        content: 'Install metamask!'
      });
    }
    const asyncEffect = async () => {
      if (typeof ethereum !== 'undefined') {
        const wallets = await ethereum.enable();
        setSelectedWallet(await wallets[0]);
      }
    };
    asyncEffect();
  }, [ethereum]);

  const submit = async symbol => {
    setLoading(true);
    firebase.analytics();
    const db = firebase.firestore();
    let resp = await db
      .collection('reservedTokenSymbols')
      .where('basicDetails.symbol', '==', symbol)
      .get();
    if (resp.empty) {
      console.log('No matching documents.');
      await db
        .collection('reservedTokenSymbols')
        .doc(symbol + '-' + localStorage.getItem('uid'))
        .set({
          basicDetails: {
            issuer: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
            symbolCreationTime: Date.now(),
            symbol: symbol,
            ethereumAddress: selectedWallet
          }
        });
      setLoading(false);
      props.history.push('/issuer/tokenCreation/roles?symbol=' + symbol);
    } else {
      Modal.error({
        title: 'Token Symbol already registered',
        content:
          'The Token Symbol has been registered, you can try different token symbol'
      });
      setLoading(false);
    }
    setLoading(false);
    // setTokenReserved(!tokenReserved);
  };

  //look for changes in ethereum account
  if (typeof ethereum !== 'undefined') {
    ethereum.on('accountsChanged', async accounts => {
      setSelectedWallet(accounts[0]);
    });
  }

  return (
    <div style={{ marginTop: '7%' }}>
      {!tokenReserved ? (
        <Reserve
          selectedWallet={selectedWallet}
          submit={submit}
          loading={loading}
        />
      ) : null}
      {tokenReserved ? <Reserved selectedWallet={selectedWallet} /> : null}
      {/* <Button onClick={changeState}>ChangeState</Button> */}
    </div>
  );
};

export default withRouter(ReserveToken);
