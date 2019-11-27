(function ()
{
    'use strict';

    angular
        .module('app.theme')
        .config(config);

    /** @ngInject */
    function config($mdThemingProvider, apliturPalettes, apliturThemes)
    {
    

        //Add aplitur  palettes
        angular.forEach(apliturPalettes, function (palette)
        {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });

        //Add aplitur themes
        angular.forEach(apliturThemes, function (theme, themeName)
        {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.hues)
                .accentPalette(theme.accent.name, theme.accent.hues)
                .warnPalette(theme.warn.name, theme.warn.hues)
                .backgroundPalette(theme.background.name, theme.background.hues);
        });
    }

})();