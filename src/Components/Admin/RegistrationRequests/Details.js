import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

const Details = () => {
  Modal.info({
    title: 'Candidate Details',
    content: (
      <div>
        <p>first name: Sree</p>
        <p>last name: Teja</p>
        <p>Company name: CCAP</p>
        <p>email: sreeteja.muthyala@gmail.com</p>
        <p>Country: India</p>
        <p>Phone: 81434343xx</p>
        <p>Token Phase: 1</p>
        <p>Amount to raise: 20000</p>
        <p>Underlying Asset: xxx</p>
        <p>Tentative date: 01/08/2020</p>
        <p>Created date: 01/08/2010</p>
      </div>
    ),
    onOk() {}
  });
};

export default Details;
