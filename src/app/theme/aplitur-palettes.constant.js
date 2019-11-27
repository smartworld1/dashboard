(function () {
    'use strict';

    var apliturPalettes = [
        {
            name: 'aplitur-blue',
            options: {
                '50': '#000000',
                '100': '#000000',
                '200': '#000000',
                '300': '#000000',
                '400': '#000000',
                '500': '#000000',
                '600': '#000000',
                '700': '#000000', 
                '800': '#FBD325', // negro 
                '900': '#EFC304', //plomo claro
                'A100': '#000000', 
                'A200': '#000000',
                'A400': '#FBD325', //negro
                'A700': '#EFC304', //plomo
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 A100',
                'contrastStrongLightColors': '300 400'
            }
        },
        {
            name: 'aplitur-red',
            options: {
                '50': '#c74048',
                '100': '#c74048',
                '200': '#c74048',
                '300': '#c74048',
                '400': '#c74048',
                '500': '#c74048',
                '600': '#c74048',
                '700': '#c74048',
                '800': '#c74048',
                '900': '#c74048',
                'A100': '#c74048',
                'A200': '#c74048',
                'A400': '#c74048',
                'A700': '#c74048',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 A100',
                'contrastStrongLightColors': '300 400'
            }
        }
    ];

    angular
        .module('app.theme')
        .constant('apliturPalettes', apliturPalettes);
})();
