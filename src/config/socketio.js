import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3092');

export default socket;
