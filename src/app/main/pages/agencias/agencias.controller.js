(function() {
  "use strict";

  angular.module("app.pages.agencias").controller("AgenciasController", AgenciasController);

  /** @ngInject */
  function AgenciasController($rootScope, $scope, $q, $log, $mdDialog, _,tourService) {
    var vm = this;
    var deferred = $q.defer();
    vm.tours = [];

    // Methods
    vm.deleteItem = deleteItem;
    vm.openModal = openModal;
    vm.openImg = openImg;
    vm.onChangeTour= onChangeTour;
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
      tourService.getTours().then(function(tours){
        vm.tours = tours.response;
        console.log( vm.tours)
        deferred.resolve();
      }).catch(function(error){
          $log.error(error);

      })
     
    
    }

    function onChangeTour(item){
        $rootScope.loader = true;
       
        var tour = {
            pais: item.pais,
            ciudad:item.ciudad,
            nombre:item.nombre,
            descripcion:item.descripcion,
            coords:item.coords,
            imgs:item.imgs,
            estado:item.estado,
            idiomas:item.idiomas,
            requisitos:item.requisitos,
            fecha:item.fecha,
            hora:item.hora,
            puntoEncuento:item.puntoEncuento,
            type:item.type
        };

        delete tour._id;
        tourService.switchTour(tour).then(function(response){
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
        templateUrl: "app/main/pages/agencias/dialogs/item.html",
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


    function DialogController(
      $rootScope,
      $mdDialog,
      $q,
      $log,
      Item,
      tourService
    ) {
      var vm = this;
      vm.title = "Editar Agencia";
      vm.item = angular.copy(Item);
      vm.minDate = new Date();


      if (!vm.item) {
        vm.title = "Nueva Agencia";
        vm.newItem = true;
      } else {
        $log.debug("Edit", vm.item);
      }

      vm.closeDialog = closeDialog;
      vm.addNewItem = addNewItem;
      vm.saveItem = saveItem;

      /**
       * Add new item
       */
      function addNewItem() {
        var item = angular.copy(vm.item);
        
        var tour = {
            nombre: item.nombre,
            descripcion: item.descripcion,
            pais: null,
            ciudad: null,
            estado:null,
            coords: null,
            imgs: [],
            created:new Date(),
            updated:new Date(),
            idiomas:null,
            requisitos:null,
            fecha:null,
            hora:null,
            puntoEncuento:null,
            type:'agencia'
        }
        console.log(tour)
  
        $rootScope.loader = true;
        tourService.crearTour(tour)
          .then(function(response) {
            console.log(response);
            var id_tour = response["response"]["_id"];
            tourService.uploadFile(vm.item.img,id_tour).then(function(reponse){
                tourService.switchTour(reponse["response"]).then(function(reponse){
                    console.log(reponse)
                     // closeDialog();
                });

            })
           
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
