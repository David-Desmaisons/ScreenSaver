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
        this.provider = null;
        this.running = false;
    }

    run() {
        this._command.requestFullScreen();
        this._startCycle();
    }

    stop() {
        this.running = false;
        clearInterval(this._timerId);
    }

    changeImage(options) {
        clearInterval(this._timerId);
        this._startCycle(options);
    }

    save(url) {
        this._command.save(url);
    }

    async _updateImage(options = {}) {
        const info = await this._query.getRandomImageInfo(options);
        this.url = info.url;
        this.provider = info.provider;
    }

    _startCycle(options = {}) {
        this.running = true;
        const update = () => this._updateImage(options);
        update();
        this._timerId = setInterval(update, this._timeInMs);
    }
}

export {
    ApplicationViewModel
}