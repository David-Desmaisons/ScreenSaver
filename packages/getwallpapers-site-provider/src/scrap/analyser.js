const {
    load
} = require('./loader');

async function* getCategories() {
    const document = await load(process.env.baseUrl);
    const links = document.querySelectorAll(".category_sidebar.item:not(.v2)");
    for (const link of links) {
        yield {
            name: link.innerHTML,
            url: link.attributes.href.value
        }
    }
}

async function* getCollectionFromCategory({
    url: urlParameter,
    name
}) {
    const url = urlParameter || process.env.categoryUrl.replace("{category}", name);
    const document = await load(url);
    const links = document.querySelectorAll("div.column.collection_thumb a.ui.fluid.image[title][href]");
    for (const link of links) {
        yield {
            name: link.attributes.title.value,
            url: link.attributes.href.value
        }
    }
    const next = document.querySelector("div.stage[data-end='0'][data-resource]");
    if (next === null) {
        return;
    }
    yield* getCollectionFromCategory({
        url: next.dataset.resource
    });
}

function getImagesFromCollection({
    url: urlParameter,
    name
}) {
    const url = urlParameter || process.env.categoryUrl.replace("{category}", name);
    return null;
}

module.exports = {
    getCategories,
    getCollectionFromCategory,
    getImagesFromCollection
}