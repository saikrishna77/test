import Web3 from 'web3';
const abi = require('./token-registry-ABI.json');

if (typeof window['ethereum'] === 'undefined') {
  console.log('install metamask');
}
const ethereum = window['ethereum'];
const web3 = new Web3(ethereum);

const instance = new web3.eth.Contract(
  abi,
  '0xCbA8212C717969b6e81C365c4E92c0A46ddbf4eB'
);

console.log(instance);

export { instance };
