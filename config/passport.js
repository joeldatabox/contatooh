var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var config = require('./config')();
module.exports = function () {

    var Usuario = mongoose.model('Usuario');
    var githubCallback = '';
    if (config.env == 'production') {
        var githubCallback = 'http://' + config.domain + '/auth/github/callback';
    } else {
        var githubCallback = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';
    }
    console.log('githubCallback: ', githubCallback);
    passport.use(new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: githubCallback
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    /**
     * Chamado apenas UMA vez e recebe o usuário do nosso
     * banco disponibilizado pelo callback da estratégia de
     * autenticação. Realizará a serialização apenas do
     * ObjectId do usuário na sessão.
     */
    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    //Recebendo o ObjectId do usuário armazenado na sessão
    //chamado a CADA requisição
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
};