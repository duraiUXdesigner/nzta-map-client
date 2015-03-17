/**
 * @file User controls for the map.
 * @module UserControlsView
 * @requires module:underscore
 * @requires module:nzta-map-components
 * @requires module:jquery
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
    $ = require('jquery'),
    NZTAComponents = require('nzta-map-components');

var UserControlsView = NZTAComponents.UserControlsView.extend({

    template: _.template('\
        <div id="user-controls"> \
            <!-- <ul class="controls-list secondary-controls"> \
                <a id="mobile-control-map-button" class="control-item" href="javascript:void(0)">Map</a> \
                <a id="mobile-control-list-button" class="control-item" href="javascript:void(0)">List</a> \
            </ul> --> \
            <ul class="controls-list primary-controls"> \
                <li class="control-item"> \
                    <a id="zoomIn" class="icon-zoom-in" href="javascript:void(0)">&nbsp;</a> \
                </li> \
                <li class="control-item"> \
                    <a id="zoomOut" class="icon-zoom-out" href="javascript:void(0)"></a> \
                </li> \
                <li class="control-item"> \
                    <a id="locate" class="icon-compass" href="javascript:void(0)"></a> \
                </li> \
                <li class="control-item"> \
                    <a id="mapLayerFilters" class="icon-stack" href="javascript:void(0)"></a> \
                </li>\
                <ul id="mapLayerFiltersList" class="<% if (!mapLayerFiltersOpen) { %>hidden<% } %>"> \
                    <li> \
                        <a class="map-layer-filter icon-checkbox-checked" href="javascript:void(0)" data-layer="cameras">Cameras</a> \
                    </li> \
                    <li> \
                        <a class="map-layer-filter icon-checkbox-checked" href="javascript:void(0)" data-layer="events"></span>Road events</a> \
                    </li> \
                </ul> \
            </ul> \
        </div> \
    '),

    initialize: function () {
        NZTAComponents.UserControlsView.prototype.initialize.call(this);

        // When a layer filter is clicked, we want to update a CSS class.
        this.listenTo(this.options.vent, 'userControls.toggleMapLayer', function (layer) {
            var $filter = this.$el.find('.map-layer-filter[data-layer="' + layer + '"]'),
                filterIsChecked = $filter.hasClass('icon-checkbox-checked');

            $filter.removeClass (function (index, css) {
                return (css.match (/(^|\s)icon-checkbox-\S+/g) || []).join(' ');
            });

            if (filterIsChecked) {
                $filter.addClass('icon-checkbox-unchecked');
            } else {
                $filter.addClass('icon-checkbox-checked');
            }
        }, this);
    },
    
    /**
     * @function _toggleMapLayerFilters
     * @override
     */
    _toggleMapLayerFilters: function () {
        // Toggle the mapLayerFiltersOpen value.
        this.model.set('mapLayerFiltersOpen', this.model.get('mapLayerFiltersOpen') === false);

        this.render();
    }

});

module.exports = UserControlsView;
