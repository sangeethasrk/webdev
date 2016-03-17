app.controller('RedirectController', function ($scope, $stateParams, $sce) {
    var urlObj = angular.fromJson($stateParams.obj);
    console.log(urlObj);
    //$scope.url = urlObj.url;
    //console.log($scope.url);

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.url = {src: urlObj.url, title:'ticket center'}
})