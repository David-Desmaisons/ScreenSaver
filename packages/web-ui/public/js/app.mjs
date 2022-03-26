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
    mainView as view
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
    createApplication({
        element,
        viewModel,
        view
    });
}

export {
    runApp
}