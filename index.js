var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
	var msg1=0;
	var msg2=0;	
io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('counter',function(msg){
    msg1=msg;
    msg2=msg2+msg1;
    io.emit('counter',msg2);
    console.log(msg2);
  });
  socket.on('disconnect', function(){
   	msg2=msg2-1;
    io.emit('counter',msg2);
        console.log(msg2);

  });

  socket.on('data', function(msg){
        console.log(msg);
            io.emit('data',msg);

  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});	