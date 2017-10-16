'use strict';
/*
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;
*/

/**
 * Loads configuration settings from config.json
 */
var init = function () {

    return require('./config.json');
}

module.exports = init();