import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import firebase from '../../../utils/firebase';
import TextComp from './TextComp';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import api_url from '../../../api_url';
const { Text } = Typography;
const Cards = ({ data }) => {
  const [cardData, setCardData] = useState('');
  const [dataFlag, setDataFlag] = useState(false);
  let ts = new Date(data.latestDate);
  let tsPast = new Date(data.date);
  const getData = async () => {
    let resp = await axios.get(api_url+'consumer/getMtid', {
      headers: {
        email: localStorage.getItem('email')
      },
      params: {
        mtid: data.mtid
      }
    });
    console.log(resp.data.success);
    if (resp.data.success) {
      console.log(resp.data.data);
      setCardData(resp.data.data);
      firebase
        .firestore()
        .collection('issuer_complaince')
        .doc(data.id)
        .update({ latestDate: new Date() });
      setDataFlag(true);
    } else {
      console.log('nope');
      return;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {dataFlag ? (
        <Card title={`Tx id : ${data.mtid}`}>
          <div style={{ display: 'flex', justifyContent: 'center  ' }}>
            <img
              width='100px'
              height='100px'
              src={require('../icon.png')}
              alt='alt'
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
          <br></br>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <br></br>

            <div
              style={{
                display: 'flex',
                textAlign: 'left',
                flexDirection: 'column'
              }}
            >
              <TextComp name={'Name'} value={data.accountName} />
              <br></br>
              <Text style={{ alignItems: 'center' }}>
                Decision:
                <Button
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    marginLeft: '2vw'
                  }}
                >
                  {cardData.state === 'A'
                    ? 'Accept'
                    : cardData.state === 'D'
                    ? 'Deny'
                    : 'Pending'}
                </Button>
              </Text>
              <br></br>
              <TextComp name={'Reputation'} value={'Unknown'} />
              <TextComp name={'Address'} value={data.perstreet + data.pcity} />
              <TextComp name={'Email'} value={data.email} />
              <TextComp name={'Type'} value={'Consumer'} />
              <TextComp name={'firstSeen'} value={tsPast.toTimeString()} />
              <br></br>
            </div>
          </div>

          <div>
            <Text style={{ fontWeight: 'bolder' }}>Latest Submission</Text>
            <br></br>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                textAlign: 'left'
              }}
            >
              <TextComp name={'Date'} value={ts.toTimeString()} />

              <TextComp
                name={'Profile'}
                value={cardData.ednaScoreCard.er.profile}
              />

              <TextComp
                name={'Stage'}
                value={
                  cardData.ednaScoreCard.er.reportedRule.testResults[0].stage
                }
              />

              <TextComp
                name={'Rule'}
                value={cardData.ednaScoreCard.er.reportedRule.ruleId}
              />

              <TextComp
                name={'Description'}
                value={cardData.ednaScoreCard.er.reportedRule.description}
              />

              <TextComp
                name={'Policy result'}
                value={cardData.ednaScoreCard.er.reportedRule.resultCode}
              />
            </div>
          </div>
          <br></br>
          <div>
            <TextComp name={'tags'} value={data.tags} />
            {/* <div>
              <Text>
                {data.tags
                  ? data.tags.map(item => {
                      return <Text>{item}</Text>;
                    })
                  : ''}
              </Text>
            </div> */}
          </div>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary'>Approve</Button>{' '}
            <Button style={{ marginLeft: '10px' }} type='danger'>
              Reject
            </Button>
            <Button type='dashed' style={{ marginLeft: '10px' }}>
              Investigate
            </Button>
          </div>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default withRouter(Cards);
