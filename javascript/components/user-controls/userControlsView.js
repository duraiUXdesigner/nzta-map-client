/**
 * @file User controls for the map.
 * @module UserControlsView
 * @requires module:underscore
 * @requires module:nzta-map-components
 */

/*jshint node: true, multistr: true */

'use strict';

var _ = require('underscore'),
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
            </ul> \
        </div> \
    '),

    _zoomIn: function () {
        this.options.vent.trigger('userControls.zoomIn');
    },

    _zoomOut: function () {
        this.options.vent.trigger('userControls.zoomOut');
    },

    _locateUser: function () {
        this.options.vent.trigger('userControls.locateUser');
    }

});

module.exports = UserControlsView;
