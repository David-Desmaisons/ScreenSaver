const {
    getImagesFromCollection,
    getCollectionFromCategory
} = require('./analyser');
const {
    writeStream,
    getHighlandStreamFromGenerator
} = require('../utils/streamHelper');
const _ = require("highland");

function scrapCategoryToStream(options) {
    return getHighlandStreamFromGenerator(getCollectionFromCategory(options))
        .flatMap(collection => getHighlandStreamFromGenerator(getImagesFromCollection(collection)))
        .map(image => ({
            url: image.url,
            description: image.name,
            tags: [image.collection, options.name]
        }));
}

function scrapCategoryToFile({
    category,
    destination = null
}) {
    return writeStream(scrapCategoryToStream(category), destination);
}

function scrapCategoriesToFile({
    categories,
    destination = null
}) {
    const stream = _(categories).flatMap(scrapCategoryToStream);
    return writeStream(stream, destination);
}

module.exports = {
    scrapCategoryToStream,
    scrapCategoryToFile,
    scrapCategoriesToFile
}