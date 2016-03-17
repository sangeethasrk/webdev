app.controller('DetailsController', function ($scope, $rootScope, $stateParams, $http, $state) {
    var obj = angular.fromJson($stateParams.eventObj);
    //console.log(obj);
    $scope.eventId = obj.eventId;
    //$scope.description = obj.description;
    
    $scope.altimg = '../images/events-alt.jpg';
    $http.jsonp('http://api.eventful.com/json/events/get?app_key=ncZMbJNvDKFCTLR3&image_sizes=block150,large&id=' + $scope.eventId + '&callback=JSON_CALLBACK')
    .success(function (response) {
        $scope.event = response;
        $scope.description = $scope.event.description;
        //console.log(response);
        if (Array.isArray(response.images.image)) {
            $scope.img = $scope.event.images.image[0].large.url;
        }
        else {
            $scope.img = $scope.event.images.image.large.url;
        }
        //console.log($scope.img);
        $scope.url = $scope.event.links.link[0].url;
        $scope.location = $scope.event.city + " ," + $scope.event.region_abbr + " ," + $scope.event.postal_code;
        var created = $scope.event.start_time;
        var datetime = created.split(" ");
        var date = datetime[0].split("-");
        $scope.date = date[1] + "/" + date[2] + "/" + date[0];
        var time = datetime[1].split(":");
        var hour = parseInt(time[0]);
        if (hour > 12) {
            $scope.time = hour - 12 + ":" + time[1] + " PM";
        }
        else {
            $scope.time = hour + ":" + time[1] + " AM";
        }
        var tag = $scope.event.categories.category[0].id;
        $scope.tags = [tag];
    })

    $scope.redirect = function () {
        //console.log($scope.url);
        var obj = angular.toJson({
            'url' : $scope.url
        })
        $state.go('redirect', {'obj' : obj});
    }
})