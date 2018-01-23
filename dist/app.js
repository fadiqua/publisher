'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _services = require('./services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); /**
                             * Created by fadiqua on 28/05/17.
                             */


var app = (0, _express2.default)();

app.use((0, _morgan2.default)(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// body parser
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '50mb' }));

// passport config
app.use(_passport2.default.initialize());
_passport2.default.use(_services.localLogin);
_passport2.default.use(_services.jwtLogin);
app.use(_services.decodeSub);

// static files
app.use('/media', _express2.default.static('files'));
// api
app.use('/api', _index2.default);
// process.env.NODE_ENV = 'production'
if (process.env.NODE_ENV === 'production') {
    app.use(_express2.default.static(_path2.default.resolve(__dirname, '..', 'build')));
    app.use('/media', _express2.default.static('files'));
}
if (process.env.NODE_ENV === 'production') {
    app.get('*', function (req, res) {
        res.sendFile(_path2.default.resolve(__dirname, '..', 'build', 'index.html'));
    });
}

exports.default = app;
//# sourceMappingURL=app.js.map