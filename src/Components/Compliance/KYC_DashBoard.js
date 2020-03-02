import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../utils/firebase';
import Cards from './elements/Cards';
import Loader from '../Loader/Loader';
const KYC_Dashboard = () => {
  const [dataFlag, setDataFlag] = useState(false);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    getData2();
  }, []);

  const getData2 = async () => {
    getDataVia();
  };
  const getDataVia = () => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        firebase.analytics();
        const db = firebase.firestore();
        const tokenRef = db.collection('issuer_complaince');
        tokenRef
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }
            let tempData = [];
            let i = 0;
            snapshot.forEach(async doc => {
              i++;
              tempData.push({
                accountName: doc.data().complaince_data.AccountName,
                country: doc.data().complaince_data.country,
                fName: doc.data().complaince_data.fName,
                lName: doc.data().complaince_data.lName,
                mName: doc.data().complaince_data.mName,
                dob: doc.data().complaince_data.dob,
                pstreet: doc.data().complaince_data.perstreet,
                pcity: doc.data().complaince_data.percity,
                pstate: doc.data().complaince_data.perstate,
                postal: doc.data().complaince_data.postal,
                pcountry: doc.data().complaince_data.pcountry,
                perstreet: doc.data().complaince_data.perstreet,
                percity: doc.data().complaince_data.percity,
                perstate: doc.data().perstate,
                perpostal: doc.data().perpostal,
                percountry: doc.data().complaince_data.percountry,
                phone_area: doc.data().complaince_data.phone_area,
                phone_num: doc.data().complaince_data.phone_num,
                email: doc.data().complaince_data.email,
                docType: doc.data().complaince_data.docType,
                docissuecon: doc.data().complaince_data.docissuecon,
                docupload: doc.data().complaince_data.docupload,
                docproofupload: doc.data().complaince_data.docproofupload,
                faceUpload: doc.data().complaince_data.faceUpload,
                date: doc.data().complaince_data.date.seconds,
                id: doc.id,
                mtid: doc.data().latestResults.mtid,
                tid: doc.data().latestResults.tid,
                latestDate: doc.data().latestDate.seconds
              });
              console.log(doc.data());
            });
            setCardData(tempData);
            setDataFlag(true);
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      } else {
        console.log('didnt enter the if statement');
      }
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row'
      }}
    >
      {dataFlag ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {cardData.length > 0 ? (
            cardData.map((item, i) => {
              return (
                <div style={{ padding: '10px' }}>
                  <Cards data={item} />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default withRouter(KYC_Dashboard);
