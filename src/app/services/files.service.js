(function () {
    'use strict';
    angular
        .module('app.services')
        .factory('filesService', filesService)

    function filesService($q, _, $http) {
        return {
            getPaises: getPaises,
            getCiudades: getCiudades,
            getPaisesByCode: getPaisesByCode,
            getCiudadesByCode:getCiudadesByCode
        }
       
        function getPaises(textPais){
            
            return $http.get('assets/files/paises_multi.json').then(function (response) {
                var idioma = 'es';
                var paises = response.data;
                paises = _.map(paises,function (k) {
                  return {
                    "pais":k["pais_"+idioma],
                    "codigo":k["codigo"]
                  };
                });
                
                
                if (textPais === '') {
                  return paises;
                }
              
                paises = _.filter(paises, function (item) {
                  return item["pais"].toLowerCase().indexOf(textPais.toLowerCase()) > -1;
                });
                return paises;
              });
            
      }

      function getPaisesByCode(codigo){
        return $http.get('assets/files/paises_multi.json').then(function (response) {
            var idioma = 'es';
            var paises = response.data;
            paises = _.map(paises,function (k) {
              return {
                "pais":k["pais_"+idioma],
                "codigo":k["codigo"]
              };
            });
          
            var pais = _.find(paises, function (item) {
              return item["codigo"] === codigo;
            });
            return pais;
          });
        
  }

      
  
    
    
      function getCiudades(textPais, textCuidad) {
        return $http.get('assets/files/paises_multi.json').then(function (response) {
            var idioma = 'es';
            var paises = response.data;
            paises = _.map(paises,function (k) {
              return {
                "pais":k["pais_"+idioma],
                "codigo":k["codigo"],
                "ciudades":k["ciudades"]
              };
          });        
          var pais = _.find(paises,function (item) {
            return item.pais.toLowerCase() === textPais.pais.toLowerCase();
          });
      
          if (textCuidad === '') {
            return pais.ciudades;
          }
      
          var ciudades = _.filter(pais.ciudades,function (ciudad) {
            return ciudad.ciudad.toLowerCase().indexOf(textCuidad.toLowerCase()) > -1;
          });
          return ciudades;
        });
      }

      function getCiudadesByCode(codigoPais, codigoCiudad) {
        return $http.get('assets/files/paises_multi.json').then(function (response) {
            var idioma = 'es';
            var paises = response.data;
            paises = _.map(paises,function (k) {
              return {
                "pais":k["pais_"+idioma],
                "codigo":k["codigo"],
                "ciudades":k["ciudades"]
              };
          });        

          var pais = _.find(paises, function (item) {
            return item["codigo"] === codigoPais;
          });
    
          var ciudad = _.find(pais.ciudades,function (ciudad) {
            return ciudad.cod_ciudad == codigoCiudad;
          });
          return ciudad;
        });
      }
      


    }

   
    
})();