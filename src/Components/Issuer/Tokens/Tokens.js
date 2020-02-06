import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/firebase';
import { Card, Row, Col, Button } from 'antd';

const Tokens = props => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const db = firebase.firestore();
    const tokenRef = db.collection('reservedTokenSymbols');
    let query = tokenRef
      .where('basicDetails.issuer', '==', localStorage.getItem('uid'))
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        let tempData = [];
        snapshot.forEach(doc => {
          tempData.push(doc.data());
          console.log(doc.id, '=>', doc.data());
        });
        setData(tempData);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, []);

  const RenderCards = () => {
    const cardsArr = [];
    for (let i = 0; i < data.length; i++) {
      let temp;
      temp = (
        <Col span={8}>
          <Card
            title={data[i].basicDetails.symbol}
            style={{
              width: '300px',
              color: 'black',
              boxShadow: '10px 10px 8px #888888',
              textAlign: 'left'
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
            <p style={{ textOverflow: 'ellipsis' }}>
              <b>Contract Transaction: </b>
            </p>
            <p style={{ textOverflow: 'ellipsis' }}>
              <b>Date</b>:{' '}
              {new Date(
                data[i].basicDetails.symbolCreationTime
              ).toLocaleDateString()}{' '}
            </p>
            <Button type='primary'>Configure</Button>
          </Card>
        </Col>
      );
      cardsArr.push(temp);
    }
    return <Row gutter={[16, 26]}>{cardsArr}</Row>;
  };

  return (
    <div style={{ marginLeft: '80px' }}>
      {RenderCards()}
    </div>
  );
};

export default withRouter(Tokens);
