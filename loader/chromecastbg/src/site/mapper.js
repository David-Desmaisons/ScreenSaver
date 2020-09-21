const { Location } = require("../entity/Location");
const {checkResource} = require("../utils/checkResource");

const provider = "chromeCast";

async function mapper({url, name, photographer, location}){
  const success = await checkResource(url, "image/*");
  return success ? {url, name, photographer, provider, location: new Location({ title: location})} : null;
}

module.exports = {
  mapper
};