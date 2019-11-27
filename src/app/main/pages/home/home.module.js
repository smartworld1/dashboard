(function() {
  "use strict";

  angular.module("app.pages.home", ['ngFileUpload']).config(config);

  /** @ngInject */
  function config($stateProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state("app.pages.home", {
      url: "/home",
      views: {
        "content@app": {
          templateUrl: "app/main/pages/home/home.html",
          controller: "HomeController as vm"
        }
      },
      bodyClass: "home"
    });

    msNavigationServiceProvider.saveItem("Tours", {
        title: "Tours",
        state: 'app.pages.home',
        weight: 6
    });
  }
})();
