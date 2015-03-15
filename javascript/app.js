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

'use strict';

var NZTAComponents = require('nzta-map-components'),
    Backbone = require('backbone'),
    constants = require('./constants'),
    MapView = require('./components/map/mapView'),
    MenuView = require('./components/menu/menuView'),
    PopupView = require('./components/popup/popupView'),
    UserControlsView = require('./components/user-controls/userControlsView');

Backbone.$ = require('jquery');
Backbone.Marionette = require('backbone.marionette');
Backbone.Wreqr = require('backbone.wreqr');

var app = new NZTAComponents.Application({
    rootPath: constants.ROOT_PATH
});

var vent = new Backbone.Wreqr.EventAggregator();

var mapView = new MapView({
    vent: vent
});

app.addRegions({
    menuRegion: '#menu-region',
    popupRegion: '#popup-region',
    userControlsRegion: '#user-controls-region'
});

app.menuRegion.show(new MenuView({
    vent: vent
}));

app.popupRegion.show(new PopupView({
    vent: vent
}));

app.userControlsRegion.show(new UserControlsView({
    vent: vent
}));

app.start();
