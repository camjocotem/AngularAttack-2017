(function (angular) {
    "use strict";
    var app = angular.module('app');

    var checkHTML = function (input) {
        if (!input || input.indexOf("<") === -1 || input.indexOf(">") === -1) {
            return false;
        }
        var doc = document.createElement('div');
        doc.innerHTML = input;
        return (doc.innerHTML === input);
    }

    app.directive('wizDisplay', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                content: '=',
            },
            //controller: ['$scope', function ($scope) {}],
            link: function (scope, element, attr) {
                scope.$watch('content', function (newVal, oldVal) {
                    if (scope.content.html[0] === "") {
                        element[0].innerText = "";
                    } else if (checkHTML(scope.content.html[0])) {
                        var htmlRes = "";
                        if (scope.content.html[1]) {
                            htmlRes = scope.content.html[0].concat(scope.content.html[1]);
                        } else {
                            htmlRes = scope.content.html[0];
                        }
                        var linkFn = $compile(htmlRes);
                        var content = linkFn(scope);
                        element[0].replaceWith(content[0]);
                        element[0] = content[0];
                        
                        if(!element.parent().children()[2] && content[1]){
                            element.parent().append(content[1]);
                        }
                    }
                }, true);
            },
            replace: false
        };
    });

})(window.angular);
