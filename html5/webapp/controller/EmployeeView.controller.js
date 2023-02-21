sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("gq4dev.html5.controller.EmployeeView", {
      onInit() {
        this.readEmployeeData()
      },
      readEmployeeData: function () {

        this.getOwnerComponent().getModel("employeeModel").read("/Users", {
          filters: [
            new sap.ui.model.Filter("SapId", "EQ", this.getOwnerComponent().SapId),
            // new sap.ui.model.Filter("EmployeeId", "EQ", employeeID.toString())
          ],
          success: function (data) {
            console.log(data.results)
            var employeeModel = this.getView().getModel("employeeModel");
            employeeModel.setData(data.results);
            //this._employeeListView.getModel("employeeModel").setData(data.results); 

          }.bind(this),
          error: function (e) {
            //
          }

        });
      }
    });
  }
);
