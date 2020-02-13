
export class SecurityTokenRegistryService {
  contract = {
    address: '0xCbA8212C717969b6e81C365c4E92c0A46ddbf4eB',
    ABI: require('./ABI.json')
  };

  web3() {
    return this.metamaskService.web3;
  }

  async tokenSymbolAvailable(tokenSymbol) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return contractInstance.methods.tokenSymbolAvailable(tokenSymbol).call();
  }

  registerNewTokenSymbol(owner, tokenSymbol) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return contractInstance.methods
      .registerNewTokenSymbol(owner, tokenSymbol)
      .send({ from: owner });
  }

  async getAllOwnerSymbolsDetailsAndSTData(owner) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return await contractInstance.methods
      .getAllOwnerSymbolsDetailsAndSTData(owner)
      .call();
  }

  async getSymbolDetailsAndSTData(symbol) {
    // return new Promise(async(resolve, reject) => {

    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return await contractInstance.methods
      .getSymbolDetailsAndSTData(symbol)
      .call();

    // const batch = new this.web3.BatchRequest();

    // const info: SymbolDetailsAndSTData = {symbolDetails: null, securityTokenData: null};

    // batch.add(contractInstance.methods.registeredTokenSymbols(symbol).call.request((err, symbolDetails) => {
    //   info.symbolDetails = symbolDetails;
    // }));

    // batch.add(contractInstance.methods.tokenSymbolToSecurityTokenData(symbol).call.request((err, securityTokenData) => {
    //   info.securityTokenData = securityTokenData;

    //   resolve(info);
    // }));

    // batch.execute();

    // });
  }

  getSymbolRegistrationEvent(owner, registrationDate) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return contractInstance.getPastEvents('RegisterTokenSymbol', {
      filter: {
        _owner: owner,
        _registrationDate: registrationDate
      },
      fromBlock: 0,
      toBlock: 'latest'
    });
  }

  generateNewSecurityToken(owner, name, tokenSymbol, tokenDetails) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );
    return contractInstance.methods
      .generateNewSecurityToken(name, tokenSymbol, tokenDetails)
      .send({ from: owner });
  }

  async getSymbolsDetailsAndSTData(symbols) {
    const contractInstance = new this.web3.eth.Contract(
      this.contract.ABI,
      this.contract.address
    );

    return await contractInstance.methods
      .getSymbolsDetailsAndSTData(symbols)
      .call();
  }
}
