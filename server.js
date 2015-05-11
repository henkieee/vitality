var express = require('express'),
    	app = express();

    	//		cluster = require('cluster'),
		//os 			= require('os'),

// app.configure(function ()
// {
//   app.use(express.static(__dirname + '/'));

//   app.use(express.logger('dev'));
// });

app.get('/', function (req, res)
{
  res.sendfile(__dirname + '/index.html');
});


app.use(function (req, res)
{
	res.sendfile(__dirname + req.url);
});

app.listen(3000);

// if (cluster.isMaster)
// {
// 	for (var i = 0; i < os.cpus().length; i++)
// 	{
// 		cluster.fork();
// 	}
	
// 	cluster.on('listening', function (worker, address)
// 	{
// 		console.log("Worker "+worker.process.pid+" listening on: "+address.port);
// 	});
	
// }
// else
// {
// 	app.listen(8884);
// }