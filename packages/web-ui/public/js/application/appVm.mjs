class ApplicationViewModel {
    constructor({
        options,
        command,
        query
    }) {
        this._options = options;
        this._command = command;
        this._query = query;
        this._timeInMs = options.refreshInMinutes * 60 * 1000;
        this.url = null;
    }

    run() {
        this._command.requestFullScreen();
        this._startCycle();
    }

    stop() {
        clearInterval(this._timerId);
    }

    changeImage(options) {
        this.stop();
        this._startCycle(options);
    }

    requestFullScreen() {
        this._command.requestFullScreen();
    }

    async _updateImage(options = {}) {
        const info = await this._query.getRandomImageInfo(options);
        this.url = info.url;
    }

    _startCycle(options = {}) {
        const update = () => this._updateImage(options);
        update();
        this._timerId = setInterval(update, this._timeInMs);
    }
}

export {
    ApplicationViewModel
}