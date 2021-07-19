const {
    wallPaperModel,
    wallPaperQuery,
} = require("../model/contract");
const {
    exceptionMapper
} = require("./helper/exceptionMapper");

const getRandom = ({
    finder
}) => ({
    method: "GET",
    options: {
        tags: ["api"],
        response: {
            schema: wallPaperModel
        },
        validate: {
            query: wallPaperQuery,
        },
        handler(request) {
            return exceptionMapper(() => finder.getWallpaper({
                ...request.query,
                host: request.url.origin
            }));
        },
    },
})

module.exports = {
    getRandom
}