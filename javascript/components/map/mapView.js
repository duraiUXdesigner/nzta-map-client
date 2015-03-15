/**
 * @file The core map view
 * @module MapView
 * @requires module:backbone
 * @requires module:underscore
 * @requires module:jquery
 * @requires module:nzta-map-components
 * @requires module:./mapModel
 * @requires module:../../constants
 */

/*jshint node: true, unused: false */

'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    NZTAComponents = require('nzta-map-components'),
    MapModel = require('./mapModel'),
    constants = require('../../constants');

var MapView = NZTAComponents.MapView.extend({

    el: '#map',

    template: false,

    initialize: function () {
        // Call super
        NZTAComponents.MapView.prototype.initialize.call(this, {
            model: new MapModel()
        });

        this.listenTo(this.options.vent, 'menu.region', function (id) {
            this._handleFeatureNavigate('regions', id);
        }, this);
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
     * @param {string} collectionName - The collection the feature belongs to e.g. 'camera' or 'event'.
     * @param {string} featureId
     * @desc Handles routing to a Map feature.
     */
    _handleFeatureNavigate: function (collectionName, featureId) {
        var collection = this.model[collectionName],
            feature = collection._getFeatureById(featureId);

        // If the data hasn't returned yet, set a one time listener to fire when it has.
        if (feature === void 0) {
            this.listenToOnce(collection, 'sync', function () {
                this._handleFeatureNavigate(collectionName, featureId);
            }, this);

            return;
        }

        this._moveToFeature(feature);
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
     * @func _onMapData
     * @param {object} features - Key value pairs of GeoJsonCollections.
     * @override
     * @desc Overriding this method to exclude 'regions' from the map.
     */
    _onMapData: function (features) {
        // Add a map layer for each feature set.
        _.each(features, function (geoJsonCollection, key) {
            var mapLayer = this._getMapLayerById(key);

            if (mapLayer === void 0 && key !== 'regions') {
                // The map layer doesn't exist yet, so create it.
                this._addMapLayer(key);
            } else if (this._mapLayerVisible(key)) {
                // The map layer exists and has not been turned off by the user, so update the markers.
                this._updateMapLayer(key);
            }
        }, this);
    }

});

module.exports = MapView;
