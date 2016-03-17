describe('Profile Tests',function(){
    var scope, $httpBackend, ctrl, modal, rs;
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

    it('should update user firstname and password', function () {
        var controller = ctrl();
        var username = "test@test.com";
        var password = "1234";
        scope.email = "test@test.com";

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
                "preferences": []
            }]);

        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        scope.new_pwd = '1234';
        scope.re_pwd = '1234';
        scope.new_fn = "abcd";
        scope.selectedPref = [
        ];
        scope.$apply(function () {
            scope.saveChanges();
            $httpBackend.whenPUT(url)
            .respond(
                { "user_id": "test@test.com", "password": "1234", "first_name": "abcd", "preferences": [] }
            );

        })

        $httpBackend.flush();

        expect(scope.success).toBe("ok");
    })
})