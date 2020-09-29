const { Location } = require("../entity/Location");
const {checkResource} = require("../utils/checkResource");

async function mapper({url, name, photographer, location: rawLocation}){
  const success = await checkResource(url, "image/*");
  const location = rawLocation?  new Location({ title: rawLocation}) : null;
  return success ? {url, name, photographer, location} : null;
}

module.exports = {
  mapper
};