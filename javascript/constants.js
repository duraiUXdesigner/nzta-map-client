/**
 * @file onstants for the Traffic Map application.
 * @module constants
 */

/*jshint node: true */

var constants = {};

constants.FETCH_INTERVAL = 60000;

constants.MAP_DEFAULT_BOUNDS = [[-29.209970, 175.987198],[-52.618591, 165.883804]];

constants.ROOT_PATH = document.getElementById('map').getAttribute('data-root');

constants.DATA_ENDPOINTS = {
    CAMERAS: '/data/cameras.json',
    REGIONS: '/data/regions.json',
    ROAD_EVENTS: '/data/events.json'
};

module.exports = constants;
