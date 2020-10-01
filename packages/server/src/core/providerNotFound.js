class ProviderNotFound extends Error {
  constructor(providerName) {
    super("Provider not found");
    this.providerName = providerName;
  }

  getMessage(){
    return `Provider: ${this.providerName} not found`;
  }
}

module.exports = {
  ProviderNotFound,
};
