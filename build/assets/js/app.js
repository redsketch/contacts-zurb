(function() {
	'use strict';
	
	angular.module('application', [
		'ui.router',
		'ngAnimate',
		
		//foundation
		'foundation',
		'foundation.dynamicRouting',
		'foundation.dynamicRouting.animations',
		
		// Dependencies
		'shared.contacts',
		'contactList',
		'contactDetail'
	]).
	config(config).
	run(run).
	controller('MainNavCtrl', mainNavCtrl).
	controller('ContactsCtrl', contactsCtrl);
	
	config.$inject = ['$urlRouterProvider', '$locationProvider'];
	mainNavCtrl.$inject = ['$rootScope'];
	contactsCtrl.$inject = ['$rootScope', '$scope', 'Contact'];
	
	function mainNavCtrl($rootScope) {
		// OffCanvas is off
		$rootScope.offCanvas = false;
		
		// Function for turning off the offCanvas
		$rootScope.offCanvasFalse = function () {
			$rootScope.offCanvas = false;
		}
		
		$rootScope.$on('offCanvasTrue', function (event, mass) {
			// Turn the offCanvas on
			$rootScope.offCanvas = true;
		});
	}
	
	function contactsCtrl($rootScope, $scope, Contact) {
		$scope.searchContact = '';
		$scope.contacts = Contact.all({first_name: $scope.searchContact});
		
		$scope.getDetails = function (contactId) {
			$scope.contact = Contact.details({contact_id: contactId});
			
			$rootScope.$emit('offCanvasTrue', true);
		};
		
		$scope.hoverIn = function () {
			this.test = 'In';
		}
		
		$scope.hoverOut = function () {
			this.test = 'Out';
		}
		
		$scope.emptyOrNull = function(item){
		  return !(item.Message === null || item.Message.trim().length === 0)
		}
	}
	
	function config($urlProvider, $locationProvider) {
		$urlProvider.otherwise('/');
		
		$locationProvider.html5Mode({
			enabled:true,
			requireBase: false
		});
		
		$locationProvider.hashPrefix('!');
	}
	
	function run() {
		FastClick.attach(document.body);
	}

})();

(function () {
	angular.module('contactList', ['shared', 'contactDetail']);
})();

(function () {
	angular.module('shared', ['shared.contacts']);
})();

(function () {
	angular.module('contactDetail', ['shared']);
})();

(function () {
	angular.module('shared.contacts', ['ngResource']);
})();

(function () {
	angular.
		module('shared.contacts').
		factory('Contact', ['$resource',
		function($resource) {
		  return $resource('http://localhost:8003/api/v1/contacts/:contact_id', {}, {
			all: {
			  method: 'GET',
			  params: {
				  fields: 'id,last_name,first_name'
			  },
			  isArray: true
			},
			details: {
				method: 'GET',
				params: {
					contact_id: 1
				}
			}
		  });
		}
	]);
})();

(function () {
	angular.
	  module('contactList').
	  component('contactList', {
	    templateUrl: '../../templates/contact-list.template.html',
	    controller: ('ContactListCtrl', contactListCtrl),
	    bindings: {
			contacts: '<',
			contactId: '='
		}
	  });
	
	contactListCtrl.$inject = [];
	
	function contactListCtrl() {
		//~ this.contacts = Contact.query();
		//~ 
		//~ this.contact = function () {
			//~ alert('okay');
		//~ }
		this.setContactId = function (contactId) {
			console.log(contactId);
		};
	}
})();

(function () {
	angular.
	  module('contactDetail').
	  component('contactDetail', {
	    templateUrl: '../../templates/contact-detail.template.html',
	    controller: ['Contact',
	      function ContactDetailController(Contact) {
	        this.contact = function (contactId) {
				console.log(contactId);
				return Contact.get(contactId);
			};
			
			console.log(this.contact);
	      }
	    ]
	  });
})();
