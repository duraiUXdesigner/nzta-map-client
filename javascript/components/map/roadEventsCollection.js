/**
 * @module RoadEventsCollection
 * @requires module:nzta-map-components
 * @requires module:../../constants
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components'),
    constants = require('../../constants');

var RoadEventsCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: constants.DATA_ENDPOINTS.ROAD_EVENTS
});

module.exports = RoadEventsCollection;
