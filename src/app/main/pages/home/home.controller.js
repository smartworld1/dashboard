(function() {
  "use strict";

  angular.module("app.pages.home").controller("HomeController", HomeController);

  /** @ngInject */
  function HomeController($rootScope, $scope, $q, $log, $mdDialog, _,tourService,filesService) {
    var vm = this;
    var deferred = $q.defer();
    vm.tours = [];

    // Methods
    vm.deleteItem = deleteItem;
    vm.openModal = openModal;
    vm.openImg = openImg;
    vm.editImg = editImg;
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
        
        $q.all(_.map(tours.response, function(tour){
           var codigo= tour.pais;
          return filesService.getPaisesByCode(codigo).then(function(pais){
            tour.pais= pais;
            return filesService.getCiudadesByCode(codigo,tour.ciudad);
          }).then(function(cuidad){
            tour.ciudad= cuidad;
            return tour
          })
        })).then(function(tours){
          vm.tours = tours;
          console.table( vm.tours)
          deferred.resolve();

        })
      }).catch(function(error){
          $log.error(error);

      })
     
    
    }

    function onChangeTour(item){
        $rootScope.loader = true;
       
        var tour = {
            id: item._id,
            estado:item.estado
        };

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
        templateUrl: "app/main/pages/home/dialogs/item.html",
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
        templateUrl: "app/main/pages/home/dialogs/img.html",
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
      Item,
      tourService,
      filesService,
      _
    ) {
      var vm = this;
      vm.isDisabled= false;  
      vm.isDisabledCiuidad= true;  
      vm.querySearch = querySearch;
      vm.querySearchCiudad = querySearchCiudad;
      vm.selectedItemChange = selectedItemChange;
      vm.selectedItemCiudad = selectedItemCiudad;
      vm.title = "Editar Tour";
      vm.item = angular.copy(Item);


      if (!vm.item) {
        vm.title = "Nueva Tour";
        vm.newItem = true;
      } else {
        vm.isDisabled= false;  
        vm.isDisabledCiuidad= false;  
        $log.debug("Edit", vm.item);
      }

      vm.closeDialog = closeDialog;
      vm.addNewItem = addNewItem;
      vm.saveItem = saveItem;

     
    


    function querySearch (query) {
      vm.item.ciudad=null;
      vm.isDisabledCiuidad=true;
      return filesService.getPaises(query).then(function(results){
        return results;
      })
    }

    function querySearchCiudad(query){
      console.log(vm.item.pais);
      if(!vm.item.pais){
        return []
      }
      return filesService.getCiudades(vm.item.pais,query).then(function(results){
        return results;
      })
    }
    

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
      vm.isDisabledCiuidad=false;
    }


    function selectedItemCiudad(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }




      /**
       * Add new item
       */
      function addNewItem() {
        var item = angular.copy(vm.item);
        
        var tour = {
            nombre: item.nombre,
            descripcion: item.descripcion,
            pais: item.pais.codigo,
            ciudad: item.ciudad.cod_ciudad,
            estado:true,
            coords: null,
            imgs: [],
            idiomas:item.idiomas,
            requisitos:null,
            fecha:null,
            hora:null,
            puntoEncuento:null,
            type:'free'
        }
  
        $rootScope.loader = true;
        tourService.crearTour(tour)
          .then(function(response) {
            console.log(response);
            var id_tour = response["response"]["_id"];
            console.log(vm.item.imgs)

            $q.all(_.map(vm.item.imgs,function(img){
              console.log(img)
              return   tourService.uploadFile(img,id_tour)
            })).then(function(responseImgs){
              console.log(responseImgs)
              var imgsUrl = [];
              for (var index = 0; index < responseImgs.length; index++) {
                imgsUrl.push(responseImgs[index].file)
  
              }
              var tourUpdate = {
                nombre: item.nombre,
                descripcion: item.descripcion,
                pais: item.pais.codigo,
                ciudad: item.ciudad.cod_ciudad,
                estado:true,
                coords: null,
                imgs: imgsUrl,
                idiomas:item.idiomas,
                requisitos:null,
                fecha:null,
                hora:null,
                puntoEncuento:null,
                type:'free',
                id: id_tour
             }
              tourService.updateTour(tourUpdate).then(function(reponseUpdate){
                  $rootScope.loader = false;
                  closeDialog();
              }).catch(function(error) {
                $rootScope.loader = false;
                $log.error("Error writing document: ", error);
              })
            }).catch(function(error) {
              $rootScope.loader = false;
              $log.error("Error writing document: ", error);
            })

           
           
          })
          .catch(function(error) {
            $rootScope.loader = false;
            $log.error("Error writing document: ", error);
          })

      
      }

    
      /**
       * Save item
       */
      function saveItem() {
        var item = angular.copy(vm.item);
        $rootScope.loader = true;
        var tourUpdate = {
          nombre: item.nombre,
          descripcion: item.descripcion,
          pais: item.pais,
          ciudad: item.ciudad,
          estado: item.estado,
          coords: item.coords,
          imgs: item.imgs,
          idiomas:item.idiomas,
          requisitos:item.requisitos,
          fecha:item.fecha,
          hora:item.hora,
          puntoEncuento:item.puntoEncuento,
          type: item.type,
          id: item._id
       }
        tourService.updateTour(tourUpdate).then(function() {
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
