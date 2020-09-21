const fs = require('fs');
const path = require('path');
const stream = require('stream');
const {promisify} = require('util');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const { mapper } = require("./site/mapper");
const { getStream } = require("./site/loader");

const pipeline = promisify(stream.pipeline);

function getReader(){
  let first = true;
  return async function readData(data, callback) {
    const mapped = await mapper(data);
    if (mapped === null){
      callback();
      return;
    }
    const value = `${first?'':','}\n${JSON.stringify(mapped, null, 2)}`;
    first = false;
    callback(null, value);
  }
}

function getDestination() {
  const { outputFile } = process.env;
  const destinationPath = path.resolve(`./output/${outputFile}.JSON`);
  return fs.createWriteStream(destinationPath, {autoClose : false});
}

async function importer(){
  const source = getStream().on("downloadProgress", ({percent}) => console.log(`download ${percent*100}% done`));
  const destination = getDestination();
  const transform = es.map(getReader()).on("end", () => destination.end("\n]"));
  destination.write("[");
  await pipeline(
    source,
    JSONStream.parse('*'),
    transform,
    destination
  );
  console.log("done");
}

module.exports = {
  importer
};