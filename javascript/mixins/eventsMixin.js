/**
 * @file Mixin which adds common event hooks to a view.
 * @module EventsMixin
 */

/*jshint node: true */

var eventsMixin = {

    initialize: function () {
        // Add hook for new data becoming available.
        this.listenTo(this.options.vent, 'map.update.all', function (features) {
            if (typeof this._onMapData === 'function') {
                this._onMapData(features);
            }
        }, this);
    }

};

module.exports = eventsMixin;
