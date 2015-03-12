/**
 * @file The core map view
 * @module MapView
 * @requires module:backbone
 * @requires module:underscore
 * @requires module:jquery
 * @requires module:nzta-map-components
 * @requires module:./mapModel
 * @requires module:../../constants
 * @requires module:../../mixins/eventsMixin
 */

/*jshint node: true, unused: false */

'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    NZTAComponents = require('nzta-map-components'),
    MapModel = require('./mapModel'),
    constants = require('../../constants'),
    eventsMixin = require('../../mixins/eventsMixin');

var MapView = NZTAComponents.MapView.extend({

    el: '#map',

    template: false,

    initialize: function () {
        var self = this;

        // Call super
        NZTAComponents.MapView.prototype.initialize.call(this);

        this.model = new MapModel();

        // Listen for when all pre-fetched data calls have returned.
        this.listenTo(this.model, 'allDataFetched', function (features) {
            this.options.vent.trigger('map.update.all', features);
        }, this);
    },

    _onRoute: function (handler, params) {
        switch (params[0]) {
            case null:
                this._handleRootNavigate();
                break;
            default:
                this._handleFeatureNavigate(params[0], params[1]);
                break;
        }
    },

    /**
     * @func _handleRootNavigate
     * @desc When navigating to a the map root.
     */
    _handleRootNavigate: function () {
        this._setMapBounds(constants.MAP_DEFAULT_BOUNDS);
    },

    /**
     * @func _handleFeatureNavigate
     * @param {String} featureType The type of feature e.g. 'region' or 'section'.
     * @param {String} urlSegment
     * @desc When navigating to a region, we need to fetch section data for that region, and pan the map to that region.
     */
    _handleFeatureNavigate: function (featureType, urlSegment) {
        var collection = this.model.get(featureType + 's'),
            feature = collection._getFeatureById(urlSegment);

        // If the data hasn't returned yet, set a one time listener to fire when it has.
        if (feature === void 0) {
            this.listenToOnce(collection, 'sync', function () {
                this._handleFeatureNavigate(featureType, urlSegment);
            }, this);

            return;
        }

        this._moveToFeature(feature);
    }

});

Cocktail.mixin(MapView, eventsMixin);

module.exports = MapView;
