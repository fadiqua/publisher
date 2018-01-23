'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _socketServer = require('./socketio/socketServer');

var _socketServer2 = _interopRequireDefault(_socketServer);

var _mongooseConfig = require('./config/mongooseConfig');

var _mongooseConfig2 = _interopRequireDefault(_mongooseConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3091;

var io;
// const server = http.createServer(app);
_mongooseConfig2.default.on('connected', function () {
    _mongoose2.default.Promise = global.Promise;
    // console.log('Mongoose connected to '+ config.dbUri);
    console.log('Mongoose connected to ');
    var server = _app2.default.listen(PORT, function () {
        console.log('listening on port ' + PORT);
        io = _socketServer2.default.socketServer(require('socket.io')(server));
    });
});

_mongooseConfig2.default.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

_mongooseConfig2.default.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

exports.default = {
    io: io
};
//# sourceMappingURL=index.js.map