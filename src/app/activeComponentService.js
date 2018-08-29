(function () {
    'use strict';

    angular.module('app')
        .factory('activeComponentService',
        function activeComponentService() {
        
            var activeComponentService = {};
        
            activeComponentService.activeGuid = "";
        
            return activeComponentService;
        });
})(window.angular);
