/**
 * @file Popup template for displaying road events.
 */

/*jshint node: true, multistr: true */

'use strict';

var roadEventsTemplate = '\
    <div id="popup"> \
        <a class="icon-cross close" href="javascript:void(0)"></a> \
        <h2><%= feature.locationArea %></h2> \
        <p><%= feature.eventDescription %></p> \
        <p><%= feature.impact %></p> \
        <p><%= feature.eventComments %></p> \
    </div>';

module.exports = roadEventsTemplate;