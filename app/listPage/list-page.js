/**
 * Created by austin on 3/1/16.
 */


(function() {
    var app = angular.module('list-page', ['ngRoute', 'location-directives']);

    /* Will get fancier with this in the future. Potentially for individual location views. */
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/call', {controller: 'ListPageController'});   // Will use this for call handling
        $routeProvider.otherwise({redirectTo: '/list'});
    }]);

    app.controller('ListPageController', function($scope, $routeParams, $location) {
        var listPageCtrl = this;
        this.isAdding = $location.$$path === '/add';
        this.map = document.querySelector('google-map');
        this.currentLatLng = null;

        this.map.addEventListener('google-map-ready', function(e) {
            // Try to center the map with the users current position
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        //success
                        console.log("Got the users current location!");
                        listPageCtrl.currentLatLng = [position.coords.latitude, position.coords.longitude];
                        listPageCtrl.zoomToLocation(listPageCtrl.currentLatLng);
                    }, function (error) {
                        // error
                        console.log("Couldn't get user's current location");
                    });
            }
        });

        this.setIsAdding = function(show) {
            console.log("isAdding: " + show);
            this.isAdding = show;
        };

        /**
         *  Easier to work with google maps api
         * @param latLng, {{lat: float, lng: float}}
         */
        this.zoomToLocation = function(latLng) {
            this.map.latitude = latLng.lat;
            this.map.longitude = latLng.lng;
        }
    });
})();