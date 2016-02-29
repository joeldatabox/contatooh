//config do express
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var home = require('../app/routes/home');

module.exports = function () {
    var app = express();

    //configuração da porta;
    app.set('port', 3000);
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    //configuração para arquivos serem servidos ao navegador
    app.use(express.static('./public'));
    //cwd indica para o express-load onde buscar os arquivos
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
};