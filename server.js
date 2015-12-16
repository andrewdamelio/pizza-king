const path = require('path');
const express = require('express');
const webpack = require('webpack');
const winston = require('winston');
const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;
const DOMAIN = '0.0.0.0';


if (process.env.NODE_ENV !== 'production') {
  winston.info('Bundling webpack... Please wait.');

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
const io = socketIo.listen(server);

server.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }
  winston.info(`Listening at http://${ DOMAIN }:${ PORT }`);
});

var createPizza = require('./src/utils/createPizza');


var users = {
  player1: null,
  player2: null,
};

var chatLog = [{
  name: "bot",
  msg: "Hello, welcome to Pizza King",
}];

var pizzaData;
var replayFlag = false;

io.on('connection', (socket) => {
  var user;
  var myId = socket.conn.id;

  if (!users.player1) {
    users.player1 = myId;
    user = 'player1';
  } else if (!users.player2) {
    users.player2 = myId;
    user = 'player2';
  }
  if (user) {


    io.sockets.emit('resetGame');
    pizzaData = createPizza();
    io.sockets.emit('updatePizza', pizzaData);
    io.sockets.emit('chatMsg', chatLog);
    socket.emit('welcome', {
      player: user,
      players: users,
      pizza: pizzaData
    });

    socket.broadcast.emit('join', {
      player: user,
      players: users
    });

    winston.info('WELCOME-1', user);
    winston.info('WELCOME-2', users);

    socket.on('disconnect', ()=> {
      winston.info('BYE-1', user);
      winston.info('BYE-2', users[user]);
      socket.broadcast.emit('quit', user);
      if (users[user]) {
        users[user] = null;
        user = null;
      }
      winston.info('BYE-3', users);
    });

    socket.on('chatMsg', (data) => {
      chatLog.push({
        name: user,
        msg: data
      });
      io.sockets.emit('chatMsg', chatLog);
    });

    socket.on('replay', (data) => {
      io.sockets.emit('replay', data);
    });

    socket.on('moved', (data) => {
      socket.broadcast.emit('other_player_moved', data);
    });

    socket.on('grow', (data) => {
      socket.broadcast.emit('grow', data);
    });

    socket.on('shrink', (data) => {
      socket.broadcast.emit('shrink', data);
    });

    socket.on('speedUp', (data) => {
      socket.broadcast.emit('speedUp', data);
    });

    socket.on('updatePizza', (data) => {
      pizzaData = data;
      socket.broadcast.emit('updatePizza', pizzaData);
    });

    socket.on('restartGame', () => {
      pizzaData = createPizza();
      io.sockets.emit('updatePizza', pizzaData);
      io.sockets.emit('resetGame');
    });
  }
});
