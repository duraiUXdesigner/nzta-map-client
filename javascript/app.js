/**
 * @file Entry point to the application.
 * @requires module:nzta-map-components
 * @requires module:./shim
 * @requires module:./constants
 * @requires module:./components/map/mapView
 * @requires module:./components/menu/menuView
 * @requires module:./components/popup/popupView
 * @requires module:./components/user-controls/userControlsView
 */

/*jshint node: true */

(function (factory) {

    var globals = require('./shim');

    factory(globals.Backbone, globals.L);

}(function (Backbone, L) {

    'use strict';

    var NZTAComponents = require('nzta-map-components'),
        constants = require('./constants'),
        MapView = require('./components/map/mapView'),
        MenuView = require('./components/menu/menuView'),
        PopupView = require('./components/popup/popupView'),
        UserControlsView = require('./components/user-controls/userControlsView');

    var app = new Backbone.Marionette.Application();

    var vent = new Backbone.Wreqr.EventAggregator();

    var map = L.map('map').setView([-40.866119, 174.143780], 5);

    L.Icon.Default.imagePath = '/silverstripe-backbone/images';

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        zIndex: 10
    }).addTo(map);

    var mapView = new MapView({
        vent: vent,
        map: map
    });

    app.addRegions({
        menuRegion: '#menu-region',
        popupRegion: '#popup-region',
        userControlsRegion: '#user-controls-region'
    });

    // app.menuRegion.show(new MenuView({
    //     vent: vent
    // }));

    app.popupRegion.show(new PopupView({
        vent: vent
    }));

    app.userControlsRegion.show(new UserControlsView({
        vent: vent
    }));

    app.router = NZTAComponents.router;

    app.on('start', function () {
        if (Backbone.history) {
            Backbone.history.start({ 
                pushState: true,
                root: constants.ROOT_PATH
            });
        }
    });

    app.start();

}));
