var jsdom = require('jsdom').jsdom;

function Window(markup, level, options) {
    var markup = markup || '<html><body><div id="map"></div></body></html>',
        level = level || null, // Will default to level3
        options = options || {};

    var doc = jsdom(markup, level, options);

    return doc.parentWindow;
}

module.exports = Window;
