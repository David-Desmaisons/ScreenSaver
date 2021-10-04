import {
    makeObservable
} from "./observable.mjs"

function createApplication({
    viewModel,
    view
}) {
    const observable = makeObservable({
        target: viewModel,
        callBack: view.update.bind(view),
    });
    view.create(observable);
    observable.run();
}

export {
    createApplication
}