/**
 * @file A panel which displays a list of geographical regions.
 * @module RegionPanelView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./regionPanelItemView
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    RegionPanelItemView = require('./regionPanelItemView');

var RegionPanelView = NZTAComponents.DrillDownPanelView.extend({

    childView: RegionPanelItemView,

    template: _.template('\
        <div class="menu-panel"> \
            <h2>Regions:</h2> \
            <ul class="items"></ul> \
        </div> \
    '),

    _onMapData: function (features) {
        this.collection.set(features.regions.models);
    }

});

module.exports = RegionPanelView;
