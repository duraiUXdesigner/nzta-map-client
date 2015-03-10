/**
 * @file A panel which displays a list of geographical regions.
 * @module RegionPanelView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:./regionPanelItemView
 * @requires module:../../mixins/eventsMixin
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components'),
    RegionPanelItemView = require('./regionPanelItemView'),
    eventsMixin = require('../../mixins/eventsMixin');

var RegionPanelView = NZTAComponents.DrillDownPanelView.extend({

    childView: RegionPanelItemView,

    template: _.template('\
        <div class="menu-panel"> \
            Sup \
            <ul class="items"></ul> \
        </div> \
    '),

    _onMapData: function (features) {
        // Get journeys for the current region and update the collection.
        var journeys = this._getRelationsForFeature(features.journeys.models, 'regions', this.model.get('id'));

        this.collection.set(journeys);

        // Set the open/closed display of child view event summary dropdowns.
        _.each(this.children._views, function (childView) {
            var stateObj = _.findWhere(this.eventSummaryStates, { journeyId: childView.model.get('properties').id });

            // Does the child view have an event summary dropdown that should be open?
            if (stateObj !== void 0 && stateObj.expandedSummary !== null) {
                childView._openRoadEventSummary(childView.$el.find('.pill--summary[data-type="' + stateObj.expandedSummary + '"]'));
            }
        }, this);

    }

});

Cocktail.mixin(RegionPanelView, eventsMixin);

module.exports = RegionPanelView;
