
//app.factory("ProfileServices", function ($http, $rootScope, $timeout, $q) {
//    var updateCurrentUser = function (password, firstName, lastName, username, photo, selPref) {

//        //var deferred = $q.defer();

//        if (username == null) {
//            return null;
//        }
//        var currentUser = {
//            user_id: username,
//            password: password,
//            last_name: lastName,
//            first_name: firstName,
//            profile_pic: photo,
//            preferences: selPref
//        }
//        //alert(currentUser);
//        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
//        $http.put(url, currentUser).success(function (response) {
//            if (response.success) {
//                console.log('response');
//                console.log(response);
//               // deferred.resolve(response);
//            } else {
//               // deferred.reject(response);
//            }
//        }).error(function (error) {
//            console.log('err');
//            //deferred.reject(error);
//        });
//        //return deferred.promise;
//    };

//    var updatePhoto = function (photo) {
//        $rootScope.currentUser.profile_pic = photo;
//    }
//    return {

//        updateCurrentUser: updateCurrentUser,
//        updatePhoto: updatePhoto

//    }

//});

app.controller("ProfileController", ['$scope','$routeParams','$http','$rootScope',function ($scope, $routeParams, $http, $rootScope) {

  
        //console.log('currentUser');
        //console.log($rootScope.currentUser);
        $scope.username = $rootScope.currentUser.user_id;
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + $scope.username + "'}"
        $http.get(url)
        .success(function (res) {

            $rootScope.currentUser = res[0];
            var userinfo = $rootScope.currentUser;
            console.log('current user');
            console.log(userinfo);
            $scope.new_fn = userinfo.first_name;
            $scope.new_ln = userinfo.last_name;
            $scope.new_pwd = userinfo.password;
            $scope.re_pwd = userinfo.password;
            $scope.selectedPref = userinfo.preferences;
            if (userinfo.profile_pic == null)
                $scope.loc = "../images/dp.jpg";
            else
                $scope.loc = userinfo.profile_pic;

        });
  

    $scope.mismatch = false;
    $scope.save = false;

    $scope.handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        console.log("inside handle file select evt");
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                var photo = $scope.loc;
                $rootScope.currentUser.profile_pic = photo;
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("File picked");
        //document.getElementById('filePicker').addEventListener('change', $scope.handleFileSelect, false);
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }
    $scope.prefArr = [

         'music',
         'learning_education',
         'festivals_parades',
         'food',
         'performing_arts',
         'schools_alumni',
         'sports'
    ];
    //$scope.selectedPref = [];

    $scope.saveChanges = function () {
        //console.log('Pref');
        //console.log($scope.selectedPref);
    
        var username = $rootScope.currentUser.user_id;
        var password = $scope.new_pwd;
        var repassword = $scope.re_pwd;
        var firstName = $scope.new_fn;
        var lastName = $scope.new_ln;
        var photo = $scope.loc;
        var selPref = $scope.selectedPref;
        //console.log('pref arr');
        //console.log(selPref);

        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            updateCurrentUser(password, firstName, lastName, username, $rootScope.currentUser.profile_pic, selPref);
        }
    }

    var updateCurrentUser = function (password, firstName, lastName, username, photo, selPref) {

        //var deferred = $q.defer();

        if (username == null) {
            return null;
        }
        var currentUser = {
            user_id: username,
            password: password,
            last_name: lastName,
            first_name: firstName,
            profile_pic: photo,
            preferences: selPref
        }
        //alert(currentUser);
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        $http.put(url, currentUser).success(function (response) {
            if (response) {
                $scope.success = "ok";
            }
        }).error(function (error) {
            console.log('err');
            //deferred.reject(error);
        });
        //return deferred.promise;
    };
    
}]);