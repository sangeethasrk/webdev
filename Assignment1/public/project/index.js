var app = angular.module('mainApp', ['ui.bootstrap', 'ui.router', 'ngRoute', 'checklist-model', 'ui.validate', 'ngSanitize']);

app.directive('tagManager', function () {
    return {
        restrict: 'E',
        scope: {
            tags: '='
        },
        template:
            '<div class="tags">' +
      			'<div ng-repeat="(idx, tag) in tags" class="tag label label-success">{{tag}} </div>' +
            '</div>' 
    };
})
app.controller('NavController', function ($scope, $http, $modal, $routeParams, $rootScope, $state) {

    //login modal 
    $scope.loginm = function () {

        $rootScope.message = null;
        var modalInstance = $modal.open({
            templateUrl: 'projectPages/login/login.html',
            controller: 'LoginController'

        });
    };
    //signup Modal
    $scope.signupm = function () {
        $rootScope.signupMessage = null;
        $modal.open({
            templateUrl: 'projectPages/register/registration.html',
            controller: 'SignupController'

        });
    }

    //logout
    $scope.logout = function () {
        $rootScope.currentUser = null;
        $scope.currentUser = null;
        $rootScope.$broadcast('clearData');
        $scope.$broadcast('clearData');
        $state.go('home');
    }
});



app.config(function ($stateProvider, $urlRouterProvider) {

   
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'projectPages/home/home.html',
            controller: 'HomeController'
        })
        .state('profile', {
            url: '/profile/:userid',
            templateUrl: 'projectPages/profile/profile.html',
            controller: 'ProfileController'
        })
        .state('details', {
            url: '/details?eventObj',
            templateUrl: 'projectPages/details/details.html',
            controller: 'DetailsController'
        })
        .state('redirect', {
            url: '/redirect?obj',
            templateUrl: 'projectPages/details/redirect.html',
            controller: 'RedirectController'
        })
        
        $urlRouterProvider.otherwise('/home');
});
