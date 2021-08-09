const {
    getImagesFromCollection,
    getCollectionFromCategory
} = require('./analyser');
const _ = require("highland");
const {
    Readable
} = require('stream');
const {
    asPromise,
    getDestinationStream,
    getSerializerConsumer
} = require('../utils/streamHelper');

async function* scrapCategory(options) {
    for await (const collection of getCollectionFromCategory(options)) {
        for await (const images of getImagesFromCollection(collection)) {
            yield {
                url: images.url,
                description: `${images.name}; ${collection.name}${options.name ? `; ${options.name}`: ''}`,
            }
        }
    }
}

function scrapCategoryToStream(options) {
    return _(Readable.from(getCollectionFromCategory(options)))
        .flatMap(collection => _(Readable.from(getImagesFromCollection(collection))))
        .map(image => ({
            url: image.url,
            description: `${image.name}; ${image.collection}${options.name ? `; ${options.name}`: ''}`
        }));
}

async function scrapCategoryToFile({
    category,
    destination = null
}) {
    const stream = scrapCategoryToStream(category)
        .consume(getSerializerConsumer())
        .pipe(getDestinationStream(destination));

    await asPromise(stream);
}

module.exports = {
    scrapCategory,
    scrapCategoryToStream,
    scrapCategoryToFile
}