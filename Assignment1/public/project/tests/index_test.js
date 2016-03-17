describe('Testing routes', function () {

    //load main module
    beforeEach(angular.mock.module('mainApp'));
    var state,route;
    beforeEach(angular.mock.inject(function ($state, $route) {
        state = $state;
        route = $route;
    }));


    it('should test home state provider',function(){
        expect(state.get('home').controller).toBe('HomeController');
        expect(state.get('home').templateUrl).toEqual('views/home/home.view.html');
    });

    it('should test details state provider', function () {
        expect(state.get('details').controller).toBe('DetailsController');
        expect(state.get('details').templateUrl).toEqual('views/details/details.view.html');
    });

    it('should test redirect state provider', function () {
        expect(state.get('redirect').controller).toBe('RedirectController');
        expect(state.get('redirect').templateUrl).toEqual('views/details/redirect.view.html');
    });

    it('should test default state if no route is given', function () {
        //expect(route.routes['/isha'].redirectTo).toEqual('/home');
    });
});
describe('Testing logout', function () {
    //load main module
    beforeEach(angular.mock.module('mainApp'));
    var scope, rs, ctrl, state;
    beforeEach(angular.mock.inject(function ($state, $controller, $rootScope) {
        state = $state;
        scope = $rootScope.$new();
        rs = $rootScope;
        spyOn(scope, '$broadcast');
        ctrl = function () {
            return $controller('NavController', {
                '$scope': scope,
                '$rootScope': rs,
                '$state' : state
            });
        };
    }));

    it('should check there is no currentUser', function () {
        var controller = ctrl();
        scope.logout();
        expect(scope.currentUser).toBe(null);
    })

    it('should check the state after logout event', function () {
        var controller = ctrl();
        scope.logout();
        var res = state.is('profile');
        expect(res).toBe(false);
    })

    it('should check for event broadcast after logout', function () {
        var controller = ctrl();
        scope.logout();
        expect(scope.$broadcast).toHaveBeenCalledWith('clearData');
    })
})
