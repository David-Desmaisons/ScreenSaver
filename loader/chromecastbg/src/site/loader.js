const got = require('got');

const { url, referrer, userAgent } = process.env;

const option = {
    headers: {
      accept: "application/json, text/plain, */*",
      userAgent,
      referrer
    }
};

async function load(){
  console.log(`Requesting ${url}`);
  try {
		const response = await got(url, option).json();
    console.log("loaded");
    return response;
	} catch (error) {
    console.log(`Error processing ${url}: ${error}`);
    throw( error );
	}
}

function getStream() {
  return got.stream(url, option)
            .on("downloadProgress", ({percent}) => console.log(`download ${percent*100}% done`));
}

module.exports = {
  load,
  getStream
};