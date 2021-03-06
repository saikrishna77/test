import Web3 from 'web3';

let web3;
let ethereum;
let selectedWallet;
const MetamaskService = async () => {
  try {
    if (typeof window['ethereum'] === 'undefined') {
      console.log('install metamask');
      return 'Install metamask';
    }
    ethereum = window['ethereum'];
    web3 = new Web3(ethereum);
    const networkType = web3.eth.net.getNetworkType();
    if(networkType !== 'kovan'){
      return 'not kovan'
    }
    const wallets = await ethereum.enable();
    selectedWallet = await wallets[0];
    ethereum.on('accountsChanged', accounts => {
      selectedWallet = accounts[0];
      console.log(selectedWallet);
    });
    return web3;
  } catch (err) {
    console.error(err);
    if (
      err.message === 'User rejected provider access' ||
      err.message === 'User denied account authorization'
    ) {
      console.log("The user didn't want to sign in!");
    } else {
      // This shouldn't happen, so you might want to log this...
      console.log('There was an issue signing you in.');
    }
  }
};

export { MetamaskService, web3, ethereum };
