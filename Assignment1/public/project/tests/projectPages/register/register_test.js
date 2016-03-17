describe('SignupController Tests', function () {

    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        modal = modalInstance = {                    // Create a mock object using spies
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        // Create a mock object using spies
        ctrl = function () {
            return $controller('SignupController', {
                '$scope': scope,
                '$modalInstance': modal
            });
        };
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should not register already registered  user', function () {
        var controller = ctrl();
        var username = "test@test.com";
        var password = "1234";
        scope.email = "test@test.com";

        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        $httpBackend.expect('GET', url)
        .respond(
            [{
                "_id": {
                    "$oid": "565a1f84e4b03d453c880933"
                },
                "user_id": "sfjh",
                "first_name": "test@test.com",
                "last_name": "saflkj",
                "password": "1234"
            }]
        ); scope.$apply(function () {
            scope.ok('test@test.com', '1234', 'user');
        });
        $httpBackend.flush();
        console.log("USER");
        expect(scope.message).toBe("seems like you have already registered");

    });
    it('should  register already new user', function () {
        var controller = ctrl();
        var username = "te@test.com";
        var password = "1234";
        scope.type = "User";
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        $httpBackend.expect('GET', url)
        .respond(
            []
        ); scope.$apply(function () {
            scope.ok('te@test.com', '1234', scope.type);
        });
        var URL = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB";
        $httpBackend.expect('POST', URL)
         .respond(
             []
         )
        $httpBackend.flush();
        expect(scope.message).toBe("You have successfully registered");

    });
});