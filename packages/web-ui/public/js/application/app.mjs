async function getUpdatedImageRandom({
    query,
    options = {}
}) {
    const info = await query.getRandomImageInfo(options);
    return info.url;
}

async function updateImage(view, query, options) {
    const url = await getUpdatedImageRandom({
        query,
        options
    });
    view.update(s => s.url = url);
};

function startCycle(view, query, timeInMs, options = {}) {
    const update = () => updateImage(view, query, options);
    update();
    return setInterval(update, timeInMs);
};

function runApp({
    createView,
    options,
    command,
    query
}) {
    let timerId;
    const timeInMs = options.refreshInMinutes * 60 * 1000;

    const view = createView({
        state: {
            url: null
        },
        commands: {
            changeImage: (view, options) => {
                clearInterval(timerId);
                timerId = startCycle(view, query, timeInMs, options);
            },
            stop: () => {
                clearInterval(timerId);
            }
        }
    });

    command.requestFullScreen();
    timerId = startCycle(view, query, timeInMs);
}

export {
    runApp
}