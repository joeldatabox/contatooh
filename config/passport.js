var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function () {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '1dc8fd678717f027d0a6',
        clientSecret: 'c01111c94fb10709002b1609d00a572901176c7a',
        callbackURL: 'http://localhost:3000/auth/github/callback'
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
    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });

    //Recebendo o ObjectId do usuário armazenado na sessão
    //chamado a CADA requisição
    passport.deserializeUser(function(id, done){
        Usuario.findById(id).exec()
            .then(function(usuario){
                done(null, usuario);
            });
    });
};