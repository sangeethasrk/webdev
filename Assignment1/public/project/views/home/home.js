app.controller('HomeController',
function ($scope, $http, $state, $rootScope) {
        
        var input = document.getElementById('cityname');
        var autocomplete = new google.maps.places.Autocomplete(input);
        
        //detect user location and make call to API
        var url = "http://ipinfo.io/json";
        var pinIcon = new google.maps.MarkerImage(
                    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(25, 45)
        );

        $scope.rIcon = new google.maps.MarkerImage(
                    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(25, 45)
        );

        $http.get(url)
        .success(function (result) {
            $scope.name = result.city;
            $scope.currentLoc = result.loc;
            var location = $scope.currentLoc.split(",");

            //current location marker
            $scope.currentLocObj = {
                lat: location[0],
                long: location[1],
                icon: pinIcon
            }
            //$scope.currentLocMarker($scope.currentLocObj);
            $scope.markers = [];
            //$scope.markers.push($scope.currentLocMark);
            $scope.rEvents = [];
            $rootScope.$broadcast("rEvent");
            //get events
            $scope.getEvents($scope.name,true);

        });
    

    //click on search button
    $scope.searchEvents = function () {
        clearOverlays();
        var x = document.getElementById('cityname').value;
        var searchLocation = x.split(",");
        $scope.name = searchLocation[0];
        //$scope.statename = searchLocation[1];
        //$scope.refocusMap($scope.name,$scope.statename);
        $scope.markers = [];
                $scope.markers.push($scope.currentLocMark);
        //console.log($scope.markers);
        $scope.rEvents = [];
        //get recommended events
        $rootScope.$broadcast("rEvent");
        //get events
        $scope.getEvents($scope.name,false);
    }

    //req API for events
    $scope.getEvents = function (cityname,flag) {

        $scope.events = [];

        $scope.arr = [];

        $http.jsonp("http://api.eventful.com/jsonp/events/search?l=" + cityname + "&image_sizes=block150,large&app_key=ncZMbJNvDKFCTLR3&page_size=50" + "&callback=JSON_CALLBACK")
        .success(function (result) {
            $scope.altimg = '../images/events-alt.jpg';
            $scope.events = result.events.event;
            
            if (flag) {
                $scope.mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng($scope.currentLocObj.lat, $scope.currentLocObj.long),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    refresh: true
                }
            }
            else {
                $scope.first = $scope.events[0];


                $scope.mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng($scope.first.latitude, $scope.first.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    refresh: true
                }
            }

            
            $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
            $scope.currentLocMarker($scope.currentLocObj);
            $scope.markers.push($scope.currentLocMark);
            for (var i = 0; i < $scope.events.length; i++) {
                var obj = {
                    lat: Number(result.events.event[i].latitude),
                    long: Number(result.events.event[i].longitude),
                    title: result.events.event[i].title,
                    address: result.events.event[i].venue_address,
                    dist: getDistanceFromLatLonInKm($scope.currentLocObj.lat, $scope.currentLocObj.long, result.events.event[i].latitude, result.events.event[i].longitude).toFixed(2)
                };
                angular.toJson(obj);
                $scope.arr.push(obj);
            }

            var infoWindow = new google.maps.InfoWindow();
            $scope.createMarker = function (info) {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    animation: google.maps.Animation.DROP,
                    title: info.title
                });

                marker.content = '<div class="infoWindowContent">' + info.address + '<br/>' + info.dist + ' km' + '</div>';

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent('<b>' + marker.title + '</b>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);

            }

            for (i = 0; i < $scope.arr.length; i++) {
                $scope.createMarker($scope.arr[i]);
            }
        })

    }
    //create marker for current location using the information provided
    $scope.currentLocMarker = function (info) {

        $scope.currentLocMark = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            icon: info.icon,
            animation: google.maps.Animation.BOUNCE
        });

    }

    //recommeded events
    $scope.$on("rEvent", function () {
        //grid
        $('#demor').pinterest_grid({
            no_colums: 3,
            padding_x: 10,
            padding_y: 10,
            margin_bottom: 50,
            single_column_breakpoint: 700
        });
        //alert('inside rEvents');
        $scope.rEvents = [];
        var prefStr = '';
        if ($rootScope.currentUser) {
            for (var i = 0; i < $rootScope.currentUser.preferences.length - 1; i++) {
                prefStr = prefStr + $rootScope.currentUser.preferences[i] + ',';
            }
            prefStr = prefStr + $rootScope.currentUser.preferences[i];
            var url = "http://api.eventful.com/jsonp/events/search?l=" + $scope.name + "&image_sizes=block150,large&app_key=ncZMbJNvDKFCTLR3&page_size=20&category=" + prefStr + "&callback=JSON_CALLBACK";
            console.log(url);
            $http.jsonp(url)
            .success(function (response) {
                $scope.rEvents = response.events.event;
                console.log('Recommeded Events');
                console.log($scope.rEvents);
                for (var i = 0; i < $scope.rEvents.length; i++) {
                    var obj = {
                        lat: Number(response.events.event[i].latitude),
                        long: Number(response.events.event[i].longitude),
                        title: response.events.event[i].title,
                        address: response.events.event[i].venue_address,
                        dist: getDistanceFromLatLonInKm($scope.currentLocObj.lat, $scope.currentLocObj.long, response.events.event[i].latitude, response.events.event[i].longitude).toFixed(2),
                        icon: $scope.rIcon
                    };
                    angular.toJson(obj);
                    $scope.arr.push(obj);
                }

                var infoWindow = new google.maps.InfoWindow();
                var createMarkerForEvents = function (info) {

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        animation: google.maps.Animation.DROP,
                        title: info.title,
                        icon: info.icon
                    });

                    marker.content = '<div class="infoWindowContent">' + info.address + '<br/>' + info.dist + ' km' + '</div>';

                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent('<b>' + marker.title + '</b>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);

                }

                for (i = 0; i < $scope.arr.length; i++) {
                    createMarkerForEvents($scope.arr[i]);
                }
            })
        }
    })


    //remove old markers from the map
    function clearOverlays() {
        if ($scope.markers) {
           for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers.length = 0;
            $scope.currentLocMarker($scope.currentLocObj);
            
            var newArr = $scope.arr.splice(50, 20);
            newArr.push($scope.currentLocMark);
            console.log('new marker arr');
            console.log(newArr);
            for (i = 0; i < newArr.length; i++) {
                $scope.createMarker(newArr[i]);
            }
        }

    }

    //clear all data from page
    $scope.$on('clearData', function () {
        //clear markers
        clearOverlays();
    });

    //Event Details
    $scope.eventDetails = function (eventId) {
        //console.log(description);
        var eventObj = angular.toJson({
            "eventId": eventId
        });
        //var jsonObj = angular.toJson(eventObj);
        $state.go("details", { 'eventObj': eventObj });
    }

    //calculate distance between current location and event location in KM
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

});