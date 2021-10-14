const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public', { cacheControl: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: __dirname + '/views/_templates/' + 'layout.ejs' });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//compression (response gzip)
const compression = require('compression');
app.use(compression());

//authentication
app.use(express.json({ limit: '25mb', extended: true }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

//Pass arguments to all pages
app.use(function (req, res, next) {
  for (let key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  res.locals.query = req.query;
  res.locals.url = req.url;
  res.locals.user = req.user;
  next();
});

//routes for all pages
app.use(require('./routes')(express));

//start app
const server = app.listen(80, () => {
  // server.keepAliveTimeout = 5;
  console.log("Server Started at port 80");
});
