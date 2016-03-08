var contatoPage = function() {

    this.visitar = function() {
        browser.get('http://localhost:3000/#/contato');
    };

    this.digitarNome = function(nome) {
        return element(by.model('contato.nome')).sendKeys(nome);
    };

    this.digitarEmail = function(email) {
        return element(by.model('contato.email')).sendKeys(email);
    };

    this.salvar = function() {
        return element(by.css('.btn-primary')).click();
    };

    this.obterMensagem = function() {
        return element(by.binding('mensage.texto')).getText()
    };

    this.selecionarPrimeiraEmergenciaDaLista = function() {
        var selectDropdownbyNum = function (element, optionNum) {
            if (optionNum) {
                var options = element.getWebElement().findElements(by.tagName('emergencia'))
                    .then(function (options) {
                        options[optionNum].click();
                    });
            }
        };
//        element(by.css('option[value="0"]')).click();
    };
};
module.exports = contatoPage;