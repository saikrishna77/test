import React from 'react';
import TokenDetails from './tokenDetails';
import TokenPhase from './tokenPhase';
import TokenRoles from './tokenRoles';
import TokenVesting from './tokenVesting';

const TokenDisplay = () => {
  console.log('token display');
  return (
    <div>
      <div
        style={{ fontWeight: 'bolder', fontSize: '30px', marginTop: '20px' }}
      >
        TOK-25
      </div>
      <div style={{marginTop: '10px'}}>
        <div>
          <b>Created At</b>: 10/08/1998
        </div>
        <div>
          <b>Creator Email</b>: sreeteja.muthyala@gmail.com
        </div>
      </div>
      <div>
        <b>Token Sybmol Reserved by eth account</b>:
        0x1213271279419686146323411515
      </div>
      <div>
        <b>Token Sybmol Reserved contract hash</b>:
        <a href='https://etherscan.io'>0x1213271279419686146323411515</a>
      </div>
      <TokenDetails />
      <TokenRoles />
      <TokenVesting />
      <TokenPhase />
    </div>
  );
};

export default TokenDisplay;
