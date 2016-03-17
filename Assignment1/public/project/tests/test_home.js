    
    //Set up the module
   

    //afterEach(function () {
    //    $httpBackend.verifyNoOutstandingExpectation();
    //    $httpBackend.verifyNoOutstandingRequest();
    //});
describe('LoginController', function () {   
        var scope, $httpBackend,ctrl,modal;
         beforeEach(angular.mock.module('mainApp'));

        beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
           
            scope =$rootScope.$new();
            modal=modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };
            ctrl =function() {
            return $controller('LoginController', {
                '$scope': scope,
                '$modalInstance':modal
            });
            };
        }));
        afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

        it('should login valid user', function () {
           var controller = ctrl();
            var username="test@test.com";
            var password="1234";
            scope.email="test@test.com";
            scope.password="1234";
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id': '" + username + "', 'password':'" + password + "'}";
            $httpBackend.expect('GET',url)
            .respond(
                [{
    "_id": {
        "$oid": "565a1f84e4b03d453c880933"
    },
    "user_id": "test@test.com",
    "first_name": "sfjh",
    "last_name": "saflkj",
    "password": "1234"
}]
            ); scope.$apply(function() {
             scope.ok();
            });
            $httpBackend.flush();
             console.log("USER");

            console.log(scope.user);
           expect(scope.user.user_id).toBe("test@test.com");
            
        });
    it('should  not login invalid user', function () {
           var controller = ctrl();
            var username="te@test.com";
            var password="1234";
            scope.email="te@test.com";
            scope.password="1234";
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id': '" + username + "', 'password':'" + password + "'}";
            $httpBackend.expect('GET',url)
            .respond(
                []
            ); scope.$apply(function() {
             scope.ok();
            });
            $httpBackend.flush();
             console.log("USER");

            //console.log(scope.user);
           expect(scope.user).toBe(null);
        
        });
});


describe('SignupController', function () {   
        var scope, $httpBackend,ctrl,modal;
         beforeEach(angular.mock.module('mainApp'));

        beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
           
            scope =$rootScope.$new();
            modal=modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
            };
                           // Create a mock object using spies
         ctrl=function() {
            return $controller('SignupController', {
                '$scope': scope,
                '$modalInstance':modal
            });
            };
        }));
        afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

        it('should not register already registered  user', function () {
           var controller = ctrl();
            var username="test@test.com";
            var password="1234";
            scope.email="test@test.com";
            
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
            $httpBackend.expect('GET',url)
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
            ); scope.$apply(function() {
             scope.ok('test@test.com','1234','user');
            });
            $httpBackend.flush();
             console.log("USER");
           expect(scope.message).toBe("seems like you have already registered");
            
        });
    it('should  register already new user', function () {
           var controller = ctrl();
            var username="te@test.com";
            var password="1234";
            scope.type="User";          
             var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
            $httpBackend.expect('GET',url)
            .respond(
                []
            ); scope.$apply(function() {
             scope.ok('te@test.com','1234',scope.type);
            });
           var URL = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB";
           $httpBackend.expect('POST',URL)
            .respond(
                []
            )
            $httpBackend.flush();
           expect(scope.message).toBe("You have successfully registered");
            
        });
   
});

describe('ProfileController Test', function () {
    var scope, $httpBackend, ctrl, modal,rs;
    beforeEach(angular.mock.module('mainApp'));
    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        //profileServices = _ProfileServices_;
        $httpBackend = _$httpBackend_;
        rs = rootscope={currentUser:{
    "_id": {
        "$oid": "565a1f84e4b03d453c880933"
    },
    "user_id": "test@test.com",
    "first_name": "sfjh",
    "last_name": "saflkj",
    "password": "1234"
}};
            
        scope = $rootScope.$new();
        //modal = $rootScope.$new();
        ctrl = function () {
            return $controller('ProfileController', {
                '$scope': scope,
                '$rootScope' : rs
            });
        };
    }));
   
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    

    it('should check for not same pwd', function () {
        var controller = ctrl();
        var username="test@test.com";
            var password="1234";
            scope.email="test@test.com";
            
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
            $httpBackend.expect('GET',url)
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
        scope.new_pwd = '1234';
        scope.re_pwd = '12345';
        scope.$apply(function () {
            scope.saveChanges();
        })
        
                    $httpBackend.flush();
         
        expect(scope.save).toBe(false);
    })

     it('should check for same pwd', function () {
        var controller = ctrl();
        var username="test@test.com";
            var password="1234";
            scope.email="test@test.com";
            
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
            $httpBackend.expect('GET',url)
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
        scope.new_pwd = '1234';
        scope.re_pwd = '1234';
        scope.$apply(function () {
            scope.saveChanges();
            $httpBackend.expect('PUT',url)
            .respond(
                {"user_id":"test@test.com","password":"1234","first_name":"abcd","preferences":["music","learning_education","festivals_parades","food","performing_arts","schools_alumni","sports"]}
            );
            
        })
       
                    $httpBackend.flush();

        expect(scope.save).toBe(true);
    })
  it('should update', function () {
        var controller = ctrl();
        var username="test@test.com";
            var password="1234";
            scope.email="test@test.com";
            
            var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
            $httpBackend.whenGET(url)
            .respond(
                [{
    "_id": {
        "$oid": "565a1f84e4b03d453c880933"
    },
    "user_id": "test@test,com",
    "first_name": "SFJH",
    "last_name": "saflkj",
    "password": "1234",
    "preferences":[]
}]);
            
var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        scope.new_pwd = '1234';
        scope.re_pwd = '1234';
        scope.new_fn="abcd";
        scope.selectedPref= [
         'music',
         'learning_education',
         'festivals_parades',
         'food',
         'performing_arts',
         'schools_alumni',
         'sports'
    ];
        scope.$apply(function () {
            scope.saveChanges();
            $httpBackend.whenPUT(url)
            .respond(
                {"user_id":"test@test.com","password":"1234","first_name":"abcd","preferences":["music","learning_education","festivals_parades","food","performing_arts","schools_alumni","sports"]}
            );
            
        })
        
                  
        $httpBackend.flush();

        expect(scope.success).toBe("ok");
    })

    
})
