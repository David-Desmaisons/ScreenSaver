const {
    getCategories
} = require('./analyser');

(async function () {
    console.log("scrapping");
    for await (const category of getCategories()) {
        console.log(category);
    }
    console.log("done");
})()