/**
 * @file Used to display information relating to a Traffic Map Feature.
 * @module PopupView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./popupModel
 * @requires module:./templates/cameras
 */

/*jshint multistr: true, node: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    PopupModel = require('./popupModel'),
    cameraTemplate = require('./templates/cameras'),
    roadEventsTemplate = require('./templates/roadEvents');

var PopupView = NZTAComponents.PopupView.extend({

    template: function (model) {
        var tmpl;

        // Conditional template switching...
        switch (model.featureType) {
            case 'camera':
                tmpl = _.template(cameraTemplate)(model);
                break;
            case 'event':
                tmpl = _.template(roadEventsTemplate)(model);
                break;
            default:
                tmpl = '';
        }

        return tmpl;
    },

    initialize: function () {
        // Call super
        NZTAComponents.PopupView.prototype.initialize.call(this, {
            model: new PopupModel()
        });
    },

    _isPopupRoute: function (params) {
        var isPopupRoute = true;

        switch (params[0]) {
            case 'cameras':
                break;
            case 'events':
                break;
            default:
                isPopupRoute = false;
        }

        return isPopupRoute;
    },

    _handlePopupRoute: function (params) {
        var collectionName = params[0],
            collection = this.model[collectionName];

        // If there's no data available yet, wait until there is before handling the route.
        if (collection.length === 0) {
            this.listenToOnce(this.model[collectionName], 'add', function () {
                this._handlePopupRoute(params);
            }, this);

            return;
        }

        this._openPopup(collection._getFeatureById(params[1]));
    },

    _onRoute: function (handler, params) {
        if (this._isPopupRoute(params)) {
            this._handlePopupRoute(params);
        } else {
            this._closePopup();
        }
    },

    _onMapData: function (features) {
        var collection,
            featureId;

        this.model.cameras.set(features.cameras.models);
        this.model.events.set(features.events.models);

        // If a popup is open, re-render it, showing the new data.
        if (this.model.get('hidden') === false) {
            collection = this.model[this.model.feature.get('properties').featureType + 's'];
            featureId = this.model.feature.get('properties').id;

            this._openPopup(collection._getFeatureById(featureId));
            this.render();
        }
    }
});

module.exports = PopupView;
