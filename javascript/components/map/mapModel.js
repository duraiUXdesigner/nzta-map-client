/**
 * @file The model for MapView
 * @module MapModel
 * @requires module:underscore
 * @requires module:jquery
 * @requires module:nzta-map-components
 * @requires module:./featureCollection
 * @requires module:../../constants
 */

/*jshint node: true */

'use strict';

var _ = require('underscore'),
    $ = require('jquery'),
    NZTAComponents = require('nzta-map-components'),
    CamerasCollection = require('./camerasCollection'),
    RegionsCollection = require('./regionsCollection'),
    RoadEventsCollection = require('./roadEventsCollection'),
    constants = require('../../constants');

var TrafficMapModel = NZTAComponents.MapModel.extend({

    defaults: {
        cameras: new CamerasCollection(),
        regions: new RegionsCollection(),
        roadEvents: new RoadEventsCollection()
    },

    initialize: function () {
        var self = this;

        this._doFetch();

        setInterval(function () {
            self._doFetch();
        }, constants.FETCH_INTERVAL);
    },

    _doFetch: function () {
        var self = this;

        // When all requests are complete, inform the view.
        $.when(
            this.get('cameras').fetch(),
            this.get('regions').fetch(),
            this.get('roadEvents').fetch()
        ).done(function (camerasXHR, regionsXHR, roadEventsXHR) {

            // Add section relations.
            // _.each(self.get('sections').models, function (section) {
            //     section.get('properties').events = self.get('events')._getFeaturesByPropertyValue('section', section.get('properties').id);
            //     section.get('properties').cameras = self.get('cameras')._getFeaturesByPropertyValue('section', section.get('properties').id);
            // });

            self.trigger('allDataFetched', { 
                'cameras': self.get('cameras'),
                'regions': self.get('regions'),
                'roadEvents': self.get('roadEvents')
            });
        });
    }
});

module.exports = TrafficMapModel;
