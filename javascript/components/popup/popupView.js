/**
 * @file Used to display information relating to a Traffic Map Feature.
 * @module PopupView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./popupModel
 * @requires module:../../mixins/eventsMixin
 */

/*jshint multistr: true, node: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    PopupModel = require('./popupModel'),
    eventsMixin = require('../../mixins/eventsMixin');

var PopupView = NZTAComponents.PopupView.extend({

    template: _.template('\
        <div id="popup">sup</div> \
    '),

    initialize: function () {
        // Call super
        NZTAComponents.PopupView.prototype.initialize.call(this);

        this.model = new PopupModel();
    },

    _isPopupRoute: function (params) {
        var isPopupRoute = true;

        if (params[0] !== 'info') {
            return false;
        }

        switch (params[1]) {
            case 'camera':
                break;
            case 'event':
                break;
            default:
                isPopupRoute = false;
        }

        return isPopupRoute;
    },

    _handlePopupRoute: function (params) {
        var collectionName = params[1] + 's';

        // If there's no data available yet, wait until there is before handling the route.
        if (this.model.get(collectionName).length === 0) {
            this.listenToOnce(this.model.get(collectionName), 'add', function () {
                this._handlePopupRoute(params);
            }, this);

            return;
        }

        this._openPopup(this._getFeatureById(this.model.get(collectionName).models, params[2]));
    },

    _onRoute: function (handler, params) {
        if (this._isPopupRoute(params)) {
            this._handlePopupRoute(params);
        }
    },

    _onMapData: function (features) {
        this.model.get('cameras').set(features.cameras.models);
        this.model.get('events').set(features.roadEvents.models);

        // If a popup is open, re-render it, showing the new data.
        if (this.model.get('hidden') === false && this.model.get('feature').properties !== void 0) {
            this._openPopup(this._getFeatureById(this.model.get(this.model.get('type') + 's').models, this.model.get('feature').properties.id));
        }

        this.render();
    }
});

Cocktail.mixin(PopupView, eventsMixin);

module.exports = PopupView;
