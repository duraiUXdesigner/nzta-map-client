/**
 * @module RoadEventsCollection
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components');

var RoadEventsCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: '/data/events.json'
});

module.exports = RoadEventsCollection;
