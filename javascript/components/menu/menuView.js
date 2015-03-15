/**
 * @file Base Menu component.
 * @module MenuView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./menuModel
 * @requires module:./regionPanelView
 */

/*jshint node: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    MenuModel = require('./menuModel'),
    RegionPanelView = require('./regionPanelView');

var MenuView = NZTAComponents.DrillDownMenuView.extend({

    template: _.template('<div id="default-panel-region"></div>'),

    regions: {
        defaultPanelRegion: '#default-panel-region'
    },

    initialize: function (options) {
        // Call super
        NZTAComponents.DrillDownMenuView.prototype.initialize.call(this, {
            model: new MenuModel(),
            defaultPanel: RegionPanelView,
            defaultCollectionKey: 'regions'
        });
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
        if (this.model.events.models.length === 0) {
            this.listenToOnce(this.model.events, 'sync', function () {
                this._handleMenuRoute(handler, params);
            }, this);

            return;
        }

        filter = {
            key: params[0],
            value: params[0] + '/' + params[1]
        };

        regionTitle = this.model.regions.models.filter(function (regionModel) {
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
        this.model.regions.set(features.regions.models);
        this.model.events.set(features.events.models);
    }

});

module.exports = MenuView;
