import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../utils/Firebase/firebase';

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

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  });
  return <div>Tokens</div>;
};

export default withRouter(Tokens);
