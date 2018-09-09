const assert = require('assert');

describe('Страница файла bundle.js', () => {
    beforeEach(function() {
        return this.browser
            .url('/')
            .click('.list__item:nth-child(3) > a')
            .click('.files .list__item:last-of-type > a')
            .click('.list__item > a')
    });

    it('Проверить отображение контента файла', function() {
        return this.browser
            .getText('.content')
                .then(text => {
                    assert.equal(text, 'alert(\'it is bundle!\');');
                });
    });

    it('Переход на уровень выше', function() {
        return this.browser
            .click('//a[@href="/task-img/?path=54189a"]')
            .getText('.list__item > a')
                .then(text => {
                    assert.equal(text, 'bundle.js');
                });
    });

    it('Переход к ветке', function() {
        return this.browser
            .click('//a[@href="/task-img"]')
            .getText('.subtitle')
                .then(text => {
                    assert.deepEqual(text, ['commits', 'files']);
                });
    });
});

describe('Страница файла index.html', () => {
    it('Проверить отображение контента файла', function() {
        return this.browser
            .url('/')
            .click('.list__item:nth-child(2) > a')
            .click('.files .list__item:last-of-type > a')
            .assertView('plain', 'body')
    });
});
