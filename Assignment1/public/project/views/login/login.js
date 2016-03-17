﻿app.controller('LoginController', function ($scope, $modal, $http, $location, $rootScope, $modalInstance) {
    //console.log($modalInstance);

    $scope.accept = function () {
        $modalInstance.close(true);
    };

    $scope.reject = function () {
        $modalInstance.close(false);
    };

    $scope.show = false;
    $scope.user = {};
    $scope.ok = function () {
       // console.log("modal function called");
        var username = $scope.email;
        var password = $scope.password;
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id': '" + username + "', 'password':'" + password + "'}";
        var url1 = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

        $http.get(url).success(function (response) {

         //   console.log(response.length);
            if (response.length > 0) {
           //     console.log(response);
                var user = response[0];
                $rootScope.currentUser = user;
                $scope.user = user;
                $scope.accept();
                $rootScope.$broadcast("rEvent");
            }
            else {
                $rootScope.message = "Wrong Credentails!"
                $scope.reject();
                $scope.user = null;
                $rootScope.currentUser = null;
            }
        })
            .error(function (data, status, headers, config) {
                $scope.error = true;
             //   console.log(status);
            });
    };
    $scope.hide = function () {
        $scope.showModal = false;
    };
});

app.factory('session', ['$window', function ($window, $rootScope) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);