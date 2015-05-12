var express = require('express'),
    	app = express();

app.get('/', function (req, res)
{
  res.sendFile(__dirname + '/index.html');
});


app.use(function (req, res)
{
	res.sendFile(__dirname + req.url);
});

app.listen(3000);