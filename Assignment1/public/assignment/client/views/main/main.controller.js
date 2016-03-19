/**
 * Created by sange_000 on 2/14/2016.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();