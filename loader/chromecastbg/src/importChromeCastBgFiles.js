const fs = require('fs');
const path = require('path');
const stream = require('stream');
const {promisify} = require('util');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const { mapper } = require("./site/mapper");
const { getStream } = require("./site/loader");

const pipeline = promisify(stream.pipeline);

async function readData(data, callback) {
  const mapped = await mapper(data);
  if (mapped === null){
    callback();
    return;
  }
  callback(null, mapped);
}

function getSerializer() {
  let first = true;
  return es.through(function write(data) {
    const value = `${first ? "[" : ","}\n${JSON.stringify(data, null, 2)}`;
    first = false;
    this.emit('data', value)
  },
  function end () {
    this.emit('data', "\n]");
    this.emit('end');
  });
}

function getDestination() {
  const { outputFile } = process.env;
  const destinationPath = path.resolve(`./output/${outputFile}.JSON`);
  return fs.createWriteStream(destinationPath);
}

async function importer(){
  await pipeline(
    getStream(),
    JSONStream.parse('*'),
    es.map(readData),
    getSerializer(),
    getDestination()
  );
  console.log("done");
}

module.exports = {
  importer
};