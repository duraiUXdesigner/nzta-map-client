/**
 * @file Child view of RegionPanelView.
 * @module RegionPanelItemView
 * @requires module:underscore
 * @requires module:jquery
 * @requires module:nzta-map-components
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
    $ = require('jquery'),
    NZTAComponents = require('nzta-map-components');

var RegionPanelItemView = NZTAComponents.DrillDownItemView.extend({

    className: 'list-item',

    tagName: 'li',

    template: _.template('\
        <a href="javascript:void(0)" data-region="<%= properties.id %>"><%= properties.name %></a> \
    '),

    events: {
        'click a': '_handleItemClick'
    },

    _handleItemClick: function (e) {
        this._parent.options.vent.trigger('menu.region', $(e.currentTarget).data('region').toString());
    }
});

module.exports = RegionPanelItemView;
