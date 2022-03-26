import {
    makeObservable
} from "./observable.mjs"

function createApplication({
    element,
    viewModel,
    view
}) {
    const viewInstance = view(element);
    const observable = makeObservable({
        target: viewModel,
        callBack: viewInstance.update.bind(viewInstance),
    });
    viewInstance.create(observable);
    observable.run();
}

export {
    createApplication
}