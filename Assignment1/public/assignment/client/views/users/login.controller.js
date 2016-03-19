/**
 * Created by sange_000 on 2/17/2016.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$rootScope,$location) {
        var vm = this;
        vm.login = login;

        function init(){

        }init();

        function login(user) {
            if(!user){
                $scope.message = "Please enter login details";
                return;
            }
            UserService.findUserByCredentials
                ({username:user.username,
                    password:user.password})
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }else{
                        $scope.message = "Username or password doesnot match";
                    }
                });
        }
    }
})();