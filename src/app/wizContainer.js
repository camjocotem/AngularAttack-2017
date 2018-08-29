(function (angular) {
	"use strict";
	var app = angular.module('app');

	app.directive('wizContainer', function () {
		return {
			restrict: 'E',
			controller: ['$scope', 'activeComponentService', function ($scope, activeComponentService) {
                $scope.contentInput = {}
                $scope.guid = getGuid();
                activeComponentService.activeGuid = $scope.guid;
                
                $scope.isActiveComponent = function(){
                    return $scope.guid === activeComponentService.activeGuid;
                }
                
                $scope.setActiveComponent = function(){
                    activeComponentService.activeGuid = $scope.guid;
                }
                
                $scope.getActiveComponent = function(){
                    return activeComponentService.activeGuid;
                }
			}],
			template: '<wiz-controller ng-if="contentInput && isActiveComponent()" content="contentInput"></wiz-controller>' +
                    '<wiz-display content="contentInput"></wiz-display>'
		};
	});

})(window.angular);