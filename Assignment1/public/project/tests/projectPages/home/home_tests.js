// LOCATION DETECTION API CALLS

describe('HomeController', function () {
    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();

        var input = angular.element("<input type='text' accept='image/*' id='cityname' value='Boston'/>");        
	
	
        spyOn(document, 'getElementById').and.returnValue(input);    

        google.maps['places'] ={
          Autocomplete: function(input){}
        }
        spyOn(google.maps.places, 'Autocomplete');  

        ctrl = function () {
            return $controller('HomeController', {
                '$scope': scope
            });
        };
        var controller = ctrl();
    }));

    afterEach(function () {
    });

    it('Test http calls to detect current location', function () {        
        $httpBackend.expect('GET','http://ipinfo.io/json').respond(
                {
                  "ip": "76.119.91.78",
                   "hostname": "c-76-119-91-78.hsd1.ma.comcast.net",
                   "city": "Boston",
  			"region": "Massachusetts",
  "country": "US",
  "loc": "42.3346,-71.0362",
  "org": "AS7922 Comcast Cable Communications, Inc.",
  "postal": "02127"
}
        );

        $httpBackend.expect('JSONP','http://api.eventful.com/jsonp/events/search?l=Boston&image_sizes=block150,large&app_key=ncZMbJNvDKFCTLR3&page_size=50&callback=JSON_CALLBACK').respond(
		{}
        );      
        
    });


	it('Check for search input element to be inputed', function () {
	expect(document.getElementById).toHaveBeenCalled();
	});
	
	it('Check if maps loads for input term', function () {
	expect(google.maps.places.Autocomplete).toHaveBeenCalled();
	});

});

// EventfulAPI calls

describe('HomeController', function () {
    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();  
	
	//spyOn(scope,'getEvents').respond('Boston');
        ctrl = function () {
            return $controller('HomeController', {
                '$scope': scope
            });
        };
        var controller = ctrl();
    }));
    afterEach(function () {
    });

    it('Test http calls to detect eventapi calls', function () {        
        $httpBackend.expect('GET','http://api.eventful.com/jsonp/events/search?l=California&amp;image_sizes=block150,large&amp;app_key=ncZMbJNvDKFCTLR3&amp;page_size=1&amp;callback=angular.callbacks._5%22%20async=').respond({
                  "last_item":null,"total_items":"51972","first_item":null,"page_number":"1","page_size":"1","page_items":null,"search_time":"0.057","page_count":"51972","events":{"event":{"watching_count":null,"olson_path":"America/Los_Angeles","calendar_count":null,"comment_count":null,"region_abbr":"CA","postal_code":null,"going_count":null,"all_day":"0","latitude":"38.6625980","groups":null,"url":"http://sacramento.eventful.com/events/loreena-mckennitt-/E0-001-088885078-1?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"E0-001-088885078-1","privacy":"1","city_name":"Folsom","link_count":null,"longitude":"-121.1269320","country_name":"United States","country_abbr":"USA","region_name":"California","start_time":"2016-03-17 19:30:00","tz_id":null,"description":" <br> Loreena McKennitt is well known as a composer and singer. In a recording career spanning more than two decades, Ms. McKennitt&#39;s &#39;eclectic Celtic&#39; music has received critical acclaim world-wide, and gold, platinum and multi-platinum sales awards in 15 countries across four continents. To date, she has sold over 14 million albums with a catalogue that includes seven studio recordings, three seasonal recordings, a live in-concert DVD and two DVD documentaries. She&#39;s won two Junos, Canada&#39;s premiere music award, garnered two GRAMMY nominations and has performed for Her Majesty Queen Elizabeth II. Less well known is the fact that Ms. McKennitt is a highly successful businesswoman who has created an independent record label with celebrated international success. Born in Morden, Manitoba, Canada, she moved to Stratford, Ontario in 1981, where she initially worked with Canada&#39;s renowned Stratford Festival. In 1985 she established her own record label, Quinlan Road, a move which has made her a rarity in the music industry. In the early years, Ms. McKennitt ran the operation from her kitchen table, selling her recordings by mail order and producing her own concert tours. Today, she leads her own company with responsibilities that include everything from creating strategic business plans to overseeing marketing and promotion. Ms. McKennitt&#39;s business acumen is also applied to the three charitable foundations she established. Her Three Oaks Foundation provides financial support to cultural, environmental, historical and social groups. The Cook-Rees Memorial Fund for Water Search and Safety, founded in 1998, has raised more than $4 million in support of water safety education, as well as search, rescue and recovery operations. In 2000, Ms. McKennitt purchased a recently-closed public school in Stratford and transformed it into the Falstaff Family Centre. Responding to concerns identified by the local community, the Centre focuses on the needs of families and children in Perth County, Ontario, which is where she resides. Ms. McKennitt&#39;s passion for business is matched by her passion for human rights. In 2006 and 2007 she was involved in a landmark human rights privacy case in Britain, where the courts ruled in her favour. The judgment, which was upheld by the House of Lords, has helped to advance privacy law around the world. Ms. McKennitt is a member of the Order of Canada and the Order of Manitoba. In 2002 and 2012 she was the recipient of Queen Elizabeth II&#39;s Golden and Diamond Jubilee medals and in 2013 she was appointed to the rank of Knight of the National Order of Arts and Letters by the Republic of France. From2006 to 2013Ms. McKennitt held the position of Honorary Colonel of the 435 Transport and Rescue Squadron in the Royal Canadian Air Force and upon completion of the appointment was awarded the RCAF Commander&#39;s Commendation in recognition of outstanding professionalism and dedication. In September 2014, Ms. McKennitt was appointed as the Honorary Colonel of the Royal Canadian Air Force by the Minister of National Defence, Rob Nicholson. She also holds honourary degrees from the University of Manitoba (Winnipeg), Sir Wilfrid Laurier University (Waterloo), Queen&#39;s University (Kingston) and George Brown College (Toronto).","modified":"2015-11-13 13:18:10","venue_display":"1","tz_country":null,"performers":{"performer":{"creator":"anya","linker":"evdb","name":"Loreena McKennitt","url":"http://concerts.eventful.com/Loreena-McKennitt?utm_source=apis&utm_medium=apim&utm_campaign=apic","id":"P0-001-000001023-7","short_bio":"Canadian celtic music singer"}},"title":"Loreena McKennitt","venue_address":"10 College Parkway","geocode_type":"EVDB Geocoder","tz_olson_path":null,"recur_string":null,"calendars":null,"owner":"evdb","going":null,"country_abbr2":"US","image":{"large":{"width":"480","url":"http://s2.evcdn.com/images/large/I0-001/000/710/997-4.jpeg_/loreena-mckennitt-97.jpeg","height":"480"}},"created":"2015-11-13 13:18:10","venue_id":"V0-001-000324798-4","tz_city":null,"stop_time":null,"venue_name":"Folsom Lake College","venue_url":"http://sacramento.eventful.com/venues/folsom-lake-college-/V0-001-000324798-4?utm_source=apis&utm_medium=apim&utm_campaign=apic"}}}

        );

        $httpBackend.expect('JSONP','http://api.eventful.com/jsonp/events/search?l=California&amp;image_sizes=block150,large&amp;app_key=ncZMbJNvDKFCTLR3&amp;page_size=1&amp;callback=angular.callbacks._5%22%20async=').respond(
		{}
        );      
        
    });

	it('Check if the events are populated', function () {
	expect(scope.getEvents).not.toBeNull();
	});
	
	it('Check if the events are populated', function () {
//	expect(scope.getEvents).toHaveBeenCalled();
	});


	it('Check if the array contains events', function () {
	expect(scope.arr).not.toBeNull();
	});

	it('Check if the array contains events', function () {
	expect(scope.result).not.toBeNull();
	});

});


// MAP FUNCTIONALITIES 


describe('HomeController', function () {
    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
      	var result = angular.element("<input type='text' ip: '129.10.18.60' hostname: 'No Hostname' city: 'Boston' region: 'Massachusetts' country:'US'/>");
	var mapOptions = angular.element("<input type='text' zoom='10'  center= ('42.3424','-71.0878')  mapTypeId='roadmap' refresh= 'true'/>");

	 var input = angular.element("<input type='text' accept='image/*' id='cityname' value='Boston'/>");
	var autoinput = 
	
	spyOn(document, 'getElementById').and.returnValue(input); 

	 google.maps['places'] ={
          Autocomplete: function(input){}
        }
        spyOn(google.maps.places, 'Autocomplete');  

	spyOn(google.maps,'Map');   

        ctrl = function () {
            return $controller('HomeController', {
                '$scope': scope
            });
        };
        var controller = ctrl();
    }));

    afterEach(function () {
    });

	 it('Test http calls to detect current location', function () {        
        $httpBackend.expect('GET','http://ipinfo.io/json').respond(
                {
                  "ip": "76.119.91.78",
                   "hostname": "c-76-119-91-78.hsd1.ma.comcast.net",
                   "city": "Boston",
  			"region": "Massachusetts",
  "country": "US",
  "loc": "42.3346,-71.0362",
  "org": "AS7922 Comcast Cable Communications, Inc.",
  "postal": "02127"
}
        );

        $httpBackend.expect('JSONP','http://api.eventful.com/jsonp/events/search?l=Boston&image_sizes=block150,large&app_key=ncZMbJNvDKFCTLR3&page_size=50&callback=JSON_CALLBACK').respond(
		{}
        );      
        
    });

	it('Check for the resulting city loaded', function () {
	expect(scope.result).not.toBeNull();
});

	it('Check if the location attributes loaded', function () {
	expect(scope.location).not.toBeNull();
});

	it('Check if the values are loaded into the map attributes ', function () {
	expect(scope.mapOptions).not.toBeNull();
});
	
	it('Check if the values are loaded into the map attributes ', function () {
//	expect(scope.mapOptions).toContain("Boston");
});
	
	it('Check if the map values are loaded', function () {
	expect(scope.map).not.toBeNull;
	});

});

// PREFERRED EVENTS

describe('HomeController', function () {
    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();  
	
	//spyOn(scope,'getEvents').respond('Boston');
        ctrl = function () {
            return $controller('HomeController', {
                '$scope': scope
            });
        };
        var controller = ctrl();
    }));
    afterEach(function () {
    });   


it('Check the preferred events are populated', function () {
	expect(scope.rEvents).not.toBeNull();
	});


});





// SEARCH EVENTS

describe('HomeController', function () {
    var scope, $httpBackend, ctrl, modal;
    beforeEach(angular.mock.module('mainApp'));

    beforeEach(angular.mock.inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
    	var mapvalues = angular.element("<input type='text' zoom='10'  center= ('42.3424','-71.0878')  mapTypeId='roadmap' refresh= 'true'/>");
	
        //spyOn(scope, 'searchEvents');
	
	$httpBackend.expect('JSONP','http://api.eventful.com/jsonp/events/search?l=California&amp;image_sizes=block150,large&amp;app_key=ncZMbJNvDKFCTLR3&amp;page_size=1&amp;callback=angular.callbacks._5%22%20async=').respond(
		{}
        );      
        
        ctrl = function () {
            return $controller('HomeController', {
                '$scope': scope
            });
        };
        var controller = ctrl();
    }));

    afterEach(function () {
    });

	it('Check if the search functionality is invoked', function () {
	expect(scope.searchEvents).not.toBeFalsy();
});


});



