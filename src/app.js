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
const rooms = new Map()


io.on('connection', (socket) => {
  
  socket.on('join', ({roomid,user}) => {
    socket.join(roomid)
    if(!rooms.has(roomid)){
        // cria sala
        rooms.set(roomid,[user])
    }else{
      // pego usuarios da sala
      const roomUsers =  rooms.get(roomid)
      socket.emit('new_user',{user:roomUsers[0]})
      // adiciona o novo user
      roomUsers.push(user)
      // atualiza a sala
      rooms.set(roomid,roomUsers)
    }
    console.log(`Adicionando usuario ${socket.id} na sala ${roomid}`)
    socket.to(roomid).emit("new_user",{user});
  });

  socket.on('updateList', ({roomid,updatedList}) => {
    socket.to(roomid).emit('updateList',  {updatedList})
  });
  socket.on('readyTrade', ({roomid,ready}) => socket.to(roomid).emit('readyTrade', ready));

});




app.use('/trade', trade);

app.use(errorHandling);

module.exports = server;
