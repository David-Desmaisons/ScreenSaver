const fs = require("fs");
const path = require("path");
const _ = require("highland");

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

module.exports = {
    asPromise,
    getDestinationStream,
    getSerializerConsumer
}