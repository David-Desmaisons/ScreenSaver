const got = require('got');

const { url, referrer, userAgent } = process.env;

const option = {
    headers: {
      accept: "application/json, text/plain, */*",
      userAgent,
      referrer
    }
};

function getStream() {
  return got.stream(url, option)
            .on("downloadProgress", ({percent}) => console.log(`download ${percent*100}% done`));
}

module.exports = {
  getStream
};