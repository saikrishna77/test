import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/firebase';
import { Card, Row, Col, Button, Empty, Spin } from 'antd';
import Countdown from 'react-countdown';
// import TokenContractInterface from '../../../contract/TokenRegisterContractInterface';

const Tokens = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      let ethereum = window['ethereum'];
      if (typeof ethereum !== 'undefined') {
        const wallets = await window['ethereum'].enable();
        let wallet = await wallets[0];
        console.log(wallet);
        // console.log(
        //   await TokenContractInterface.getAllOwnerSymbolsDetailsAndSTData(
        //     wallet
        //   )
        // );
      }
      if (user) {
        firebase.analytics();
        const db = firebase.firestore();
        const tokenRef = db.collection('reservedTokenSymbols');
        tokenRef
          .where('basicDetails.issuer', '==', user.uid)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }
            let tempData = [];
            snapshot.forEach(doc => {
              tempData.push({
                ...doc.data(),
                id: doc.id
              });
            });
            setData(tempData);
            setLoading(false);
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      } else {
        props.history.push('/login');
      }
    });
  }, [props.history]);

  //countdown reders start
  const CountdownCompleted = () => (
    <div style={{ fontSize: '20px', color: '#db5e56' }}>Your Token Expired</div>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <CountdownCompleted />;
    } else {
      // Render a countdown
      return (
        <>
          Your token expires in
          <div style={{ color: '#db5e56', fontSize: '20px' }}>
            <b>{days}</b> days
            <br />
            <b>{hours}</b> hours
            <br />
            <b>{minutes}</b> minutes
            <br />
            {seconds}
          </div>
        </>
      );
    }
  };
  //countdown renders stop

  const RenderCards = () => {
    const cardsArr = [];
    for (let i = 0; i < data.length; i++) {
      let temp;
      temp = (
        <Col span={8} key={i}>
          <Card
            title={data[i].basicDetails.symbol}
            style={{
              width: '300px',
              color: 'black',
              boxShadow: '10px 10px 8px #888888',
              textAlign: 'left',
              height: '400px'
            }}
          >
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <b>Eth Address</b>: {data[i].basicDetails.ethereumAddress}
            </p>
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <b>TransactionID:</b>{' '}
              <a
                href={`https://kovan.etherscan.io/tx/${data[i].basicDetails.transactionHash}`}
              >
                {data[i].basicDetails.transactionHash}
              </a>
            </p>
            <p style={{ textOverflow: 'ellipsis' }}>
              <b>Date</b>:{' '}
              {new Date(
                data[i].basicDetails.symbolCreationTime
              ).toLocaleDateString()}{' '}
            </p>
            {data[i].deployed ? (
              <>
                Your Token is deployed{' '}
                <p
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <b>Deploy TransactionID:</b>{' '}
                  <a
                    href={`https://kovan.etherscan.io/tx/${data[i].deployAddress}`}
                  >
                    {data[i].deployAddress}
                  </a>
                </p>
                <Button
                  type='primary'
                  disabled={
                    Date.now() >
                    data[i].basicDetails.symbolCreationTime + 1.296e9
                  }
                  onClick={() => {
                    props.history.push(
                      '/tokenDeploy?symbol=' + data[i].basicDetails.symbol
                    );
                  }}
                >
                  Check Token Details
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Countdown
                    date={data[i].basicDetails.symbolCreationTime + 1.296e9}
                    renderer={renderer}
                  ></Countdown>
                </div>
                <Button
                  type='primary'
                  disabled={
                    Date.now() >
                    data[i].basicDetails.symbolCreationTime + 1.296e9
                  }
                  onClick={() => {
                    props.history.push(
                      '/issuer/tokenCreation/roles?symbol=' +
                        data[i].basicDetails.symbol +
                        '&edit=true'
                    );
                  }}
                >
                  Configure
                </Button>
              </>
            )}
          </Card>
        </Col>
      );
      cardsArr.push(temp);
    }
    return <Row gutter={[16, 26]}>{cardsArr}</Row>;
  };

  return (
    <div style={{ marginLeft: '80px' }}>
      {loading ? <Spin /> : null}
      {data.length || loading > 0 ? RenderCards() : <Empty />}
    </div>
  );
};

export default withRouter(Tokens);
