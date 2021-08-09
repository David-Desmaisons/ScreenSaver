const {
    performance,
    PerformanceObserver
} = require("perf_hooks")

function getPerformanceLogger(name) {
    const perfObserver = new PerformanceObserver((items) => {
        items.getEntries().forEach((entry) => {
            console.log(entry)
        })
    });
    perfObserver.observe({
        entryTypes: ["measure"],
        buffer: true
    });

    performance.mark(`start-${name}`);

    return () => {
        performance.mark(`end-${name}`);
        performance.measure(name, `start-${name}`, `end-${name}`)
    }
}

module.exports = {
    getPerformanceLogger
}