/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Card, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import Details from './Details';
import firebase from '../../../utils/firebase';

const PendingRequests = props => {
  const { Column } = Table;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const db = firebase.firestore();
        const tokenRef = db.collection('users');
        tokenRef
          .where('flag', '==', true)
          .where('status.adminApproved', '==', 'pending')
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }
            let tempData = [];
            let i = 0;
            snapshot.forEach(doc => {
              i++;
              tempData.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email,
                company: doc.data().company,
                phone: doc.data().phone,
                tokenPhase: doc.data().tokenphase,
                amountToRaise: doc.data().amount,
                underlyingAsset: doc.data().underlyingAsset,
                tentativeDate: doc.data().tentativeDate,
                createdOn: new Date(
                  doc.data().userRegisterTimeStamp
                ).toLocaleString(),
                key: i
              });
              console.log(
                new Date(doc.data().userRegisterTimeStamp).toLocaleDateString()
              );
            });
            setData(tempData);
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            console.log('Error getting documents', err);
          });
      } else {
        props.history.push('/login');
      }
    });
  }, [props.history]);

  const showDetails = record => {
    Details(record);
  };

  return (
    <Card style={{ margin: 'auto', marginTop: '4%' }}>
      <Table dataSource={data} pagination={false} loading={loading}>
        <Column title='#' dataIndex='key' key='key' />
        <Column title='First Name' dataIndex='firstName' key='firstName' />
        <Column title='Last Name' dataIndex='lastName' key='lastName' />
        <Column title='Company' dataIndex='company' key='company' />
        <Column title='Email Address' dataIndex='email' key='email' />
        <Column title='Phone' dataIndex='phone' key='phone' />
        <Column title='Created On' dataIndex='createdOn' key='createdOn' />
        <Column
          title='Action'
          key='action'
          render={(text, record) => (
            <span>
              <a>Accept</a>
              <Divider type='vertical' />
              <a>Reject</a>
              <Divider type='vertical' />
              <a onClick={() => showDetails(record)}>Details</a>
            </span>
          )}
        />
      </Table>
    </Card>
  );
};

export default withRouter(PendingRequests);
