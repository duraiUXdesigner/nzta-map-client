/**
 * @module RegionsCollection
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components');

var RegionsCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: '/data/regions.json',
    excludeFromMap: true
});

module.exports = RegionsCollection;
