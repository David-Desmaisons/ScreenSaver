const { ProviderNotFound } = require("./providerNotFound");

class Finder {
  constructor(providers, chance) {
    this.providers = providers;
    this.chance = chance;
    console.log({chance: chance.string(), providers: providers.map((g) => g.name)});
  }

  _pickProvider(providerName) {
    const { chance, providers } = this;
    return providerName === null
      ? chance.pickone(providers)
      : providers.find((p) => p.name === providerName);
  }

  async getWallpaper({ forceRefresh = false, provider: providerName = null, lang = "en-US" } = {}) {
    const { chance } = this;
    const foundProvider = this._pickProvider(providerName);
    if (!foundProvider) {
      throw new ProviderNotFound(providerName);
    }
    const { getWallpaper, name: provider } = foundProvider;
    const wallPaper = await getWallpaper({ forceRefresh, chance, lang });
    return {
      ...wallPaper,
      provider,
    };
  }
}

module.exports = {
  Finder,
};
