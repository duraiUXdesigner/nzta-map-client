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

    defaults: {
        cameras: new CamerasCollection(),
        regions: new RegionsCollection(),
        events: new RoadEventsCollection()
    },

    initialize: function () {
        this._startPolling(constants.FETCH_INTERVAL);
    },

    _doFetch: function () {
        var self = this;

        // When all requests are complete, inform the view.
        $.when(
            this.get('cameras').fetch(),
            this.get('regions').fetch(),
            this.get('events').fetch()
        ).done(function (camerasXHR, regionsXHR, roadEventsXHR) {
            self.trigger('allDataFetched', { 
                'cameras': self.get('cameras'),
                'regions': self.get('regions'),
                'events': self.get('events')
            });
        });
    }
});

module.exports = MapModel;
