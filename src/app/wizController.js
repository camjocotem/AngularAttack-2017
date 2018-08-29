(function (angular) {
    "use strict";
    var app = angular.module('app');

    app.directive('wizController', function () {
        return {
            restrict: 'E',
            scope: {
                content: '=',
            },
            controller: ['$scope', function ($scope) {

                $scope.content.html = []

                var keyList = {};
                keyList.TAB = 9;
                keyList.ENTER = 13;
                var selfClosingTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

                $scope.trackKeyPress = function (e) {
                    var keyCode = e.keyCode || e.which;
                    
                    //TAB
                    if (keyCode === keyList.TAB) {
                        e.preventDefault();

                        if (!isSelfClosingTag($scope.content.html[0])) { //If the html item is not a self closing tag
                            $scope.content.html[0] = "<" + $scope.content.html[0] + "></" + $scope.content.html[0] + ">";
                        } else {
                            $scope.content.html[0] = "<" + $scope.content.html[0] + " />";
                        }
                    }
                    
                    //ENTER
                    if (keyCode === keyList.ENTER && !$scope.content.html[1]) {
                        $scope.content.html.push("<wiz-container></wiz-container>");
                    }

                }

                $scope.focusCenter = function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === keyList.TAB) {
                        e.preventDefault();
                        setCaretPosition(e, $scope.content.html[0].indexOf(">") + 1);
                    }
                }
            }],
            template: '<input ng-model="content.html[0]" ng-keydown="trackKeyPress($event)" ng-keyup="focusCenter($event)" class="wiz-input">' +
                '<div class="padScroll"></div>',
        };
    });

})(window.angular);

function setCaretPosition(event, caretPos) {
    var elem = event.target;

    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else
                elem.focus();
        }
    }
}

function isSelfClosingTag(input){
    var selfClosingTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
    return selfClosingTags.indexOf(input) !== -1
}
