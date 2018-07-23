const fs = require('fs');
// const fs = require('fs-extra'); //TODO: LEAKY
// const fs = require('graceful-fs'); //TODO: LEAKY
const fg = require('fast-glob'); //TODO: LEAKY
// const _ = require('lodash');

module.exports.readFiles = function () {
    fs.readFileSync(__dirname + '/data/file-to-read.txt');
    global.gc();
};