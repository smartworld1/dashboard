(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('filesService', filesService)

    function filesService($q, _, $http) {
        return {
            getPaises: getPaises,
            getCiudades: getCiudades
        }
       
        function getPaises(textPais){
            return $http.get('assets/files/paises.json').then(function (response) {
                var data = response.data;
                var paises = Object.keys(data);
                paises = _.map(paises,function (k) {
                  return k;
                });
              
                if (textPais === '') {
                  return paises;
                }
              
                paises = _.filter(paises, function (item) {
                  return item.toLowerCase().indexOf(textPais.toLowerCase()) > -1;
                });
                return paises;
              });
            
      }


    
    
      function getCiudades(textPais, textCuidad) {
        return $http.get('assets/files/paises.json').then(function (response) {
            var data = response.data;
            var paises = Object.keys(data);
            paises = _.map(paises,function (k) {
            return {
              nombre: k,
              ciudades: data[k]
            };
          });
          var pais = _.find(paises,function (item) {
            return item.nombre.toLowerCase() === textPais.toLowerCase();
          });
      
          if (textCuidad === '') {
            return pais.ciudades;
          }
      
          var ciudades = _.filter(pais.ciudades,function (ciudad) {
            return ciudad.toLowerCase().indexOf(textCuidad.toLowerCase()) > -1;
          });
          return ciudades;
        });
      }
      


    }
})();