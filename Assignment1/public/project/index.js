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
            templateUrl: 'views/login/login.view.html',
            controller: 'LoginController'

        });
    };
    //signup Modal
    $scope.signupm = function () {
        $rootScope.signupMessage = null;
        $modal.open({
            templateUrl: 'views/register/register.view.html',
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
            templateUrl: 'views/home/home.view.html',
            controller: 'HomeController'
        })
        .state('profile', {
            url: '/profile/:userid',
            templateUrl: 'views/profile/profile.view.html',
            controller: 'ProfileController'
        })
        .state('details', {
            url: '/details?eventObj',
            templateUrl: 'views/details/details.view.html',
            controller: 'DetailsController'
        })
        .state('redirect', {
            url: '/redirect?obj',
            templateUrl: 'views/details/redirect.view.html',
            controller: 'RedirectController'
        })
        
        $urlRouterProvider.otherwise('/home');
});
