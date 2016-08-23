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
