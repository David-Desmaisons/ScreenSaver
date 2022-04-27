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

async function save(url) {
    const response = await post('provider/local/images', {
        path: url
    });
    return response.json();
}

export {
    requestFullScreen,
    save
}