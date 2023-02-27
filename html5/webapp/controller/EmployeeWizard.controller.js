sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/message/Message",
  ],
  function (BaseController, MessageToast, Fragment, Message) {
    "use strict";

    return BaseController.extend("gq4dev.html5.controller.EmployeeWizard", {
      onInit: function () {
        this._navigation = this.byId("navContainer")
        this._wizard = this.getView().byId('createEmployeeWizard')
        this._EmployeeType = "intern"

        var oView = this.getView()
        // Iniciamos un modelo de mensajes (donde guardaremos los datos)
        this._oMessageManager = sap.ui.getCore().getMessageManager();
        oView.setModel(this._oMessageManager.getMessageModel(), "message");

        // Registramos el disparador a la vista actual
        this._oMessageManager.registerObject(oView, true);

      },
      onbtnEmployeePress: function (oEvent) {
        var resourceBundle = this.getView().getModel("i18n").getResourceBundle()

        let employeeModel = new sap.ui.model.json.JSONModel([])
        this.getView().setModel(employeeModel, "employeeModel")

        var btnEmployeeType = oEvent.getSource();
        let sliderSalary = this.byId("sliderSalary")
        // Traemos el tipo de empleado seleccionado
        this._EmployeeType = btnEmployeeType.data("btnTypeEmployee")

     

        switch (this._EmployeeType) {
          case 'intern':

            employeeModel.setProperty("/Type", 0)
            this.byId("labelDNI").setText(resourceBundle.getText("DNI"))
            this.byId("labelSalary").setText(resourceBundle.getText("salary"))
            sliderSalary.setProperty("value", 24000)
            sliderSalary.setMin(12000)
            sliderSalary.setMax(80000)
            break
          case 'manager':
            employeeModel.setProperty("/Type", 1)
            this.byId("labelDNI").setText(resourceBundle.getText("DNI"))
            this.byId("labelSalary").setText(resourceBundle.getText("salary"))
            sliderSalary.setProperty("value", 70000)
            sliderSalary.setMin(50000)
            sliderSalary.setMax(200000)
            67
            break
          case 'autonomous':
            employeeModel.setProperty("/Type", 2)
            this.byId("labelDNI").setText(resourceBundle.getText("CIF"))
            this.byId("labelSalary").setText(resourceBundle.getText("price"))
            sliderSalary.setProperty("value", 400)
            sliderSalary.setMin(100)
            sliderSalary.setMax(2000)
            break;
          default:
            break
        }
        this._wizard.setCurrentStep(this.byId("employeeInfoStep"));
      },
      onPressReview: function () {
        this._navigation.to(this.byId("review"));
      },
      validateDNI: function (dni) {
        this._oMessageManager.removeAllMessages();
        var number;
        var letter;
        var letterList;
        var regularExp = /^\d{8}[a-zA-Z]$/;
        //Se comprueba que el formato es válido
        if (regularExp.test(dni) === true) {
          //Número
          number = dni.substr(0, dni.length - 1);
          //Letra
          letter = dni.substr(dni.length - 1, 1);
          number = number % 23;
          letterList = "TRWAGMYFPDXBNJZSQVHLCKET";
          letterList = letterList.substring(number, number + 1);
          if (letterList !== letter.toUpperCase()) {
            //Error
            this._oMessageManager.addMessages(
              new Message({
                message: "Ingrese un DNI español valido",
                type: "Error",
                processor: this.getView().getModel("message")
              }))
             
            return false
          } else {
            //Correcto
            return true
          }
        } else {
          //Error
          this._oMessageManager.addMessages(
            new Message({
              message: "Ingrese un DNI español valido",
              type: "Error",
              processor: this.getView().getModel("message")
            }))
            this.byId("inputDNI").setValueState("Error")
          return false
        }

      },
      validateInfoStep: function () {
        this._checkStep("employeeInfoStep", ["inputName", "inputLastName","inputDNI", "infoDatePicker"] );
      },
      // Verifica en que paso estamos del wizard y pasa un array de inputs para validar
      _checkStep: function (sStepName, aInputIds) {
        let oStep = this.byId(sStepName)
        let dni = this.byId("inputDNI").getValue()
        let bEmptyInputs = this._checkInputFields(aInputIds)
        if (!bEmptyInputs && this.validateDNI(dni)) {
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
        var oView = this.getView()
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
      _editStep: function (sStepId) {
        var fnAfterNavigate = function () {
            // Reset wizard to given step
            var oWizard = this.getView().byId("createEmployeeWizard")
            var oStepToEdit = this.byId(sStepId);
            oWizard.goToStep(oStepToEdit);

            var oNavContainer = this.byId("navContainer");
            oNavContainer.detachAfterNavigate(fnAfterNavigate);
        }.bind(this);

        // Nav back to the create page, use callback to set wizard
        var oNavContainer = this.byId("navContainer");
        oNavContainer.attachAfterNavigate(fnAfterNavigate);
        oNavContainer.backToTop();
    },
    goToStep1:function(){
      this._editStep("employeeTypeStep")
    },
    goToStep2:function(){
      this._editStep("employeeInfoStep")
    },
    goToStep3:function(){
      this._editStep("employeeAddInfoStep")
    }
    })
  })

