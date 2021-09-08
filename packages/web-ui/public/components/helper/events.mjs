/**
 * 
 * @param eventName {String}
 * @param payload {T}
 * @template T
 * @returns {CustomEvent<T>}
 */
function createEvent(eventName, payload) {
    return new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: payload
    });
}

export {
    createEvent
}