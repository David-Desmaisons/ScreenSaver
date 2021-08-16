function loadImage(url) {
    return new Promise((resolve, reject) => {
        const imageLoader = document.createElement("img");
        let clean;
        const handler = ({
            type
        }) => {
            clean();
            if (type === "load") {
                resolve();
                return;
            }
            reject();
        }
        clean = () => {
            imageLoader.removeEventListener('load', handler);
            imageLoader.removeEventListener('error', handler);
        };
        imageLoader.addEventListener('load', handler);
        imageLoader.addEventListener('error', handler);
        imageLoader.src = url;
    })
}

async function updateBackgroundImage(element, url) {
    try {
        await loadImage(url);
        element.style["background-image"] = `url(${url})`;
        return true;
    } catch {}
    return false;
}

export {
    updateBackgroundImage
}