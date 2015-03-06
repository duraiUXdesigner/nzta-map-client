/**
 * @module CamerasCollection
 * @requires module:nzta-map-components
 */

/*jshint node: true */

'use strict';

var NZTAComponents = require('nzta-map-components');

var CamerasCollection = NZTAComponents.GeoJsonCollection.extend({
    model: NZTAComponents.GeoJsonModel,
    url: '/rest/cameras'
});

module.exports = CamerasCollection;
