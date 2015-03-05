/**
 * @file The core map view
 * @module MapView
 * @requires module:backbone
 * @requires module:underscore
 * @requires module:jquery
 * @requires module:leaflet
 * @requires module:nzta-map-components
 * @requires module:./mapModel
 * @requires module:../../constants
 */

/*jshint node: true, unused: false */

'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Leaflet = require('leaflet'),
    NZTAComponents = require('nzta-map-components'),
    MapModel = require('./mapModel'),
    constants = require('../../constants');

var MapView = NZTAComponents.MapView.extend({

    el: '#map',

    template: false,

    layerDataPromises: [], // When requests for marker data are recieved before the marker data is fetched.

    initialize: function () {
        var self = this;

        // Call super
        NZTAComponents.MapView.prototype.initialize.call(this);

        this.model = new MapModel();

        this.map = Leaflet.map('map').setView([51.505, -0.09], 13);

        Leaflet.tileLayer('http://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
            url: "http://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png",
            subdomains: ["server", "services"],
            attribution: "ESRI, OpenStreetMap",
            maxZoom: 18,
            zIndex: 10
        }).addTo(this.map);

        // Override Leaflet CSS
        this.map._controlCorners.topright.style.marginRight = '0px';
        this.map._controlCorners.topright.style.marginTop = '0px';
        this.map._controlCorners.topright.style.fontSize = '16px';
        this.map._controlCorners.topright.style.fontFamily = "'Source Sans Pro', 'Helvetica Neue', sans-serif";

        // Remove default map controls and use our own
        this.map.removeControl(this.map.zoomControl);
        
        // Triggered when a marker is clicked, trigger is set through Mappy class map
        // this.options.mappy.on('marker.click', function (feature) {
        //     // Set a previous fragmant on the router so we can navigate back when closing the popup.
        //     NZTAComponents.router._previousFragment = Backbone.history.fragment;

        //     NZTAComponents.router.navigate('info/' + feature.properties.featureType + '/' + feature.properties.id, { trigger: true });
        // }, this);

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

    _onMapData: function () {
        // Draw markers on map.
    },

    /**
     * @func _setMapBounds
     */
    _setMapBounds: function (bounds) {
        this.map.fitBounds(bounds);
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
        console.log('TODO: Use GeoJsonCollection filter.');

        var collection = this.model.get('features'),
            feature = _.filter(collection.models, function (featureModel) {
                return featureModel.get('properties').id === featureType + '/' + urlSegment;
            });

        // If the data hasn't returned yet, set a one time listener to fire when it has.
        if (feature.length === 0) {
            this.listenToOnce(collection, 'sync', function () {
                this._handleFeatureNavigate(featureType, urlSegment);
            }, this);

            return;
        }

        this._moveToFeature(feature[0], featureType);
    },

    /**
     * @func _moveToFeature
     * @param {Object} featureModel
     */
    _moveToFeature: function (featureModel, featureType) {
        var bounds = null;

        bounds = [
            featureModel.get('geometry').coordinates[3], // South west
            featureModel.get('geometry').coordinates[1] // North east
        ];

        this._setMapBounds(bounds);
    }
});

module.exports = MapView;