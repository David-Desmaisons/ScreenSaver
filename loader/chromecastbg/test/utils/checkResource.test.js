const {checkResource} = require("../../src/utils/checkResource");

describe("checkResource", () => {
  test.each([
    { url: "https://www.google.com.br", found: true},
    { url: "http://notfound.com/p", found: false},
  ])(
    "%j",
    async ({url, found}) =>{
      const result = await checkResource(url);
      expect(result).toBe(found);
    }
  )
});
