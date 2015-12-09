import io from 'socket.io-client';

const host = __DEV__ ? 'localhost:8080' : 'YOUR_SERVER';

const socket = io(host).connect();

console.info('Socket.io Server :: ', host);

export default socket;
