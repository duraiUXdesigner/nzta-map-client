# nzta-map-client

[![Build Status](https://travis-ci.org/flashbackzoo/nzta-map-client.svg?branch=master)](https://travis-ci.org/flashbackzoo/nzta-map-client)

Client application for NZTA Maps. Built on top of [nzta-map-components](https://github.com/silverstripe-iterators/nzta-map-components).

Check the [demo site](http://flashbackzoo.github.io/nzta-map-client).

Note: This application assumes you're fetching GeoJSON with NZTA specific properties defined.

## Install
Include the module as a dependency:

`npm install nzta-map-client --save`

## Setup
By default, the application uses static JSON files in the `data` directory as endpoints. You'll want to changes those. Open `javascript\constants.js` and update `constants.DATA_ENDPOINTS` to your endpoints. These constants are used by the collections in `javascript/components/map`.

Rebuild the bundle file by running `npm run build:all:prod`.

Include the following CSS and JavaScript files in your page:

- css/normalize.css
- css/leaflet.css
- css/main.css
- javascript/dist/bundle.js
