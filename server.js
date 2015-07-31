var express = require('express'),
    	app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function (req, res)
{
  res.sendFile(__dirname + '/index.html');
});


app.use(function (req, res)
{
	res.sendFile(__dirname + req.url);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});