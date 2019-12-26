(function() {
  "use strict";

  angular.module("app.pages.users", ['ngFileUpload']).config(config);

  /** @ngInject */
  function config($stateProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state("app.pages.users", {
      url: "/users",
      views: {
        "content@app": {
          templateUrl: "app/main/pages/users/users.html",
          controller: "UsersController as vm"
        }
      },
      bodyClass: "users"
    });

    msNavigationServiceProvider.saveItem("Users", {
        title: "Usuarios",
        state: 'app.pages.users',
        weight: 6
    });
  }
})();
