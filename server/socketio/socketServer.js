import db from '../models/index';

const sockets = [];
const users = {};
let socket = null;

export const socketServer = (io) => {
  io.on('connection', (client) => {
    socket = client;
    sockets.push(client);
    users.lastConnected = client.id;
    console.log('a user connected');
    console.log(sockets.length);
    client.on('disconnect', () => {
      console.log('user disconnected');
      for (const key in users) {
        if (users[key] === client.id) {
          delete users[key];
          break;
        }
      }
      sockets.splice(sockets.indexOf(client), 1);
      socket = null;
    });
    // client.on('login', ({username}) => {
    //     console.log('login listener ', username);
    //     client.emit('users.login', {username: 'fadi emit'});
    // });
  });

  io.listen(3092);
  console.log('io connected on port 3092');
  return io;
};

export { sockets };
export { socket };
export { users };

