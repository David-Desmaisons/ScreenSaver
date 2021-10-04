function createObservableProxy(target, callBack) {
    return new Proxy(target, {
        set(target, propertyKey, value, receiver) {
            const returnValue = Reflect.set(target, propertyKey, value, receiver);
            if (returnValue) {
                callBack(propertyKey, value);
            }
            return returnValue;
        }
    });
}

function makeObservable({
    target,
    callBack
}) {
    return createObservableProxy(target, (propertyKey, value) => callBack(target, {
        propertyKey,
        value
    }));
}

export {
    makeObservable
}