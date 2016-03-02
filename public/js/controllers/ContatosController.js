angular.module('contatooh').controller('ContatosController', function ($scope, Contato) {

    $scope.contatos = [];

    $scope.filtro = '';

    $scope.mensage = {texto: ''};

    function buscaContatos() {
        Contato.query(function (contatos) {
            console.log('buscou contatos')
            $scope.contatos = contatos;
            $scope.mensage = {};
        }, function (error) {
            console.log(error);
            $scope.mensage = {texto: "Não foi possivel obter a lista de contatos"};
        })

    };
    buscaContatos();

    $scope.remove = function (contato) {
        var promise = Contato.delete({id: contato._id}, buscaContatos, function (error) {
            $scope.mensage = {texto: "Não foi possivel remover o contato"};
            console.log(error);
        });
    };
});