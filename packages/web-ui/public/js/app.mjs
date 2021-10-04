import {
    options
} from "./config.mjs";
import {
    createApplication
} from "./infra/appRunner.mjs";
import {
    ApplicationViewModel
} from "./application/appVm.mjs";
import {
    mainView
} from "./view/mainView.mjs";

function runApp({
    element,
    command,
    query
}) {
    const viewModel = new ApplicationViewModel({
        options,
        command,
        query
    });
    const view = mainView(element);
    createApplication({
        viewModel,
        view
    });
}

export {
    runApp
}