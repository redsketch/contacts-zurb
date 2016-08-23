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
