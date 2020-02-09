import React from 'react';
import { Table, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/firebase';

const IssuerSuperAdmins = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = () => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const db = firebase.firestore();
        const tokenRef = db.collection('users');
        tokenRef
          .where('flag', '==', true)
          .where('role', '==', 'admin')
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
                tentativeDate: doc.data().tentativeDate,
                createdOn: new Date(
                  doc.data().userRegisterTimeStamp
                ).toLocaleString(),
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
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { title: '#', dataIndex: 'key', key: 'key' },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company'
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn'
    }
  ];
  return (
    <Card style={{ width: '70%', margin: 'auto', marginTop: '4%' }}>
      <div
        style={{
          textAlign: 'left',
          marginBottom: '20px',
          color: '#1890ff',
          fontSize: '30px',
          fontWeight: 'bold'
        }}
      >
        List Of All Issuer Super Admins
      </div>
      <Table
        dataSource={data}
        pagination={false}
        columns={columns}
        loading={loading}
      ></Table>
    </Card>
  );
};

export default withRouter(IssuerSuperAdmins);
