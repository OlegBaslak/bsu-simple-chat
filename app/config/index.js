'use strict';

/**
 * Loads configuration settings from config.json
 */
var init = function () {

    return require('./config.json');
};

module.exports = init();