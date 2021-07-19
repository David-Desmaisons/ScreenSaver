const fs = require("fs");
const path = require("path");
const stream = require("stream");
const { promisify } = require("util");
const JSONStream = require("JSONStream");
const es = require("event-stream");

const { mapper } = require("./site/mapper");
const { getStream } = require("./site/loader");
const { getSerializerStream } = require("./utils/stream-utility");

const pipeline = promisify(stream.pipeline);

async function readData(data, callback) {
  const mapped = await mapper(data);
  if (mapped === null) {
    callback();
    return;
  }
  callback(null, mapped);
}

function getDestination() {
  const { outputFile } = process.env;
  const destinationPath = path.resolve(`./output/${outputFile}.json`);
  return fs.createWriteStream(destinationPath);
}

async function importer() {
  await pipeline(
    getStream(),
    JSONStream.parse("*"),
    es.map(readData),
    getSerializerStream(),
    getDestination()
  );
  console.log("done");
}

module.exports = {
  importer,
};
