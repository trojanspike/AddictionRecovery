
var Counts = { web : 0, mobile : 0 };
module.exports = function(io){
	var Sockets = {};
	io.on('connection', function(socket){
		Sockets[socket.id] = socket;
		socket.on('disconnect', function(a, b){
			delete Sockets[socket.id];
		});
	});

    function Add(Room, socket){
        Counts[Room] ++ ;
        io.of('web').emit('WebCount', ''+Counts.web );
        io.of('web').emit('MobCount', ''+Counts.mobile );
        socket.on('disconnect' , function(){
            Counts[Room] -- ;
            io.of('web').emit('WebCount', ''+Counts.web );
            io.of('web').emit('MobCount', ''+Counts.mobile );
        });
    }

	io.of('web').on('connection', function(socket){
        Add('web', socket);
    } );
	io.of('mobile').on('connection', function(socket){
        Add('mobile', socket);
    } );

};
