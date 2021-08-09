const fetch = require('node-fetch');
const {
    WritableStreamBuffer
} = require('stream-buffers');
const {
    promisify
} = require('util');
const pipeline = promisify(require('stream').pipeline);
const {
    parseHTML
} = require('linkedom');

async function getContent(stream) {
    const buffer = new WritableStreamBuffer();
    await pipeline(stream, buffer);
    return buffer.getContents();
}

async function load(url) {
    const response = await fetch(url);
    const dataBuffer = await getContent(response.body);
    return parseHTML(dataBuffer).document;
}

module.exports = {
    load
}