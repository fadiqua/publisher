'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stripTags = stripTags;
exports.slugify = slugify;
exports.avgWordsPerMin = avgWordsPerMin;
exports.base64Encode = base64Encode;
exports.base64Decode = base64Decode;
exports.fileUniqueName = fileUniqueName;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripTags(str) {
    return str.replace(/(<([^>]+)>)/ig, "");
}
function slugify(str) {
    return str.toString().toLowerCase().trim().replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function avgWordsPerMin(count) {
    return Math.ceil(count / 1050);
}

function base64Encode(file) {
    // read binary data
    var bitmap = _fs2.default.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64Decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    console.log('start saving...');
    // write buffer to file
    _fs2.default.writeFileSync(file, bitmap, function (err) {
        if (err) throw err;
    });
    console.log('******** File created from base64 encoded string ********');
}

function fileUniqueName() {
    return new Date().valueOf() + '-' + Math.floor(Math.random() * 99999);
}
//# sourceMappingURL=functions.js.map