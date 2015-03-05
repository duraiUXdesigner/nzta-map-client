/**
 * @file Allows Backbone / Marionette to be used in a Browserify application.
 */

/*jshint node: true */

var Backbone = window.Backbone,
    _ = window._;

if (Backbone === void 0) {
    Backbone = window.Backbone = require('backbone');
}

if (_ === void 0) {
    _ = window._ = require('underscore');
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
    _: _
};
