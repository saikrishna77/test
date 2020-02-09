import { withRouter } from 'react-router-dom';
const nodemailer = require('nodemailer');

const mailer = async ( html = null) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'woodbolly501@gmail.com', // Your email id
        pass: 'bollywood501' // Your password
      }
    });
    let mailOptions;
    if (!html) {
      mailOptions = {
        from: 'woodbolly501@gmail.com',
        to: localStorage.getItem('email'),
        subject: 'issuer request',
        text: '<b>test mail<b>'
      };
    } else {
      console.log('sending html');
      mailOptions = {
        from: 'woodbolly501@gmail.com',
        to: 'samalakrishna7@gmail.com',
        subject: 'issuer request',
        html: '<b>test mail<b>'
      };
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  };
  export default withRouter(mailer)