import io from 'socket.io-client';

const host = __DEV__ ? 'localhost:8080' : 'https://pizzaking.herokuapp.com/';

const socket = io(host).connect();

console.info('Socket.io Server :: ', host);

export default socket;
