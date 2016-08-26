(function () {
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

    /*global angular */

    /**
     * Directive that executes an expression when the element it is applied to gets
     * an `escape` keydown event.
     */
    angular.module('application')
            .directive('hitEscape', function () {
                'use strict';

                var ESCAPE_KEY = 27;

                return function (scope, elem, attrs) {
                    elem.bind('keydown', function (event) {
                        if (event.keyCode === ESCAPE_KEY) {
                            scope.$apply(attrs.hitEscape);
                        }
                    });

                    scope.$on('$destroy', function () {
                        elem.unbind('keydown');
                    });
                };
            });


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
        
        // Get all contacts
        var contacts = $scope.contacts = Contact.all({first_name: $scope.searchContact});
        $scope.editedContactField = null;
        
        // Contact details
        $scope.contact = {};

        $scope.getDetails = function (contactId) {
            
            $scope.contact = Contact.details({contact_id: contactId});

            $rootScope.$emit('offCanvasTrue', true);
        };

        $scope.hoverIn = function () {
            this.test = 'In';
        };

        $scope.hoverOut = function () {
            this.test = 'Out';
        };

        $scope.editContact = function (field, contact) {
            $scope.editedContactField = field;

            $scope.originalContact = angular.extend({}, contact);
        };
        
        $scope.revertEdits = function (contact) {
            $scope.contact = $scope.originalContact;
            console.log($scope.originalContact);
            
            $scope.editedContactField = null;
            $scope.originalContact = null;
            $scope.reverted = true;
            
        };

        $scope.emptyOrNull = function (item) {
            return !(item.Message === null || item.Message.trim().length === 0);
        };
    }

    function config($urlProvider, $locationProvider) {
        $urlProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $locationProvider.hashPrefix('!');
    }

    function run() {
        FastClick.attach(document.body);
    }

})();
