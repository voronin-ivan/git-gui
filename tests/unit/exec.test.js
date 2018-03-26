const { expect } = require('chai');
const { runExec } = require('../../server/core/utils');

describe('Функция runExec', () => {
    it('Должна выполнять консольные команды', async () => {
        const nodeVersion = await runExec('node -v');
        expect(nodeVersion).to.be.a('string');
    });
});
