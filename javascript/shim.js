/**
 * @file Allows Backbone / Marionette to be used in a Browserify application.
 */

/*jshint node: true */

var Backbone = window.Backbone,
    _ = window._,
    Cocktail = window.Cocktail;

var Leaflet = window.L = require('leaflet');

require('leaflet.markercluster');

if (Backbone === void 0) {
    Backbone = window.Backbone = require('backbone');
}

if (Backbone.Associations === void 0) {
    Backbone = require('backbone-associations');
}

if (_ === void 0) {
    _ = window._ = require('underscore');
}

if (Cocktail === void 0) {
    Cocktail = window.Cocktail = require('backbone.cocktail');
}

if (Backbone.$ === void 0) {
    Backbone.$ = require('jquery');
}

if (Backbone.Marionette === void 0) {
    Backbone.Marionette = require('backbone.marionette');
}

if (Backbone.Wreqr === void 0) {
    Backbone.Wreqr = require('backbone.wreqr');
}

module.exports = {
    Backbone: Backbone,
    _: _,
    Cocktail: Cocktail,
    Leaflet: Leaflet
};
