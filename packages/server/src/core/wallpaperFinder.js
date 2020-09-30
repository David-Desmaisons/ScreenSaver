
class Finder {
  constructor(providers) {
    this.providers = providers;
  }

  getWallpaper({ forceRefresh = false }) {
    const provider = this.providers[0];
    return {
      ...provider.getWallpaper({ forceRefresh }),
      provider: provider.name,
    };
  }
}

module.exports = {
  Finder,
};
