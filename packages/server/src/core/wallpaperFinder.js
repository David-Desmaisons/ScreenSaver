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

  getWallpaper({ forceRefresh = false } = {}) {
    const { chance, providers } = this;
    const { getWallpaper, name: provider } = chance.pickone(providers);
    return {
      ...getWallpaper({ forceRefresh, chance }),
      provider,
    };
  }
}

module.exports = {
  Finder,
};
