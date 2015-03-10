/**
 * @file Model for MenuView.
 * @module MenuModel
 * @requires module:backbone
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var Backbone = require('backbone'),
    NZTAComponents = require('nzta-map-components');

var MenuModel = Backbone.Model.extend({

    defaults: {
        regions: new NZTAComponents.GeoJsonCollection(),
        events: new NZTAComponents.GeoJsonCollection()
    }

});

module.exports = MenuModel;
