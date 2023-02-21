sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
  ],
  function (BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("gq4dev.html5.controller.EmployeeWizard", {
      onInit: function () {
        this._navigation = this.byId("navContainer")
        this._wizard = this.getView().byId('createEmployeeWizard')
        this._EmployeeType = "intern"
      },
      onbtnEmployeePress: function (oEvent) {
        var btnEmployeeType = oEvent.getSource();
        let sliderSalary = this.byId("sliderSalary")
        let sliderPrice = this.byId("sliderPrice")
        // Traemos el tipo de empleado seleccionado
        this._EmployeeType = btnEmployeeType.data("btnTypeEmployee")

        //Seteamos el input de DNI o CFI
        if (this._EmployeeType === "intern" || this._EmployeeType === "manager") {
          sliderSalary.setVisible(true)
          sliderPrice.setVisible(false)
          this.byId("inputCFI").setVisible(false)
          this.byId("inputDNI").setVisible(true)
        } else {
          sliderSalary.setVisible(false)
          sliderPrice.setVisible(true)
          sliderPrice.setValue(400)
          sliderPrice.setMin(100)
          sliderPrice.setMax(2000)
          this.byId("inputCFI").setVisible(true)
          this.byId("inputDNI").setVisible(false)
        }
        if (this._EmployeeType === "intern") {
          sliderSalary.setValue(24000)
          sliderSalary.setMin(12000)
          sliderSalary.setMax(80000)
        } else {
          sliderSalary.setValue(70000)
          sliderSalary.setMin(50000)
          sliderSalary.setMax(200000)
        }
        this._wizard.validateStep(this.byId("employeeTypeStep"));
        this._wizard.nextStep();
      },
      onPressReview: function () {
        this._navigation.to(this.byId("review"));
      }
    });
  }
);