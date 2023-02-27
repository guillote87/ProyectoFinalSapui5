sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("gq4dev.html5.controller.ReviewEmployee", {
            onInit() {
                this._wizard = this.getView().byid("createEmployeeWizard")
            }
        });
    }
);
