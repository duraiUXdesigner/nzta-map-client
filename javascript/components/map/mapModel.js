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

var MapModel = NZTAComponents.MapModel.extend({

    initialize: function () {
        this.cameras = new CamerasCollection();
        this.regions = new RegionsCollection();
        this.events = new RoadEventsCollection();

        this._startPolling(constants.FETCH_INTERVAL);
    },

    _doFetch: function () {
        var self = this;

        // When all requests are complete, inform the view.
        $.when(
            this.cameras.fetch(),
            this.regions.fetch(),
            this.events.fetch()
        ).done(function (camerasXHR, regionsXHR, roadEventsXHR) {
            self.trigger('allDataFetched', { 
                'cameras': self.cameras,
                'regions': self.regions,
                'events': self.events
            });
        });
    }
});

module.exports = MapModel;
