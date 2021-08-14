const fs = require("fs");
const path = require("path");
const _ = require("highland");
const { Readable } = require("stream");

function asPromise(stream) {
    return new Promise((resolve, reject) => {
        stream.on("error", (err) => {
            reject(err);
        });
        stream.on("finish", function() {
            resolve();
        });
    });  
}

function getHighlandStreamFromGenerator(generator) {
    return _(Readable.from(generator));
}

function getDestinationStream(destination = null) {
    const {
        outputFile
    } = process.env;
    const destinationPath = destination || path.resolve(`./data/${outputFile}.json`);
    return fs.createWriteStream(destinationPath);
}

function getSerializerConsumer() {
    let first = true;
    return (err, data, push, next) => {
        if (err) {
            push(err);
            next();
            return;
        }
        if (data === _.nil) {
            push(null, "\n]");
            push(null, _.nil);
            return;
        }
        push(null, first ? "[\n" : ",\n");
        push(null, JSON.stringify(data, null, 2));
        first = false;
        next();
    };
}

async function writeStream(readStream, destination) {
    const stream = readStream
        .consume(getSerializerConsumer())
        .pipe(getDestinationStream(destination));

    await asPromise(stream);
}

module.exports = {
    getHighlandStreamFromGenerator,
    writeStream
}