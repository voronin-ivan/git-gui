const assert = require('assert');

describe('Страница коммита', () => {
    beforeEach(function() {
        return this.browser
            .url('/')
            .click('.list__item > a')
            .click('.commits .list__item > a')
    });

    it('Переход обратно к ветке', function() {
        return this.browser
            .click('.breadcrumbs__link:nth-child(3)')
            .getText('.subtitle')
                .then(text => {
                    assert.deepEqual(text, ['commits', 'files']);
                });
    });

    it('Переход к списку веток', function() {
        return this.browser
            .click('.breadcrumbs__link:first-of-type')
            .getText('.title')
                .then(text => {
                    assert.equal(text, 'Branches');
                });
    });

    it('Переход к файлу', async function() {
        const fileLink = '.list__item:first-of-type a';
        let fileName = await this.browser.getText(fileLink);
        const fileNameLastLetter = fileName[fileName.length - 1];

        // необходимое условие, т.к. директории в крошках выводятся без /
        if (fileNameLastLetter === '/') {
            fileName = fileName.slice(0, fileName.length - 1);
        }

        await this.browser.click(fileLink);
        const breadcrumb = await this.browser.getText('.breadcrumbs__link:last-of-type');

        assert.equal(fileName, breadcrumb);
    });
});
