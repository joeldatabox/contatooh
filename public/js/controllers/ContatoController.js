angular.module('contatooh').controller('ContatoController', function ($scope, $routeParams, Contato) {
    console.log($routeParams.contatoId);

    if ($routeParams.contatoId) {
        Contato.get({id: $routeParams.contatoId}, function (contato) {
            $scope.contato = contato;
        }, function (error) {
            $scope.mensage = {
                texto: 'Não foi possível obter o contato.'
            };
            console.log(error);
        });
    } else {
        $scope.contato = new Contato();
    }

    $scope.salva = function () {
        console.log($scope.contato);
        $scope.contato.$save()
            .then(function () {
                $scope.mensage = {texto: 'Salvo com sucesso!'};
                //limpa o formulário
                $scope.contato = new Contato();
            }).catch(function (error) {
                $scope.mensage = {texto: 'Não foi possivel salvar!'};
            });
    };

    Contato.query(function (contatos) {
        $scope.contatos = contatos;
    });
});