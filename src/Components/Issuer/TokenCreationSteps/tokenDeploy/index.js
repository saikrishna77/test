import React, { useEffect, useState } from 'react';
import TokenDetails from './tokenDetails';
import TokenPhase from './tokenPhase';
import TokenRoles from './tokenRoles';
import TokenVesting from './tokenVesting';
import { withRouter } from 'react-router-dom';
import firebase from '../../../../utils/firebase';

const TokenDisplay = props => {
  const [tokenDetails, setTokenDetails] = useState({});
  const [roles, setRoles] = useState([]);
  const [vesting, setVesting] = useState({});
  const [phase, setPhase] = useState({});
  const [basicDetails, setBasicDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    setLoading(true);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    setSymbol(symbol);
    firebase.analytics();
    const db = firebase.firestore();
    db.collection('reservedTokenSymbols')
      .doc(symbol + '-' + localStorage.getItem('uid'))
      .get()
      .then(snapshot => {
        console.log(snapshot.data());
        if (snapshot.data()) {
          setBasicDetails(snapshot.data().basicDetails);
          setTokenDetails(snapshot.data().TokenType);
          setRoles(snapshot.data().roles);
          setVesting(snapshot.data().vestingSchedules);
          setPhase(snapshot.data().phase);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  console.log('token display');
  return (
    <>
      {loading ? (
        <div
          style={{
            margin: 'auto',
            marginTop: '45%',
            fontSize: '80px',
            fontWeight: 'bold'
          }}
        >
          Loading...
        </div>
      ) : (
        <div>
          <div
            style={{
              fontWeight: 'bolder',
              fontSize: '30px',
              marginTop: '20px'
            }}
          >
            {symbol}
          </div>
          <div style={{ marginTop: '10px' }}>
            <div>
              <b>Created At</b>:{' '}
              {new Date(basicDetails.symbolCreationTime).toLocaleDateString()}
            </div>
            <div>
              <b>Creator Email</b>: {basicDetails.email}
            </div>
          </div>
          <div>
            <b>Token Sybmol Reserved by eth account</b>:{basicDetails.issuer}
          </div>
          <div>
            <b>Token Sybmol Reserved contract hash</b>:
            <a
              href={`https://kovan.etherscan.io/${basicDetails.transactionHash}`}
            >
              {basicDetails.transactionHash}
            </a>
          </div>
          <TokenDetails data={tokenDetails} />
          <TokenRoles data={roles} />
          <TokenVesting data={vesting} />
          <TokenPhase data={phase} />
        </div>
      )}
    </>
  );
};

export default withRouter(TokenDisplay);
