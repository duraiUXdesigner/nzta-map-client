/**
 * @module CamerasCollection
 * @requires module:nzta-map-components
 * @requires module:../../constants
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components'),
    constants = require('../../constants');

var CamerasCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: constants.DATA_ENDPOINTS.CAMERAS
});

module.exports = CamerasCollection;
