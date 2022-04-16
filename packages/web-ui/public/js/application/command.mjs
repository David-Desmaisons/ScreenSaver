import {
    requestFullScreen,
} from "../dom/fullScreen.mjs"
import {
    config
} from "../config/index.mjs"

function post(path, data) {
    return fetch(`${config.baseUrl}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function save(url) {
    return post('provider/local/images', {
        path: url
    })
}

export {
    requestFullScreen,
    save
}