import mongoose from 'mongoose';
import app from './app';
import { socketServer } from './socketio/socketServer';
import mongooseConnction from './config/mongooseConfig';

const PORT = process.env.PORT || 3091;

let io;
// const server = http.createServer(app);
mongooseConnction.on('connected', () => {
  mongoose.Promise = global.Promise;
  // console.log('Mongoose connected to '+ config.dbUri);
  console.log('Mongoose connected to ');
  const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    io = socketServer(require('socket.io')(server));
  });
});

mongooseConnction.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongooseConnction.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

export default {
  io,
};
