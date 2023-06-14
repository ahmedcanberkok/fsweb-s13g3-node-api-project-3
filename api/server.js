const express = require('express');
const usersRouter =require('./users/users-router');
const middleware = require("./middleware/middleware");
const server = express();

server.use(express.json());
server.use(middleware.logger);




server.get('/', (req,res) => {
  res.json({message :" Server up and running..."})
}); 



// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});
server.use('/api/users',usersRouter);

module.exports = server;
