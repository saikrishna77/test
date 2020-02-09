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

  const fetchData = () => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        firebase.analytics();
        const db = firebase.firestore();
        const tokenRef = db.collection('users');
        tokenRef
          .where('flag', '==', true)
          .where('status.adminApproved', '==', 'pending')
          .where('role', '==', 'issuer')
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              setLoading(false);
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
                key: i,
                id: doc.id
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
  };
  React.useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetails = record => {
    Details(record);
  };

  const accept = record => {
    setLoading(true);
    firebase.analytics();
    const db = firebase.firestore();
    const ref = db.collection('users').doc(record.id);
    ref.update({ 'status.adminApproved': 'approved' });
    setData();
    fetchData();
  };

  const reject = record => {
    setLoading(true);
    firebase.analytics();
    const db = firebase.firestore();
    const ref = db.collection('users').doc(record.id);
    // ref.update({ 'status.adminApproved': 'rejected' });
    setData();
    fetchData();
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
              <a onClick={() => accept(record)}>Accept</a>
              <Divider type='vertical' />
              <a onClick={() => reject(record)}>Reject</a>
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
