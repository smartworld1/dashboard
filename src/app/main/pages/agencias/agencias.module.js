(function() {
  "use strict";

  angular.module("app.pages.agencias", ['ngFileUpload']).config(config);

  /** @ngInject */
  function config($stateProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state("app.pages.agencias", {
      url: "/agencias",
      views: {
        "content@app": {
          templateUrl: "app/main/pages/agencias/agencias.html",
          controller: "AgenciasController as vm"
        }
      },
      bodyClass: "agencias"
    });

    msNavigationServiceProvider.saveItem("Agencias", {
        title: "Agencias",
        state: 'app.pages.agencias',
        weight: 6
    });
  }
})();
