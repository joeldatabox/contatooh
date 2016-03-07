exports.config = {
    specs: ['../test/e2e/**/*Spec.js'],
    onPrepare:function(){
        browser.driver.get('http://localhost:3000')
            .then(function(){
                browser.driver.findElement(by.id('entrar')).click();
                browser.driver.findElement(by.id('login_field')).sendKeys('joelmaxxsoft');
                browser.driver.findElement(by.id('password')).sendKeys('root9014@#');
                browser.driver.findElement(by.name('commit')).click();
            });
    }
};