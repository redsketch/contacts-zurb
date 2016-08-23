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
