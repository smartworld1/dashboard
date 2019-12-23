(function() {
  "use strict";

  angular
    .module("app.auth.login")
    .controller("LoginController", LoginController);

  /** @ngInject */
  function LoginController($rootScope, $scope, $state, $log, $mdDialog,authService,$timeout,localStorageService) {
    var vm = this;
    vm.login = login;
    vm.isLoading = false;
    vm.rememberMe = false;
    vm.loginForm = {};
    vm.forgotPassword = forgotPassword;

    //////////

    init();

    /**
     * Initialize
     */
    function init() {
    }

    function login() {
      $rootScope.loader = true;
      var user ={
        email: vm.loginForm.email,
        nombre: vm.loginForm.email,
        pass: vm.loginForm.password
      }

      authService.login(user
       )
        .then(function(response){
            if(!response.ok){
                $scope.loginForm['password'].$setValidity('auth/wrong-password', false);
            }else{
                localStorageService.set('token',response.token);
                authService.getUser().then(function(response){
                    console.log(response.usuario);
                    localStorageService.set('usuario',response.usuario);
                    $state.go('app.pages.home');
                })
            }
          
        }).catch(function(error) {
          $log.error(error);
        })
        .finally(function() {
          $rootScope.loader = false;
        });
    }

    function forgotPassword(ev) {
      $mdDialog
        .show({
          controller: forgotPasswordController,
          controllerAs: "vm",
          templateUrl: "app/main/auth/login/forgot-password.html",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function(response) {
          showState(ev, response);
        });
    }

    function showState(ev, response) {
      $mdDialog.show(
        $mdDialog
          .alert()
          .parent(angular.element(document.querySelector("document.body")))
          .clickOutsideToClose(false)
          .title("Envio de correo")
          .textContent("Se ha  enviado el correo con éxito")
          .ariaLabel("Registro")
          .ok("Aceptar")
          .targetEvent(ev)
      );
    }

    function forgotPasswordController($scope, $rootScope, $log) {
      var vm = this;
      vm.hide = hide;
      vm.cancel = cancel;
      vm.keypress = keypress;
      vm.reset = reset;

      function hide() {
        $mdDialog.hide();
      }

      function cancel() {
        $mdDialog.cancel();
      }

      function keypress(ev) {
        if (event.which === 13 && !$scope.forgotForm.$invalid) {
          reset();
        }
      }

      function reset() {
        $rootScope.loader = true;
        authService
          .resetPassword(vm.email)
          .then(function(response) {
            $mdDialog.hide(response);
          })
          .catch(function(error) {
            $log.error(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            switch (errorCode) {
              case 'auth/user-not-found':
              $scope.forgotForm['email'].$setValidity('auth/user-not-found', false);
              break;
             
              default:
                break;
            }
          })
          .finally(function() {
            $rootScope.loader = false;
            $scope.$apply();
          });
      }
    }
  }
})();
