const assert = require('assert');

describe('Список веток', () => {
    it('Проверить заголовок страницы со списком веток', function() {
        return this.browser
            .url('/')
            .getText('.title')
                .then(text => {
                    assert.equal(text, 'Branches');
                });
    });

    it('Проверить наличие веток', function() {
        return this.browser
            .url('/')
            .isExisting('.list .list__item')
                .then(e => {
                    assert.equal(e, true);
                });
    });

    it('Проверить возможность выбора ветки', function() {
        return this.browser
            .url('/')
            .click('.list__item > a')
            .getText('.subtitle')
                .then(text => {
                    assert.deepEqual(text, ['commits', 'files']);
                });
    });
});
