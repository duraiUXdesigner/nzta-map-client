/**
 * @file Data model for TrafficMapPopupView.
 * @module PopupModel
 * @requires module:backbone
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var Backbone = require('backbone'),
    NZTAComponents = require('nzta-map-components');

var PopupModel = NZTAComponents.PopupModel.extend({
    defaults: {
        hidden: true,
        cameras: new NZTAComponents.GeoJsonCollection(),
        events: new NZTAComponents.GeoJsonCollection()
    }
});

module.exports = PopupModel;
