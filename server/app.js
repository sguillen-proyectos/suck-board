var  io = require('socket.io').listen(8080);
var clients = {};

var courses = {
  "mat" : {},
  "qui" : {}
};

io.sockets.on('connection', function(socket) {
  clients[socket.id] = socket;

  socket.on('data-sent', function(data) {
    for(var k in clients) {
      if (clients[k].id !== this.id) {
        clients[k].emit('draw-data', data);
      }
    }
  });
  socket.on('connect-course', function(data) {
  });
  socket.on('init-position', function(data) {
    for(var k in clients) {
      if (clients[k].id !== this.id) {
        clients[k].emit('init-position', data);
      }
    }
  });
  socket.on('disconnect', function() {
    delete clients['' + this.id];
  });
});
