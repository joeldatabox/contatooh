//config do express
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
module.exports = function () {
    var app = express();

    //configura��o da porta;
    app.set('port', 3000);
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    //configura��o para arquivos serem servidos ao navegador
    app.use(express.static('./public'));

    app.use(cookieParser());
    app.use(session(
        {
            secret: 'homem avestruz',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    //configuração de seguraça extra
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    //evita vazar informções de qual tecnologia estamos uzando
    //app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));//engana invasores informando uma tecnologia errada!

    //cwd indica para o express-load onde buscar os arquivos
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
};