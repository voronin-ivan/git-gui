const { expect } = require('chai');
const { runExec, stringToArr, getHash } = require('../../server/core/utils');

describe('Функция runExec', () => {
    it('Должна выполнять консольные команды', async () => {
        const result = await runExec('echo it works');

        expect(result).to.equal('it works\n');
    });
});

describe('Функция stringToArr', () => {
    it('Должна делать массив из строки на основе переноса строк', () => {
        const string = ' first-string\nsecond-string\nlast-string ';
        const expected = ['first-string', 'second-string', 'last-string'];

        expect(expected).to.deep.equal(stringToArr(string));
    });
});

describe('Функция getHash', () => {
    it('Должна обрезать длинную строку, оставляя только первые 6 символов', () => {
        const string = 'альбомдолженбылвыйтивчера';
        const expected = 'альбом';

        expect(expected).to.equal(getHash(string));
    });
});
