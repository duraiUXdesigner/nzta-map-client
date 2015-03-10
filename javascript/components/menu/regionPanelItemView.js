/**
 * @file Child view of RegionPanelView.
 * @module RegionPanelItemView
 * @requires module:underscore
 * @requires module:nzta-map-components
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
    NZTAComponents = require('nzta-map-components');

var RegionPanelItemView = NZTAComponents.DrillDownItemView.extend({

    className: 'list__item',

    template: _.template('\
        <div class="menu-item"> \
            sup \
        </div> \
    ')
});

module.exports = RegionPanelItemView;
