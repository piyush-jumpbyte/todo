const http = require('http');
const app = require('./app');


const server = http.createServer(app);

server.listen(8080, function(req,res){
  console.log('server started : 8080')
})