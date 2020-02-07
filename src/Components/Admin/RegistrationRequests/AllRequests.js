import React from 'react';
import { Table, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import Details from './Details';
import firebase from '../../../utils/firebase';

const AllRequests = props => {
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
                status: doc.data().status.adminApproved,
                key: i
              });
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

  const { Column } = Table;

  const showDetails = record => {
    Details();
  };

  return (
    <Card style={{ margin: 'auto', marginTop: '4%' }}>
      <Table dataSource={data} pagination={false} loading={loading}>
        <Column title='#' dataIndex='key' key='key' />
        <Column title='First Name' dataIndex='firstName' key='firstName' />
        <Column title='Last Name' dataIndex='lastName' key='lastName' />
        <Column title='Company' dataIndex='company' key='company' />
        <Column title='Email Address' dataIndex='email' key='email' />
        <Column title='Status' dataIndex='status' key='status' />
        <Column
          title='Action'
          key='action'
          render={(text, record) => (
            <span onClick={() => showDetails(record)}>
              <a>Details</a>
            </span>
          )}
        />
      </Table>
    </Card>
  );
};

export default withRouter(AllRequests);
