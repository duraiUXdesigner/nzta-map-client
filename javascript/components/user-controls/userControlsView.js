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
                    <a id="zoomIn" href="javascript:void(0)">Zoom in</a> \
                </li> \
                <li class="control-item"> \
                    <a id="zoomOut" href="javascript:void(0)">Zoom out</a> \
                </li> \
                <li class="control-item"> \
                    <a id="locate" href="javascript:void(0)">My location</a> \
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
