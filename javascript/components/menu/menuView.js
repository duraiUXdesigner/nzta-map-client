/**
 * @file Base Menu component.
 * @module MenuView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./menuModel
 * @requires module:./regionPanelView
 * @requires module:../../mixins/eventsMixin
 */

/*jshint node: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    MenuModel = require('./menuModel'),
    RegionPanelView = require('./regionPanelView'),
    eventsMixin = require('../../mixins/eventsMixin');

var MenuView = NZTAComponents.DrillDownMenuView.extend({

    template: _.template('<div id="default-panel-region"></div>'),

    regions: {
        defaultPanelRegion: '#default-panel-region'
    },

    initialize: function (options) {
        this.model = new MenuModel();

        // Call super last because it adds default attributes to the model.
        NZTAComponents.DrillDownMenuView.prototype.initialize.call(this, options);
    },

    _isMenuRoute: function (params) {
        return params[0] === 'region' && params[1] !== null;
    },

    _handleMenuRoute: function (handler, params) {
        var filter,
            modelValues,
            regionTitle,
            regionPanel;

        // Wait until the required data is available before creating a panel.
        if (this.model.get('events').models.length === 0) {
            this.listenToOnce(this.model.get('events'), 'sync', function () {
                this._handleMenuRoute(handler, params);
            }, this);

            return;
        }

        filter = {
            key: params[0],
            value: params[0] + '/' + params[1]
        };

        regionTitle = this.model.get('regions').models.filter(function (regionModel) {
            return regionModel.get('properties').id === params[0] + '/' + params[1];
        });

        regionTitle = regionTitle.length > 0 ? regionTitle[0].get('properties').name + ' Traffic' : '';

        modelValues = {
            title: regionTitle,
            urlSegment: params[0] + '/' + params[1]
        };

        regionPanel = this._createPanel(RegionPanelView, 'events', filter, modelValues);

        this._showNewPanelView(regionPanel);
    },

    _onRoute: function (handler, params) {
        if (this._isMenuRoute(params)) {
            this._handleMenuRoute(handler, params);
        }
    },

    _onMapData: function (features) {
        this.model.get('regions').set(features.regions.models);
        this.model.get('events').set(features.events.models);
    }

});

Cocktail.mixin(MenuView, eventsMixin);

module.exports = MenuView;
