const assert = require('assert');

describe('Страница ветки', () => {
    beforeEach(function() {
        return this.browser
            .url('/')
            .click('.list__item > a')
    });

    it('Сверить заголовок на странице с url', async function() {
        const url = await this.browser.getUrl();
        const urlTitle = url.slice(7).split('/')[1];
        const title = await this.browser.getText('.title');

        assert.equal(urlTitle, title);
    });

    it('Переход обратно к выбору веток', function() {
        return this.browser
            .click('.breadcrumbs__link:first-of-type')
            .getText('.title')
            .then(text => {
                assert.equal(text, 'Branches');
            });
    });

    it('Переход к коммиту', async function() {
        const commitLink = '.commits .list__item:first-of-type a';
        const commit = await this.browser.getText(commitLink);
        const commitName = commit.split(' by ')[0];

        await this.browser.click(commitLink);
        const title = await this.browser.getText('.title');

        assert.equal(commitName, title);
    });

    it('Переход к файлу', async function() {
        const fileLink = '.files .list__item:first-of-type a';
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
