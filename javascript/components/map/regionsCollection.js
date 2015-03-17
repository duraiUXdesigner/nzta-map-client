/**
 * @module RegionsCollection
 * @requires module:nzta-map-components
 * @requires module:../../constants
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components'),
    constants = require('../../constants');

var RegionsCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: constants.DATA_ENDPOINTS.REGIONS,
    excludeFromMap: true
});

module.exports = RegionsCollection;
