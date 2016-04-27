
describe('LoginController Test', function () {
    var scope, $httpBackend, ctrl, modal, modalInstance;
    beforeEach(module('mainApp'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        //modal = $rootScope.$new();
        modal = modalInstance = {                    // Create a mock object using spies
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        ctrl = function () {
            return $controller('LoginController', {
                $scope: scope,
                $modalInstance: modal
            });
        };
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Initial State login Modal', function () {
        it('should instantiate the controller properly', function () {
            var controller = ctrl();
            expect(controller).not.toBeUndefined();
        });

        it('should close the modal with result "true" when accepted', function () {
            var controller = ctrl();
            scope.accept();
            expect(modalInstance.close).toHaveBeenCalledWith(true);
        });

        it('should close the modal with result "false" when rejected', function () {
            var controller = ctrl();
            scope.reject();
            expect(modalInstance.close).toHaveBeenCalledWith(false);
        });
    });

    describe('User login tests', function () {
        it('should login valid user', function () {
            var controller = ctrl();
            var username = "test@test.com";
            var password = "1234";
            scope.email = "test@test.com";
            scope.password = "1234";
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id': '" + username + "', 'password':'" + password + "'}";
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
            );
            scope.$apply(function () {
                scope.ok();
            });
            $httpBackend.flush();
            //console.log("USER");

            //console.log(scope.user);
            expect(scope.user.user_id).toBe("sfjh");

        });
        it('should  not login invalid user', function () {
            var controller = ctrl();
            var username = "te@test.com";
            var password = "1234";
            scope.email = "te@test.com";
            scope.password = "1234";
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id': '" + username + "', 'password':'" + password + "'}";
            $httpBackend.expect('GET', url)
            .respond(
                []
            ); scope.$apply(function () {
                scope.ok();
            });
            $httpBackend.flush();
            //console.log("USER");

            //console.log(scope.user);
            expect(scope.user).toBe(null);

        });
    })
    
});