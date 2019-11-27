(function ()
{
    'use strict';

    var apliturThemes = {
        aplitur  : {
            primary   : {
                name: 'aplitur-blue',
                hues: {
                    'default': 'A700',
                    'hue-1'  : 'A700',
                    'hue-2'  : 'A400',
                    'hue-3'  : 'A400'
                }
            },
            accent    : { 
                name: 'aplitur-blue',
                hues: {
                    'default': '800',
                    'hue-1'  : '800',     
                    'hue-2'  : '900',  
                    'hue-3'  : '900',              
                }
            },
            warn      : {
                 name: 'aplitur-red',
                hues: {
                    'default': 'A700',
                    'hue-1'  : 'A400'        
                }
            },
            background: {
                name: 'grey',
                hues: {
                    'default': 'A100',
                    'hue-1'  : 'A100',
                    'hue-2'  : '100',
                    'hue-3'  : '300'
                }
            }
        }
    };

  
    angular
        .module('app.theme')
        .constant('apliturThemes', apliturThemes);
})();