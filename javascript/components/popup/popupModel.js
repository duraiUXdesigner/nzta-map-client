/**
 * @file Data model for TrafficMapPopupView.
 * @module PopupModel
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components');

var PopupModel = NZTAComponents.PopupModel.extend({

    initialize: function () {
        // Call super
        NZTAComponents.PopupModel.prototype.initialize.call(this);

        this.cameras = new NZTAComponents.GeoJsonCollection();
        this.events = new NZTAComponents.GeoJsonCollection();
    }

});

module.exports = PopupModel;
