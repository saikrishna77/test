import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

const Details = record => {
  Modal.info({
    title: 'Candidate Details',
    content: (
      <div>
        <p>first name: {record.firstName}</p>
        <p>last name: {record.lastName}</p>
        <p>Company name: {record.company}</p>
        <p>email: {record.email}</p>
        <p>Country: India</p>
        <p>Phone: {record.phone}</p>
        <p>Token Phase: {record.tokenPhase}</p>
        <p>Amount to raise: {record.amountToRaise}</p>
        <p>Underlying Asset: {record.underlyingAsset}</p>
        <p>Tentative date: {record.tentativeDate}</p>
        <p>Created date: {record.createdOn}</p>
      </div>
    ),
    onOk() {}
  });
};

export default Details;
