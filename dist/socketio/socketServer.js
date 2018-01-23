'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sockets = [];
var users = {};
var socket = null;

var socketServer = function socketServer(io) {
    io.on('connection', function (client) {
        socket = client;
        sockets.push(client);
        users.lastConnected = client.id;
        console.log('a user connected');
        console.log(sockets.length);
        client.on('disconnect', function () {
            console.log('user disconnected');
            for (var key in users) {
                if (users[key] === client.id) {
                    delete users[key];
                    break;
                }
            }
            sockets.splice(sockets.indexOf(client), 1);
            socket = null;
        });
        client.on('login', function (_ref) {
            var username = _ref.username;

            console.log('login listener ', username);
            client.emit('users.login', { username: 'fadi emit' });
        });
    });

    io.listen(3092);
    console.log('io connected on port 3092');
    return io;
};

exports.default = {
    socketServer: socketServer,
    sockets: sockets,
    socket: socket,
    users: users
};
//# sourceMappingURL=socketServer.js.map