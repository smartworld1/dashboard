(function() {
  "use strict";

  angular.module("app.pages.users").controller("UsersController", UsersController);

  /** @ngInject */
  function UsersController($rootScope, $scope, $q, $log, $mdDialog, _,usersService) {
    var vm = this;
    var deferred = $q.defer();
    vm.users = [];

    // Methods
    vm.deleteItem = deleteItem;
    vm.openModal = openModal;
    vm.openImg = openImg;
    vm.editImg = editImg;
    vm.onChangeUser= onChangeUser;
    //////////

    init();

    function init() {
      vm.items = [];
      vm.query = {
        limit: 5,
        page: 1,
        filter: ""
      };

      vm.filter = {
        options: {
          debounce: 500
        }
      };

      vm.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
      };

      vm.promise = deferred.promise;
      usersService.getUsers().then(function(tours){
        vm.users = tours.response;
        console.log( vm.users)
        deferred.resolve();
      }).catch(function(error){
          $log.error(error);

      })
     
    
    }

    function onChangeUser(item){
        $rootScope.loader = true;
        var user = {
            nombre: item.nombre,
            email : item.email ,
            presentacion : item.presentacion,
            avatar: item.avatar,
            activo: item.activo ,
            perfilFace: item.perfilFace,
            promedioValoracion: item.promedioValoracion
        }
        usersService.switchUser(user).then(function(response){
            console.log(response)
            $rootScope.loader = false;
          }).catch(function(error){
              $log.error(error);
              $rootScope.loader = false;
          })
    }

    function openImg(ev, item) {
      window.open(item.photo + "?alt=media");
    }

    function openModal(ev, item) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: "vm",
        templateUrl: "app/main/pages/users/dialogs/item.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          Item: item
        }
      });
    }

    function editImg(ev, item) {
      $mdDialog.show({
        controller: DialogImgController,
        controllerAs: "vm",
        templateUrl: "app/main/pages/users/dialogs/img.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          Item: item
        }
      });
    }

    function deleteItem(ev, item) {
      var confirm = $mdDialog
        .confirm()
        .title("¿Esta seguro de borrar el tour?")
        .htmlContent(
          "El tour <b>" + (item ? item.name : "") + " </b>" + " sera borrado."
        )
        .ariaLabel("borrar tour")
        .targetEvent(ev)
        .ok("OK")
        .cancel("CANCELAR");

      $mdDialog.show(confirm).then(function() {
        $rootScope.loader = true;

        $q.when().then(function(){
            $log.debug("Tour successfully deleted!");
          })
          .catch(function(err) {
            $log.debug(err);
          })
          .finally(function() {
            $rootScope.loader = false;
          });
      });
    }



    function DialogImgController($rootScope, $mdDialog, $log, $q,Item) {
      var vm = this;
      vm.item = Item;
      vm.title = "Actualizar Imagen";
      vm.closeDialog = closeDialog;
      vm.addNewItem = addNewItem;

      /**
       * Add new item
       */
      function addNewItem() {
        var item = angular.copy(vm.item);
        var tempFile = vm.item.file;
        delete item.file;
        $rootScope.loader = true;
        $q.when(tempFile)
          .then(function() {
            closeDialog();
          })
          .catch(function(error) {
            $log.error("Error writing document: ", error);
          })
          .finally(function() {
            $log.debug("End process");
            $rootScope.loader = false;
          });
      }


      function closeDialog() {
        $mdDialog.hide();
      }
    }

    function DialogController(
      $rootScope,
      $mdDialog,
      $q,
      $log,
      Item
    ) {
      var vm = this;
      vm.title = "Editar Tour";
      vm.item = angular.copy(Item);
      vm.minDate = new Date();


      if (!vm.item) {
        vm.title = "Nuevo Tour";
        vm.newItem = true;
      } else {
        $log.debug("Edit", vm.item);
        vm.item.eventDate = new Date(vm.item.eventDate.seconds * 1000);
      }

      vm.closeDialog = closeDialog;
      vm.addNewItem = addNewItem;
      vm.saveItem = saveItem;

      /**
       * Add new item
       */
      function addNewItem() {
        var item = angular.copy(vm.item);
        delete item.file;
        $rootScope.loader = true;
        $q.when().then(function() {
            $log.debug("Document update!");
            $log.debug("New Item ", item);
            closeDialog();
          })
          .catch(function(error) {
            $log.error("Error writing document: ", error);
          })
          .finally(function() {
            $log.debug("End process");
            $rootScope.loader = false;
          });
      }

    
      /**
       * Save item
       */
      function saveItem() {
        var item = angular.copy(vm.item);
        $rootScope.loader = true;
       $q.when().then(function() {
            $log.debug("Document successfully written!");
            $rootScope.loader = false;
            closeDialog();
          })
          .catch(function(error) {
            $log.error("Error writing document: ", error);
          })
          .finally(function() {
            $log.debug("End process");
            $rootScope.loader = false;
          });
      }

      function closeDialog() {
        $mdDialog.hide();
      }
    }
  }
})();
