const { instance } = require('./TokenRegister.contract');

const tokenSymbolAvailable = (symbol) => {
  return instance.methods.tokenSymbolAvailable(symbol).call();
};

const reserveTokenSymbol = (owner, tokenSymbol) => {
  return instance.methods
    .registerNewTokenSymbol(owner, tokenSymbol)
    .send({ from: owner });
};

const getAllOwnerSymbolsDetailsAndSTData = owner => {
  return instance.methods.getAllOwnerSymbolsDetailsAndSTData(owner).call();
};

module.exports = {
  tokenSymbolAvailable,
  reserveTokenSymbol,
  getAllOwnerSymbolsDetailsAndSTData
};
