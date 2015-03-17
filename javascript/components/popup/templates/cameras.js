/**
 * @file Popup template for displaying cameras.
 */

/*jshint node: true, multistr: true */

'use strict';

var cameraTemplate = '\
    <div id="popup"> \
        <a class="icon-cross close" href="javascript:void(0)"></a> \
        <h2><%= feature.name %></h2> \
        <div> \
            <img src="http://www.trafficnz.info/tas/<%= feature.imageUrl %>?t=<%= _.now() %>" /> \
            <p><%= feature.description %></p> \
            <p><%= feature.date %></p> \
        </div> \
    </div>';

module.exports = cameraTemplate;
