var ID_CONTATO_INC = 10;
module.exports = function () {
    var controller = {};
    var contatos = [
        {_id: 1, nome: 'Contao Exemplo 1', email: 'cont1@empresa.com.br'},
        {_id: 2, nome: 'Contao Exemplo 2', email: 'cont2@empresa.com.br'},
        {_id: 3, nome: 'Contao Exemplo 3', email: 'cont3@empresa.com.br'},
        {_id: 4, nome: 'Contao Exemplo 4', email: 'cont4@empresa.com.br'}
    ];
    controller.listaContatos = function (req, res) {
        res.json(contatos);
    };

    controller.obtemContato = function (req, res) {
        console.log(req.params.id);
        var idContato = req.params.id;
        var contato = contatos.filter(function (contato) {
            return contato._id == idContato;
        })[0];
        contato ? res.json(contato) : res.status(404).send('Contato n�o encontrado');
    };

    controller.removeContato = function (req, res) {
        var idContato = req.params.id;
        console.log('API: removeContato: ');
        contatos = contatos.filter(function (contato) {
            return contato._id != idContato;
        });
        res.status(204).end();
    };

    controller.salvaContato = function (req, res) {
        var contato = req.body;
        contato = contato._id ? atualiza(contato) : adiciona(contato);
    };

    function adiciona(contato){
        contato._id = ++ ID_CONTATO_INC;
        contatos.push(contato);
        return contato;
    };

    function atualiza(contato){
        contatos=contatos.map(function(value){
            if(value._id == contato._id){
                value = contato;
            }
            return value;
        });
        return contato;
    };
    return controller;
};