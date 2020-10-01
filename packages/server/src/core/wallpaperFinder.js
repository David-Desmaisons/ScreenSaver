const { ProviderNotFound } = require("./providerNotFound");

class Finder {
  constructor(providers, chance) {
    this.providers = providers;
    this.chance = chance;
    console.log("Chance:", chance.string());
    console.log(
      "Providers:",
      providers.map((g) => g.name)
    );
  }

  _pickProvider(providerName) {
    const { chance, providers } = this;
    return providerName === null
      ? chance.pickone(providers)
      : providers.find((p) => p.name === providerName);
  }

  getWallpaper({ forceRefresh = false, provider: providerName = null } = {}) {
    const { chance } = this;
    const foundProvider = this._pickProvider(providerName);
    if (!foundProvider) {
      throw new ProviderNotFound(providerName);
    }
    const { getWallpaper, name: provider } = foundProvider;
    return {
      ...getWallpaper({ forceRefresh, chance }),
      provider,
    };
  }
}

module.exports = {
  Finder,
};
