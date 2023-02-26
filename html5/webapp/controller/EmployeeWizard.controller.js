sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/message/Message",
    "sap/ui/core/Fragment"
  ],
  function (BaseController, MessageToast, Message,Fragment) {
    "use strict";

    return BaseController.extend("gq4dev.html5.controller.EmployeeWizard", {
      onInit: function () {
        this._navigation = this.byId("navContainer")
        this._wizard = this.getView().byId('createEmployeeWizard')
        this._EmployeeType = "intern"


        var oView = this.getView()
        // Iniciamos un modelo de mensajes (donde guardaremos los datos)
        var oMessageManager = sap.ui.getCore().getMessageManager();
        oView.setModel(oMessageManager.getMessageModel(), "message");

        // Registramos el disparador a la vista actual
        oMessageManager.registerObject(oView, true);

      },
      onbtnEmployeePress: function (oEvent) {
        let employeeModel = new sap.ui.model.json.JSONModel({ Name: "Guillermo" })
        this.getView().setModel(employeeModel, "employeeModel")
        this.getView().getModel("employeeModel")

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
      },
      validateInfoStep: function () {
        this._checkStep("employeeInfoStep", ["inputName", "inputLastName", "inputDNI", "infoDatePicker"]);
      },
      // Verifica en que paso estamos del wizard y pasa un array de inputs para validar
      _checkStep: function (sStepName, aInputIds) {
        let oStep = this.byId(sStepName)
        let bEmptyInputs = this._checkInputFields(aInputIds)


        if (!bEmptyInputs) {
          this._wizard.validateStep(oStep)
        } else {
          this._wizard.invalidateStep(oStep)
        }
      },

      //Revisa los inputs del array y en relacion a los constraints definidos en la vista, evalua 

      _checkInputFields: function (aInputIds) {
        var oView = this.getView();

        return aInputIds.some(function (sInputId) {
          var oInput = oView.byId(sInputId);
          var oBinding = oInput.getBinding("value");
          try {
            oBinding.getType().validateValue(oInput.getValue());
          } catch (oException) {
            return true;
          }
          return false;
        });
      },
      _getMessagePopover: function () {
        var oView = this.getView();

        if (!this._pMessagePopover) {
          this._pMessagePopover = Fragment.load({
            id: oView.getId(),
            name: "gq4dev.html5.fragments.MessageError"
          }).then(function (oMessagePopover) {
            oView.addDependent(oMessagePopover);
            return oMessagePopover;
          });
        }
        return this._pMessagePopover;
      },
      onMessagePopoverPress: function (oEvent) {
        var oSourceControl = oEvent.getSource();
        this._getMessagePopover().then(function (oMessagePopover) {
          oMessagePopover.openBy(oSourceControl);
        });
      },
    })
  })
