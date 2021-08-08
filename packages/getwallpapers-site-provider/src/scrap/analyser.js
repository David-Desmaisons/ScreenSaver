const {
    load
} = require('./loader');

async function* getCategories() {
    const window = await load("https://getwallpapers.com/");
    const links = window.document.querySelectorAll(".category_sidebar.item:not(.v2)");
    for (const link of links) {
        yield {
            name: link.innerHTML,
            url: link.attributes.href.value
        }
    }
}

module.exports = {
    getCategories
}