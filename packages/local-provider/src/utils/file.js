const fs = require('fs');
const client = require('https');
const path = require('path');

const types = ["gif", "jpeg", "png", "tiff"];
function getType({headers: {"content-type": contentType}}) {
    return types.find(type => contentType === `image/${type}`);
}

function saveImage({
    url,
    to
}) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            const type = getType(res);
            const extension = path.extname(to);

            if (res.statusCode !== 200 || (!extension && !type)) {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
                return;
            }
            
                      
            const destination = (extension !== `.${type}`) ? path.resolve(path.dirname(to), `${path.basename(to, extension)}.${type}`) : to;
            res.pipe(fs.createWriteStream(destination))
                .on('error', reject)
                .once('close', resolve);
        });
    });
}

module.exports = {
    saveImage
}