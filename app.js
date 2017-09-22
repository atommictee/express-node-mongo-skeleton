var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var db = require('./model/db'),
    blob = require('./model/blobs');

var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    users = require('./routes/users');

var oauthserver = require('oauth2-server'),
    Request = oauthserver.Request,
    Response = oauthserver.Response;

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/blobs', blobs);
app.use('/users', users);
//app.use('/users', users);

var oauth = new  oauthserver({
    model: require('./model/token'),
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 4 * 60 * 60
  });

app.all('/oauth/token', function(req,res,next){
    var request = new Request(req);
    var response = new Response(res);

    oauth
        .token(request,response)
        .then(function(token) {
            // Todo: remove unnecessary values in response
            return res.json(token)
        }).catch(function(err){
            console.log('err', err)
            return res.status( 500).json(err)
        })
});

app.post('/authorise', function(req, res){
    var request = new Request(req);
    var response = new Response(res);

    return oauth.authorize(request, response).then(function(success) {
        res.json(success)
    }).catch(function(err){
        console.log(err)
        res.status(err.code || 500).json(err)
    })
});
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
