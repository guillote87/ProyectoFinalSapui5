sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("gq4dev.html5.controller.MainView", {
            onInit: function () {
               this.getView().setModel("employee")
            },
            toCreateEmployee: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                oRouter.navTo("RouteEmployeeWizard")
            },
            toSearchEmployees: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                oRouter.navTo("RouteEmployeesView")
            }
        });
    })