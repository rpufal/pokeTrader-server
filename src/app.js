const express = require('express');
require('dotenv/config');
const bodyParser = require('body-parser');
const errorHandling = require('./middlewares/errorHandling');
const trade = require('./routes/trade');
const cors = require('cors');
const http = require('http');

const app = express();
const port = process.env.PORT || 3001;

console.log(`Api rodando na porta ${port}!`);


const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
});
server.listen(port);


app.use(cors());
app.use(bodyParser.json());


io.on('connection', (socket) => {
  socket.on('user', ({user}) => {
    socket.broadcast.emit('user', user)
  })
  socket.on('userPokemon', (updatedList, username) => {
    socket.broadcast.emit('partnerPokemon', {updatedList, username})
  });
  socket.on('readyTrade', ({ready}) => socket.broadcast.emit('readyTrade', ready));
});




app.use('/trade', trade);

app.use(errorHandling);

module.exports = server;
