/**
 * Created by sange_000 on 2/16/2016.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,UserService) {
        $scope.logout=logout;

        function logout(){
            UserService.setCurrentUser(null);

        };
    }
})();